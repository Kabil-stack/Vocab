import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2Icon } from "lucide-react"
import { IoArrowBackOutline } from "react-icons/io5";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";






function ForgotPassword() {
    const [email,setEmail] = useState("")
    const [isSendMail,setIsSendMail] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate();
    async function sendMail(e){
        e.preventDefault();
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_URL}/api/user/forgot-password`,{
            method:"POST",
            headers:{
                    "Content-Type":"application/json",
                },
            body:JSON.stringify({
                email:email
            })
        });
        const data = await res.json();
        
        toast.success(data.message)
        setEmail("")
        setIsSendMail(true)
        setIsLoading(false)
        
    }
    return (
        <div>               
            {isSendMail ? <div className="flex justify-center flex-col gap-1  items-center h-screen ">
                
                    <Alert className="max-w-md">
      <CheckCircle2Icon />
      <AlertTitle>Email sent successfully.</AlertTitle>
      <AlertDescription>
      Check your email for further processing.
      </AlertDescription>
    </Alert>
   
    <Button onClick={()=>navigate(-1)}  className="w-40  text-md  hover:cursor-pointer"><IoArrowBackOutline /> back</Button>
                </div>
            :
            <div className="flex justify-center h-screen items-center">
            <form onSubmit={sendMail} className="w-70 bg-[white] p-2 rounded-lg ">

            <h1 className="text-center font-semibold text-3xl mb-2 p-2
">Forgot Password</h1>
            <Input type="mail" onChange={(e)=>setEmail(e.target.value)} value={email} id="mail" placeholder="Enter Email" required/>
            <div className="p-4 flex justify-between ">
            {isLoading ? <div className="flex items-center gap-4 [--radius:1.2rem]">
     
      <Badge variant="outline">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
    :  <Button type="submit" className="p-2 w-20  ">submit</Button> }
            <Button onClick={()=>navigate(-1)} className="p-2 w-20  "> Back</Button>
            </div>
            
            </form>
            </div>
               }
        </div>
    )
}

export default ForgotPassword
