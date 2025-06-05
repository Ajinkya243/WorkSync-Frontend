import classes from "./AssignmentGrid.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
const AssignmentGrid=({assignments})=>{
    return(
        <div>
        <div className={classes['grid-header']}>
        <p>Tasks</p>
        <p>Owner</p>
        <p>Start Date</p>
        <p>End Date</p>
        <p>Allocation%</p>
        <p>Department</p>
        <p>Actions</p>
        </div>
        {assignments.map(el=>(
            <div key={el._id} className={classes['grid-data']}>
            <p>{el.name}</p>
            <p>{el.engineerId.name}</p>
            <p>{new Date(el.startDate).toDateString()}</p>
            <p>{new Date(el.startDate).toDateString()}</p>
            <p>{el.allocationPercentage}</p>
            <p>{el.role}</p>
            <p><Link to={`/api/assignments/${el._id}`}><FontAwesomeIcon className={classes.icon} icon={faArrowRight} size="xl" /></Link></p>
            </div>
        ))}
        </div>
    )
}
export default AssignmentGrid