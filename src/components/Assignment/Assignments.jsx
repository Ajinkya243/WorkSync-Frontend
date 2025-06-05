import classes from "./Assignments.module.css";
const Assignments=({assignment})=>{
    return(
        <div className={classes.task}>
            <h2>{assignment.projectId.name}</h2>
            <p>Assignment: {assignment.name}</p>
            <p>Start Date: {assignment.startDate.slice(0,10)}</p>
            <p>Due Date: {assignment.endDate.slice(0,10)}</p>
        </div>
    )
}
export default Assignments;