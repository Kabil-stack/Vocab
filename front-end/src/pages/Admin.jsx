
import UserDetail from "@/components/UserDetail";

import { useEffect, useState } from "react"
"use client"
import { MdOutlineNotes } from "react-icons/md";
import {


  LogOutIcon,
 
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import {useVocab} from './Contexts/VocabContext'



function Admin() {
    const {jwtToken,setJwtToken} = useVocab();
    const [users,setUsers] = useState([])
    const navigate = useNavigate()
   useEffect(()=>{
    async function getAllUsers() {
        
        const res = await fetch("http://localhost:3000/api/user",{
            method:"GET",
            headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
            
               
        })
        const data = await res.json()
       
        setUsers(data.data)
    }
     getAllUsers() 
   },[jwtToken,users])
    return (
        <div>
           <div className="flex items-center justify-between p-4">
           <h1 className="text-3xl">Welcome Admin</h1>

          
           <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline"><UserIcon /> Profile</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>navigate('/')}>
          
          <MdOutlineNotes />
          notes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={()=>{navigate('/login');
            localStorage.setItem("jwtToken","")
        setJwtToken("")
        navigate("/login")
        }

        }>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     </div >
           <table className=" border-black border-collapse ml-4 text-sm md:text-md ">
            <thead>
            <tr>
                 <th className="border border-black md:p-2">Name</th>
           <th className="border border-black md:p-2">Email</th>
           <th className="border border-black md:p-2">Role</th>
           <th className="border border-black md:p-2">Joined</th>
           <th className="border border-black md:p-2">Remove</th>
            </tr>
           </thead>
          <tbody>

          
           {users.map(user => <UserDetail key={user._id} user={user} /> )}
           </tbody>
           </table>
        </div>
    )
}

export default Admin
