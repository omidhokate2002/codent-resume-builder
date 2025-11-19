# Codent resume builder 

The Codent Resume Builder is a powerful web application developed by our team, designed to streamline the process of creating professional resumes. Our application features a sleek and modern template that caters to a wide range of industries and job positions.

With our single, carefully crafted template, users can effortlessly showcase their skills, experiences, and qualifications in a visually appealing and organized manner. The template is designed to capture the attention of employers and effectively highlight the key aspects of a candidate's profile.

The template incorporates sections for personal information, summary or objective, work experience, education, skills, and additional details. Each section is thoughtfully designed with an emphasis on clarity and readability, ensuring that users can present their information in a structured and visually pleasing way.

Users have the flexibility to customize the template to their specific needs, including adjusting font styles, colors, and section layouts. This allows individuals to personalize their resumes while maintaining a professional and consistent look.

The Codent Resume Builder also offers real-time previews, allowing users to see how their information will appear in the final resume. This feature enables users to make instant changes and ensure that their resumes are polished and error-free.

By providing a single, meticulously designed template, the Codent Resume Builder ensures that users can create impressive resumes that effectively showcase their qualifications and stand out from the competition. With our user-friendly interface and attention to detail, we aim to empower individuals in their job search and help them present themselves confidently to potential employers.

## resume-card.jsx
This code represents a React component called `ResumeCard` that is part of a larger project. It utilizes various hooks and context providers to manage resume data. The component fetches resume data, displays loading spinners while fetching, and renders resume cards with options for previewing, updating, and deleting each resume. It uses `react-router-dom` for navigation and makes API calls to handle the operations. The code demonstrates the use of asynchronous functions, state management with hooks like `useState`, and the useEffect hook for fetching data. The UI is conditionally rendered based on the loading state and the received resume data.

## education.jsx

This code represents a React component called `EducationInputs` that is used to capture and update education-related information. It utilizes the `useState` hook to manage the state of the education form inputs. The component receives data from a specific context and updates the dirty resume object with the input values when the user clicks the save button. It also displays a success message using the Material-UI `Snackbar` and `Alert` components when the changes are saved successfully. The form includes text input fields for degree, location, university, and a date input field for completion date.

## experience.jsx

This code represents a React component called ExperienceInputs used for capturing and updating experience-related information. It uses the useState hook to manage the state of the experience form inputs. The component retrieves data from a specific context and updates the dirty resume object with the input values when the user clicks the save button. It also displays a success message using the Material-UI Snackbar and Alert components when the changes are saved successfully. The form includes text input fields for job title, location, and company, as well as date input fields for start and end dates. There's also a textarea for entering responsibilities as comma-separated values.

## preview.jsx

This code represents a React component called `Preview` that displays a preview of a resume. It uses the `useLocation` hook from `react-router-dom` to retrieve the current location's state, and the `useResumeSpecificContext` hook to access the resume data and related functions. The component fetches resume data based on the state using the `fetchDataById` function upon mounting. The preview includes sections for the profile header, professional summary, employment history, projects, education details, and skills. It dynamically renders the data from the resume object using map functions. The `handlePrint` function allows the user to print the resume. The `getDateInRequiredFormat` function is used to format dates appropriately.

## profile.jsx

This code represents a React component called `ProfileInputs` that provides input fields to edit and save the profile information of a resume. It uses the `useResumeSpecificContext` hook to access the resume data, state, and related functions. The component initializes the `profileInfo` state with the profile data from the resume. It handles changes in the input fields using the `handleChange` function, which updates the `profileInfo` state accordingly. The `handleSave` function is triggered when the form is submitted, and it updates the `dirtyResume` state with the modified profile information and sets the `isSaved` flag to true. If the save operation is successful, a success alert is displayed. The component also renders input fields for the profile name, address, job title, email, phone, and summary.

## project.jsx

This code represents a React component called ProjectInputs that allows users to input and save project information for a resume. It utilizes the useResumeSpecificContext hook to access the resume data, state, and related functions. The component initializes the projectInfo state with the project data from the resume. The handleChange function handles changes in the input fields and updates the projectInfo state accordingly. The component renders input fields for project title, start date, end date, project description, and technologies used. When the form is submitted, the handleSave function updates the dirtyResume state with the modified project information and sets the isSaved flag to true. If the save operation is successful, a success alert is displayed.

## skills.jsx

This code represents a React component called SkillsInputs that allows users to input and save skills information for a resume. It utilizes the useResumeSpecificContext hook to access the resume data, state, and related functions. The component initializes the skills state with the skills data from the resume. The handleChange function handles changes in the skills input field and updates the skills state accordingly. The handleSave function is triggered when the form is submitted and updates the dirtyResume state with the modified skills data. It also sets the isSaved flag to true. The handleSubmit function is responsible for submitting the updated resume data to the server and navigating to the home page. If the save operation is successful, a success alert is displayed.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
