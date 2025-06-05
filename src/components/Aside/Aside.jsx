import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHouseChimney, faList, faPeopleGroup, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import classes from './Aside.module.css';
import { useGlobalState } from "../../context/GlobalstateContext";
const Aside=()=>{
    const {tab,user}=useGlobalState();
    return(
        <>
        {user.role==="manager"?<div className={classes.aside}>
        <Link to="/api/dashboard" className={`${classes.link} ${tab==="dashboard"?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faList} size="xl"  /><span>Projects</span></Link>
         <Link to="/engineers" className={`${classes.link} ${tab==='engineers'?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faPeopleGroup} size="xl"  /><span>Engineers</span></Link>
         
        </div>: <div className={classes.aside}>
                <Link to="/api/dashboard" className={`${classes.link} ${tab==='dashboard'?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faHouseChimney} size="xl"  /><span>Home</span></Link>
                <Link to="/profile" className={`${classes.link} ${tab==='profile'?classes.active:''}`}><FontAwesomeIcon className={classes.icon} icon={faUser} size="xl"  /><span>Profile</span></Link>
                </div>
    }
    </>
         
        
    )
}
export default Aside;