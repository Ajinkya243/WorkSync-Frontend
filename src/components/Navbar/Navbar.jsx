import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalstateContext";
import classes from './Navbar.module.css';

const Navbar=()=>{
    const{user,setUser}=useGlobalState();
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        setUser({});
        navigate("/");
    }
    
    return(
        <>
        <div className={classes.navbar}>
            <h2>WorkSync</h2>
            <div><span>{user.name}</span><button className={classes.logout} onClick={handleLogout}>Logout</button></div>
        </div>
        </>
    )
}
export default Navbar;