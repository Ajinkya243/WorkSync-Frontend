import classes from "./AddAssignment.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "../../../context/GlobalstateContext";
import { useEffect,  useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
const AddAssignment=({project,onSuccess})=>{
    const{setShowModal}=useGlobalState();
    const[assignment,setAssignment]=useState({projectId:project._id});
    const[skill,setSkill]=useState("");
    const[engineer,setEngineer]=useState([]);
    const fetchEngineers=async()=>{
            const response=await axios.get(`https://work-sync-psi.vercel.app/api/engineers/skills/${skill}`);
            setEngineer(response.data);
        }
        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                 const response=await axios.post("https://work-sync-psi.vercel.app/api/assignments",{...assignment});
                 toast.success("Assignment assign succesfully");
                 onSuccess();
                 setShowModal(false);
            }
            catch(error){
                toast.error(error.response.data.message);
            }
           
        }
    useEffect(()=>{
        if(skill){
            fetchEngineers();
        }  
    },[skill])

    return(
        <div className={classes.overlay} onClick={()=>setShowModal(false)}> 
            <div className={classes.modal} onClick={e=>e.stopPropagation()}>
            <div className={classes['modal-header']}>
            <h3>Create New Assignment</h3>
            <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)} />
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inputTitle">Title:</label>
                <input required type="text" id="inputTitle" value={assignment.name} onChange={e=>setAssignment(prev=>({...prev,name:e.target.value}))} /><br/>
                <label htmlFor="startDate">Start Date:</label>
                <input required type="date" value={assignment.startDate} onChange={e=>setAssignment(prev=>({...prev,startDate:e.target.value}))} /><br/>
                <label htmlFor="endDate">End Date:</label>
                <input required type="date" value={assignment.endDate} onChange={e=>setAssignment(prev=>({...prev,endDate:e.target.value}))} /><br/>
                <label htmlFor="inputSkills">Skills</label>
                    <select name="" id="" required onChange={e=>setSkill(e.target.value)}>
                        <option value="">Select Skill</option>
                        {project.requiredSkills.map((el,i)=>(
                            <option key={i} value={el}>{el}</option>
                        ))}
                    </select>
                    <br />
                <label id="inputEng">Select Engineer</label>
                <select required disabled={!engineer.length} onChange={e=>setAssignment(prev=>({...prev,engineerId:e.target.value}))}>
                        <option value="">Select Engineer</option>
                        {engineer.map(el=>(
                            <option value={el._id}>{el.name}</option>
                        ))}
                </select> <br />
                <label htmlFor="inputAvailable">Allocation %:</label> 
                <input type="number" required value={assignment.allocationPercentage} onChange={e=>setAssignment(prev=>({...prev,allocationPercentage:Number(e.target.value)}))} /> 
                <br />
                <label htmlFor="department">Select Team:</label>
                <select name="" id="" required onChange={e=>setAssignment(prev=>({...prev,role:e.target.value}))}>
                    <option value="">Select Team</option>
                    <option value="Development">Development</option>
                    <option value="Database">Database</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Support">Support</option>
                    <option value="Analyst">Analyst</option>
                </select> 
                <br />
                <button type="submit">Submit</button>
                <button onClick={()=>setShowModal(false)}>Close</button>
            </form>
            </div>
        </div>
    )
}
export default AddAssignment;