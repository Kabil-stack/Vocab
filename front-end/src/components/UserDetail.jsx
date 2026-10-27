import { Button } from "@/components/ui/button"
import { useVocab } from "@/pages/Contexts/VocabContext"
import toast from "react-hot-toast"
function UserDetail({user}) {
    const {jwtToken} = useVocab()
    async function deleteUser() {
         const res = await fetch(`${import.meta.env.VITE_URL}/api/user`,{
            method:"DELETE",
            headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
            body:JSON.stringify({
                    email:user.email,
                   
                })
            
               
        })
        if(res.ok){
            toast.success("Account was deleted successfully")
        }else{
            toast.error("Can not delete the account")
        }
    }
    
    return (
    
        <tr>
            <td className="border border-black p-1 md:p-2">{user.name}</td>
            <td className="border border-black p-1 md:p-2">{user.email}</td>
            <td className="border border-black p-1 md:p-2">{user.role}</td>
            <td className="border border-black p-1 md:p-2">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
            <td className="border border-black p-1 md:p-2">
                <Button variant="destructive" onClick={deleteUser}>delete</Button>
            </td>
            
        </tr>
        
        
    )
}

export default UserDetail
