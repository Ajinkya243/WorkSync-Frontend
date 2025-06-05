import { useMemo, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useGlobalState } from "../context/GlobalstateContext";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser,status, setStatus } = useGlobalState();
  const[formData,setFormData]=useState({email:"",password:""})
 const engineerCredentials = useMemo(() => ({
  email: "ajinkya@test.com",
  password: "ajinkya",
}), []);
const managerCredentials=useMemo(()=>({
email:"jack@test.com",
password:"jack",
}),[])
const navigate=useNavigate();
const handleCredentials=(str)=>{
    if(str==='engineer'){
        setFormData({email:engineerCredentials.email,password:engineerCredentials.password})
    }
    else{
        setFormData({email:managerCredentials.email,password:managerCredentials.password})
    }
}



  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus("pending");
    
    try {
      const response = await axios.post("https://work-sync-psi.vercel.app/api/auth", {
        email: formData.email,
        password: formData.password,
      });
        setStatus('success');
        localStorage.setItem('token',response.data.token);
        toast.success(response.data.message);
        setUser(response.data.user);
        navigate("/api/dashboard");  
      
    } catch (error) {
      toast.error(error.response.data.message);
      setStatus("error");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="loginEmail" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="loginEmail"
          required
          value={formData.email}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, email: event.target.value }))
          }
          className={styles.input}
        />

        <label htmlFor="loginPassword" className={styles.label}>
          Password:
        </label>
        <input
          type="password"
          id="loginPassword"
          required
          value={formData.password}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, password: event.target.value }))
          }
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          {status === "pending" ? <ClipLoader color="white" size={20} /> : "Login"}
        </button>
      </form>
      <div className={styles.buttonsContainer}>
      <button className={styles.button} onClick={()=>handleCredentials('engineer')}>Engineer Test Credentials</button>
      <button className={styles.button} onClick={()=>handleCredentials('manager')}>Manager Test Credentials</button>
      </div>
    </div>
  );
};

export default Login;
