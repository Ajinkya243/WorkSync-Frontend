import { useEffect, useState } from "react";
import { Aside, EditProfile, Navbar } from "../../components";
import { useGlobalState } from "../../context/GlobalstateContext";
import axios from 'axios';
import classes from './Profile.module.css';
import ClipLoader from "react-spinners/ClipLoader";

const Profile=()=>{
    const{setTab,tab,user,showModal,setShowModal}=useGlobalState();
    const[details,setDetails]=useState({});
    const fetchDetails=async()=>{
        try{
            const response=await axios.get(`https://work-sync-psi.vercel.app/api/engineers/${user.id}/capacity`);
            console.log(response.data);
            setDetails(response.data);
        }
        catch(error){
            console.log("Error occur while fetching",error)
        }
    }
    useEffect(()=>{
        setTab("profile");
        fetchDetails();
    },[])
    return(
        <div>
            <Navbar/>
            <Aside/>
            <div className={classes.profile}>
            {details.name?
            <>
            <h2>Profile Details</h2>
            <p>Name: {details.name}</p>
            <p>Email: {details.email}</p>
            <p>Skills: {details.skills.join(" , ")}</p>
            <button onClick={()=>setShowModal(true)}>Edit</button>
            </>
            :<div className={classes.loaders}><ClipLoader/></div>}
            </div>
            {showModal && <EditProfile user={details} onSuccess={fetchDetails}/>}

        </div>
    )
}
export default Profile;