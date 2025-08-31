import Resume from '../models/Resume.js';

// Get all resumes for a user
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id })
      .select('title profile.firstName profile.lastName template theme createdAt lastModified')
      .sort({ lastModified: -1 });
    
    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single resume
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    
    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check if user owns the resume or if it's public
    if (resume.userId.toString() !== req.user.id && !resume.isPublic) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to access this resume'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Create new resume
export const createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user.id
    };

    const resume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update resume
export const updateResume = async (req, res) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this resume'
      });
    }

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastModified: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check if user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this resume'
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Duplicate resume
export const duplicateResume = async (req, res) => {
  try {
    const originalResume = await Resume.findById(req.params.id);

    if (!originalResume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    // Check if user owns the resume or if it's public
    if (originalResume.userId.toString() !== req.user.id && !originalResume.isPublic) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to duplicate this resume'
      });
    }

    // Create a copy without the _id and with new title
    const resumeData = originalResume.toObject();
    delete resumeData._id;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;
    resumeData.userId = req.user.id;
    resumeData.title = `${originalResume.title} (Copy)`;
    resumeData.lastModified = Date.now();

    const newResume = await Resume.create(resumeData);

    res.status(201).json({
      success: true,
      data: newResume
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get public resumes
export const getPublicResumes = async (req, res) => {
  try {
    const { page = 1, limit = 10, template, theme } = req.query;
    
    const query = { isPublic: true };
    if (template) query.template = template;
    if (theme) query.theme = theme;

    const resumes = await Resume.find(query)
      .select('title profile.firstName profile.lastName template theme createdAt')
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Resume.countDocuments(query);

    res.status(200).json({
      success: true,
      data: resumes,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

