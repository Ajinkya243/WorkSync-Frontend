import { useParams } from "react-router-dom";
import { AddAssignment, Aside, AssignmentGrid, Navbar } from "../../components";
import { useEffect, useState } from "react";
import axios from 'axios';
import classes from './ProjectDetails.module.css';
import { useGlobalState } from "../../context/GlobalstateContext";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
const ProjectDetails=()=>{
    const{status,setStatus,setTab,setShowModal,showModal}=useGlobalState();
    const[project,setProject]=useState({});
    const[assignments,setAssignments]=useState([]);
    const {id}=useParams();
    const fetchData=async()=>{
        try{
            setStatus("pending");
            const response=await axios.get(`https://work-sync-psi.vercel.app/api/projects/${id}`);
            setProject(response.data);
            setStatus("success");
        }
        catch(error){
            setStatus("error");
            toast.error("Failed to fetch projects. Please try again.");
        }
        }
    const fetchAssignments=async()=>{
        try{
            const response=await axios.get(`https://work-sync-psi.vercel.app/api/assignments/project/${id}`);
            setAssignments(response.data);
        }
        catch(error){
            toast.error("Failed to fetch projects. Please try again.");
        }
    }    
    useEffect(()=>{
        setTab("dashboard")
        fetchData();
        fetchAssignments();
    },[id]);

    return(
        <div>
            <Navbar/>
            <Aside/>
            <div className={classes.details}>
            {status==="pending" && <div className={classes.loader}><ClipLoader /></div>}
            {status!=="pending" && project.name&& 

            <div className={classes.container}>
  <h2 className={classes.title}>{project.name}</h2>
  <p>
    <span className={classes.label}>Description: </span>
    <span className={classes.value}>{project.description}</span>
  </p>
  <p>
    <span className={classes.label}>Start Date: </span>
    <span className={classes.value}>{new Date(project.startDate).toDateString()}</span>
  </p>
  <p>
    <span className={classes.label}>End Date: </span>
    <span className={classes.value}>{new Date(project.endDate).toDateString()}</span>
  </p>
  <p>
    <span className={classes.label}>Project Manager: </span>
    <span className={classes.value}>{project.managerId?.name}</span>
  </p>
  <p>
    <span className={classes.label}>Required Skills: </span>
    <span className={classes.skillList}>{project.requiredSkills?.join(", ")}</span>
  </p>
  <p>
    <span className={classes.label}>Status: </span>
    <span className={classes.value}>{project.status}</span>
  </p>
  <p>
    <span className={classes.label}>Team Size: </span>
    <span className={classes.value}>{project.teamSize}</span>
  </p>
  <p>
  <button onClick={()=>setShowModal(true)}>Add Assignments</button>
  </p>
            </div>}
            {assignments.length>0 && status!=="pending" && <AssignmentGrid assignments={assignments}/>}
            {assignments.length===0 && status!=="pending" && <p>No task found</p>}
            {showModal && <AddAssignment project={project} onSuccess={fetchAssignments} />}
            </div>
        </div>
    )
}
export default ProjectDetails;