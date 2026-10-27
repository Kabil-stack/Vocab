
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import toast from "react-hot-toast";
import {useVocab} from './Contexts/VocabContext'

function Register() {
    const {confirmpassword,setConfirmpassword,name,setName,email,setEmail,password,setPassword} = useVocab();
    const [isVisible,setIsVisible] = useState(false);
    const [isConfirmVisible,setIsConfirmVisible] = useState(false);
    
    const navigate = useNavigate()
    async function handleSignup(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3000/api/user",{
            method:"POST",
            headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    passwordConfirm:confirmpassword
                })
        });
        const data = await res.json();
        console.log(data);
        if(res.ok){

            toast.success("Your Account has been created successfully 😊.")
            
            navigate('/login')
            return
        }
        toast.error("Signup failed. Please try again.");
    }
    return (
        <div className="flex justify-center h-screen items-center ">
           <form onSubmit={handleSignup} className="relative z-10 bg-white flex justify-center flex-col gap-10px shadow-xl/30 w-70 p-4 rounded-lg">
                <h1 className="text-center font-semibold text-3xl mb-2 p-2
">Sign up</h1>
                <Input type="text" placeholder="username" value={name} onChange={(e)=>setName(e.target.value)} minLength={3} required/>
                
                <br />
                <Input type="text" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} minLength={3} required/>
                
                <br />
                <div className="relative">

               
                <Input type={`${isVisible ? "text" : "password" }`} placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} minLength={3}  required/>{ isVisible ? <VscEye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsVisible(false)}/>
                                     :
                                     <VscEyeClosed className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsVisible(true)}/>}
                 </div>
                <br />
                 <div className="relative">
                <Input type={`${isConfirmVisible ? "text" : "password" }`} placeholder="Confirm password" value={confirmpassword} onChange={(e)=>setConfirmpassword(e.target.value)} minLength={3}  required/>{ isConfirmVisible ? <VscEye className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsConfirmVisible(false)}/>
                                     :
                                     <VscEyeClosed className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=> setIsConfirmVisible(true)}/>}
                </div>
                <br />
                <Button type="submit">Sign up</Button>
                <Button onClick={(e)=>{
                    e.preventDefault();
                    navigate(-1);
                }}>cancel</Button>
                <br />
                
            </form>
        </div>
    )
}

export default Register
