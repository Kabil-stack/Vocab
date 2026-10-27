
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import toast from "react-hot-toast";
import {useVocab} from './Contexts/VocabContext'
function Login() {
   const {setJwtToken,email,setEmail,password,setPassword,setUserDetails} = useVocab();
   const navigate = useNavigate();
   const [isVisible,setIsVisible] = useState(false);

    function goSignUp(){
        navigate('/register')
    }

    async function handleloginForm(e){
       e.preventDefault(); 
       try{

       
       const res = await fetch(`${import.meta.env.VITE_URL}/api/user/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    email:email,
                    password:password
                })
             });
             
             if(res.status === 403){
                toast.error("Too many attempts. Your account has been temporarily locked.")
                return
             }
             if(res.status === 401){
                toast.error("incorrect password or email")
                return
             }
             const data = await res.json();
              console.log(data);
             if(data.user.role === "admin"){
               setJwtToken(data.token)
               localStorage.setItem("jwtToken",data.token)
               setUserDetails(data.user)  
               navigate("/admin");
               setEmail("");
               setPassword("");
               return

             }
            
            setJwtToken(data.token)
            localStorage.setItem("jwtToken",data.token)
            setUserDetails(data.user)
            
       if(res.ok){
        setEmail("");
        setPassword("");
        navigate('/');
       }else{
        toast.error("incorrect password or email");
       }
    }catch(err){
        console.log(err)
    }
       
    }
   
       
        
   
    return (
        <div className="flex justify-center h-screen items-center ">
            <form onSubmit={handleloginForm} className="relative z-10 bg-white flex justify-center flex-col gap-10px shadow-xl/30 w-70 p-4 rounded-lg">
                <h1 className="text-center font-semibold text-3xl mb-2
">Login</h1>
                <Input type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)} minLength={3} required/>
                
                <br />
                <div className="relative">
                     <Input type={`${isVisible ? "text" : "password" }`}placeholder="password" onChange={(e)=>setPassword(e.target.value)} minLength={3} required/> { isVisible ? <VscEye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsVisible(false)}/>
                     :
                     <VscEyeClosed className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsVisible(true)}/>
    }
                </div>
               
                
                <br />
                <Button type="submit">Login</Button>
                
                <Button onClick={(e)=>{e.preventDefault(); navigate("/forgot-password")}}>forgot password</Button>
                <br />
                <Button  onClick={(e)=>{e.preventDefault();
                                    goSignUp()
                }}>sign up</Button>
                <br />
                
                
            </form>

        </div>
    )
}

export default Login
