import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Aside, Navbar, EditModal } from "../../components";
import axios from 'axios';
import classes from "./AssignmentDetails.module.css";
import { useGlobalState } from "../../context/GlobalstateContext";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const AssignmentDetails=()=>{
    const{showModal,setShowModal}=useGlobalState();
    const[details,setDetails]=useState({});
    const{id}=useParams();
    const navigate=useNavigate();
    const fetchDetails=async()=>{
        const response=await axios.get(`https://work-sync-psi.vercel.app/api/assignments/${id}`);
        setDetails(response.data);
    }
    console.log(details);
    const handleDelete=async()=>{
        try{
            const response=await axios.delete(`https://work-sync-psi.vercel.app/api/assignments/${id}`)
            toast.success(response.data.message);
            navigate(`/api/projects/${details.projectId}`);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchDetails();
    },[])
    return(
        <div>
            <Navbar/>
            <Aside/>
            <div className={classes.task}>
            {details._id ?
            <div className={classes.card}>
            <p><span>Task Name:</span> {details.name}</p>
            <p><span>Owner:</span> {details.engineerId.name}</p>
            <p><span>Start Date:</span> {new Date(details.startDate).toDateString()}</p>
            <p><span>End Date:</span> {new Date(details.endDate).toDateString()}</p>
            <p><span>Allocation:</span> {details.allocationPercentage}%</p>
            <button onClick={() => setShowModal(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            </div>
            :<div className={classes.loader}>
            <ClipLoader/>
            </div>
            }
            </div>
            
            {showModal && <EditModal assignment={details} onSuccess={fetchDetails}/>}
        </div>
    )
}
export default AssignmentDetails;