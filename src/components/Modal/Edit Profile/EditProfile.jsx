import classes from "./EditProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "../../../context/GlobalstateContext";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
const EditProfile=({user,onSuccess})=>{
    const{setShowModal}=useGlobalState();
    const[data,setData]=useState(user);
    const[skills,setSkills]=useState(user.skills);
    const handleSkills=(i)=>{
        const filterSkill=skills.filter((el,index)=>index!==i);
        setSkills(filterSkill);   
    }
    const updateSkill=()=>{
        setSkills(prev=>[...prev,""])
    }
    
    const handleUpdate=async(e)=>{
         e.preventDefault();
        try{
            const response=await axios.post(`https://work-sync-psi.vercel.app/api/engineers/${data._id}`,{name:data.name,email:data.email,skills});
            toast.success(response.data.message);
            onSuccess();
            setShowModal(false);
        }
        catch(error){
            toast.error("Error occur")
        }
    }
        return(
        <div className={classes.overlay} onClick={()=>setShowModal(false)}>
            <div className={classes.modal} onClick={e=>e.stopPropagation()}>
            <div className={classes["modal-header"]}>
            <h3>Edit Profile</h3>
            <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleUpdate}>
                <label htmlFor="inputName">Name:</label>
                <input required type="text" value={data.name} onChange={(e)=>setData(prev=>({...prev,name:e.target.value}))}/><br />
                <label htmlFor="inputEmail">Email:</label>
                <input required type="email" value={data.email} onChange={e=>setData(prev=>({...prev,email:e.target.value}))}/><br />
                <label htmlFor="skills">Skills:</label>
                {skills.map((el,i)=>(
                    <>
                    <input required type="text" value={el} onChange={(e)=>{const newSkills = [...skills];
                newSkills[i] = e.target.value;
                setSkills(newSkills);}}/> {skills.length>1 &&<FontAwesomeIcon icon={faMinus} onClick={()=>handleSkills(i)}/>}</>
                ))}
                <FontAwesomeIcon icon={faPlus} onClick={()=>updateSkill()}/><br/>
                <button type="submit">Update</button><br />
                <button onClick={()=>setShowModal(false)}>Close</button>
            </form>
            </div>
        </div>
    )
}
export default EditProfile;