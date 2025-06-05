import { useEffect,useState } from "react"

const useDebounce=(input,delay=500)=>{
    const[debounceInput,setDebounceInput]=useState("");
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDebounceInput(input);
        },delay)
        return ()=>clearTimeout(timer);
    })
    return debounceInput;
}
export default useDebounce;