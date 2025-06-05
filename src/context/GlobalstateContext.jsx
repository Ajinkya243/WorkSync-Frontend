import { useState, useContext,createContext, useEffect } from "react"

const GlobalstateContext=createContext();

const defaultState = {
  user: { email: "", password: "" },
};

const GlobalstateProvider=({children})=>{
    const [state, setState] = useState(() => {
    const saved = localStorage.getItem("appState");
    return saved ? JSON.parse(saved) : defaultState;
  });
  const[projects,setProjects]=useState([]);
  const[tab,setTab]=useState("");
  const[status,setStatus]=useState("");
  const[showModal,setShowModal]=useState(false);
  const[tasks,setTasks]=useState([]);
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  const { user} = state;
  const setUser = (user) => setState(prev => ({ ...prev, user }));
  

    return(
        <GlobalstateContext.Provider 
        value={{
            user,
            setUser,
            status,
            setStatus,
            tab,
            setTab,
            projects,
            setProjects,
            showModal,
            setShowModal,
            tasks,
            setTasks
        }}
        >
            {children}
        </GlobalstateContext.Provider>
    )
}

export const useGlobalState=()=>useContext(GlobalstateContext);
export default GlobalstateProvider;