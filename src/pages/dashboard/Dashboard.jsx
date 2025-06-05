import { useEffect,useState } from "react";
import { useGlobalState } from "../../context/GlobalstateContext";
import axios from 'axios';
import classes from './Dashboard.module.css';
import ClipLoader from "react-spinners/ClipLoader";
import { Aside, Assignments, Navbar, ProjectModal, Projects } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";

const Dashboard=()=>{
    const[input,setInput]=useState("");
    const debounceInput=useDebounce(input);
    const{setTab,setProjects,projects,setStatus,status,showModal,setShowModal,user,tasks,setTasks}=useGlobalState();
    const fetchData=async()=>{
            try{
                setStatus("pending");
                const response=await axios.get("https://work-sync-psi.vercel.app/api/projects",{params:{input:debounceInput}});
            setProjects(response.data);
            setStatus("success");
            }
            catch(error){
                toast.error("Failed to fetch projects. Please try again.");
            }   
        }
    const fetchAssignments=async()=>{
        try{
            setStatus("pending");
            const response=await axios.get(`https://work-sync-psi.vercel.app/api/assignments/user/${user.id}`);
            setTasks(response.data);
            setStatus('success');
        }
        catch(error){
            toast.error("Failed to fetch projects. Please try again.");
        }
    }    
    useEffect(()=>{
        setTab("dashboard");
        if(user.role==="manager"){
            fetchData();
        }
        if(user.role==="engineer"){
            fetchAssignments();
        }    
    },[debounceInput])
    
    
    return(
        <>
        <Navbar/>
        <Aside/>
        {user.role==="manager"&&<div className={classes.dashboard}>
        <input type="text" placeholder="Search for projects" className={classes['input-search']} onChange={e=>setInput(e.target.value)} value={input}/>
                <div className={classes['project-header']}>
                <h2>Projects :</h2>
                <button onClick={() => setShowModal(true)}>+ Add Project</button>
                </div>
        {showModal && <ProjectModal onSuccess={fetchData}/>} 
        {status==="pending" && <div className={classes.loader}><ClipLoader size={30}/></div>}
        {status!=="pending" && projects.length>0 &&
            <div className={classes.projects}>
                    {projects.map(el=>(
                        <Projects key={el._id} project={el} />
                    ))}
            </div>}      
        </div>}
        {user.role==="engineer" && tasks.length>0 && <div className={classes.dashboard}>
            <h2>Tasks</h2>
            <div className={classes.projects}>
            {tasks.map(el=>(
                <Assignments assignment={el} />
            ))}
            </div>
            </div>}
        </>
    )
}
export default Dashboard;