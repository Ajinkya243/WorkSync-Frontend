import { useEffect, useState } from "react";
import { Aside, Navbar } from "../../components";
import { useGlobalState } from "../../context/GlobalstateContext";
import axios from "axios";
import classes from './Engineers.module.css';

const Engineers=()=>{
    const{setTab}=useGlobalState();
    const[engineers,setEngineers]=useState([]);
    const fetchData=async()=>{
        const response=await axios.get("https://work-sync-psi.vercel.app/api/engineers",{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}});
        console.log(response);
        setEngineers(response.data);
    }
    useEffect(()=>{
      setTab("engineers") ;
      fetchData(); 
    },[])
    return(
        <>
        <Navbar/>
        <Aside/>
        <div className={classes.engineers}>
        <h2>List Of Engineers</h2>
        <div className={classes['grid-container']}>
  <div className={classes['grid-header']}>
    <p>Name</p>
    <p>Email</p>
    <p>Seniority</p>
    <p>Max Capacity</p>
    <p>Available Capacity</p>
    <p>Skills</p>
  </div>

  {engineers.map(el => (
    <div key={el._id} className={classes['grid-data']}>
      <p>{el.name}</p>
      <p>{el.email}</p>
      <p>{el.seniority}</p>
      <p>{el.maxCapacity}</p>
      <p>{el.availableCapacity}</p>
      <p>{el.skills.join(", ")}</p>
    </div>
  ))}
</div>

        </div>
        </>
    )
}
export default Engineers;