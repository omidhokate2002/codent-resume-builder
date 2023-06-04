import {BsLinkedin,BsGithub,BsGlobe} from 'react-icons/bs'
import {GiGraduateCap} from 'react-icons/gi'
import {HiLocationMarker,HiOfficeBuilding,HiOutlineMail,HiPhone} from 'react-icons/hi'
import { useResumeContext } from '../context';


const ResumePreview = () => {
  const { resumeData, isLoading, fetchData } = useResumeContext();

  const GetIcon = (icon) => {
    switch(icon.icon){
        case "HiOutlineMail":
          return <HiOutlineMail size={30}/>
        case "HiPhone":
          return <HiPhone size={30}/>
        case "BsLinkedin":
          return <BsLinkedin size={30}/>
        case "BsGithub":
          return <BsGithub size={30}/>
        case "BsGlobe":
          return <BsGlobe size={30}/>
        default:
          return "●"
    }
  }

  const GetLinks = () => {
    const list = [];
    if(resumeData[0]?.email){
      list.push({
        icon:"HiOutlineMail",
        link: resumeData[0]?.email,
      });
    }
    if(resumeData[0]?.contact){
      list.push({
        icon:"HiPhone",
        link: resumeData[0]?.contact,
      });
    }
    if(resumeData[0]?.linkedin){
      list.push({
        icon:"BsLinkedin",
        link: resumeData[0]?.linkedin,
      });
    }
    if(resumeData[0]?.github){
      list.push({
        icon:"BsGithub",
        link: resumeData[0]?.github,
      });
    }
    if(resumeData[0]?.website){
      list.push({
        icon:"BsGlobe",
        link: resumeData[0]?.website,
      });
    }

    return(
      list.map((item,id)=>{
        return(
          <div className={id%2===0 ? "d-flex aligh-items-start align-items-center bg-2 text-white p-3" : "d-flex aligh-items-start align-items-center bg-3 text-white p-3"} key={id}>
            <p className="m-0"><GetIcon icon={item.icon}/></p><span className="mx-2"></span><p className="m-0">{item.link}</p>
          </div>
        )
      })
    )

  }
  return (
    <div className="container d-flex justify-content-center p-4">
      <div className="row pdf bg-light" id="divToPrint" size="A4">
        <div className="d-flex align-items-center justify-content-center col-md-5 bg-1 p-0 py-2">
          <div>
            <div className="d-flex justify-content-center">
             {/* <img src={file} className="pdf-resumeData[0]?-image" alt="..." /> */}
            </div>
            <div className="text-center">
              <span className="font-bold m-0 firstname">sunny</span>
              <span className="font-thin m-0">sunny</span>
              {/* <p>{resumeData[0]?.tagline}</p> */}
              <p className="m-0">
                <HiOfficeBuilding size={20} /> abc
              </p>
              <p>
                <HiLocationMarker size={20} /> coeo
              </p>
            </div>
            <br />
            <GetLinks /> 
            <br />
            <div className="p-3">
              <h4 className="title">Skills</h4>
              <div className="d-flex flex-wrap">
                {/* {resume.map((items, id) => {
                  return ( */}
                    <p className="technology rounded" key="abc">
                      react
                    </p>
                  {/* );
                })} */}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center col-md-7 p-0 py-4">
          <div>
            <div className="px-4 py-1">
              <h4 className="title">About Me</h4>
              <p className="text-break">something here</p>
              <hr />
            </div>
            <div className="px-4">
              <h4 className="title">Experience</h4>
              {/* {experienceList.map((item, id) => {
                return ( */}
                  <div className="d-flex justify-content-start py-1" key="id">
                    <HiOfficeBuilding size={30} />
                    <div className="px-3">
                      <h4>somet title</h4>
                      <p className="m-0">
                        "{"item.company"} • {"item.startMonth"} {"item.startYear"}{' '}"
                        {`${"item.isWorking" ? ' - Present' : ' - ' + "item.endMonth" + ' ' + "item.endYear"}`}
                      </p>
                      <p className="m-0">{"item.location"}</p>
                      <p>{"item.description"}</p>
                    </div>
                  </div>
                {/* );
              })} */}
              <hr />
            </div>
            <div className="px-4">
              <h4 className="title">Education</h4>
              {/* {educationList.map((item, id) => {
                return ( */}
                  <div className="d-flex justify-content-start py-1" key={"id"}>
                    <GiGraduateCap size={40} />
                    <div className="px-3">
                      <h4>{"item.institute"}</h4>
                      <p className="m-0">
                        {"item.degree"} • {"item.fieldOfStudy"}
                      </p>
                      <p>
                        {"item.startYear"} - {"item.endYear"} • Grade: {"item.grade"}
                      </p>
                    </div>
                  </div>
                {/* );
              })} */}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default ResumePreview;
