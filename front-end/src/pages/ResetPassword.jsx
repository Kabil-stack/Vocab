import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function ResetPassword() {
    const {id , token} = useParams()
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    async function resetPassword(e){
        e.preventDefault(); 
        try{

        
        const res = await fetch(`http://localhost:3000/api/user/reset-password/${id}/${token}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },body:JSON.stringify({
                password:password
            })
        })
        const data = await res.json();
        navigate('/login')
        console.log(data);
    }catch(err){
        console.log(err)
    }
    }
    return (
        <div className="flex justify-center h-screen items-center">
            <form onSubmit={resetPassword}  className="relative z-10 bg-white flex justify-center flex-col gap-10px shadow-xl/30 w-70 p-4 ">
                <h1 className="text-center font-semibold text-2xl mb-2 p-2
">Reset Password</h1>
            <Input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="new-password" required />
            <Button type="submit" >Reset password</Button>
            </form>
            
        </div>
    )
}

export default ResetPassword
