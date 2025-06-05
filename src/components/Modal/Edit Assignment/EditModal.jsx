import classes from "./EditModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, } from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "../../../context/GlobalstateContext";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
const EditModal=({assignment,onSuccess})=>{
    const{setShowModal}=useGlobalState();
    const[data,setData]=useState({name:assignment.name,endDate:assignment.endDate,allocationPercentage:assignment.allocationPercentage,engineerId:assignment.engineerId._id});
    console.log(assignment);
    const handleUpdate=async(e)=>{
        e.preventDefault();
        console.log(data);
        try{
            const response=await axios.post(`https://work-sync-psi.vercel.app/api/assignments/${assignment._id}`,data);
            console.log(response);
            toast.success("Assignment update successfully");
            setShowModal(false);
            onSuccess();
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
    return(
        <div className={classes.overlay} onClick={()=>setShowModal(false)}>
        <div className={classes.modal} onClick={e=>e.stopPropagation()}>
        <div className={classes["modal-header"]}>
                  <h3>Edit Assignment</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)} />
                </div>
             <form className={classes.form}>
  <label htmlFor="inputName" className={classes.label}>Task Name</label>
  <input
    id="inputName"
    className={classes.input}
    value={data.name}
    onChange={e => setData(prev => ({ ...prev, name: e.target.value }))}
  />

  <label htmlFor="inputEnd" className={classes.label}>End Date</label>
  <input
    type="date"
    id="inputEnd"
    className={classes.input}
    value={data.endDate.slice(0, 10)}
    onChange={e => setData(prev => ({ ...prev, endDate: e.target.value }))}
  />

  <label htmlFor="inputAllocation" className={classes.label}>Allocation %</label>
  <input
    type="number"
    id="inputAllocation"
    className={classes.input}
    value={data.allocationPercentage}
    onChange={e => setData(prev => ({ ...prev, allocationPercentage: e.target.value }))}
  />

  <button type="button" onClick={handleUpdate} className={classes.button}>Save</button>
</form>  
        </div>
        </div>
    )
}
export default EditModal;