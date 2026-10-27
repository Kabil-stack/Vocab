import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import { useVocab } from "@/pages/Contexts/VocabContext"

function EditForm({setEditingWordId,vocab,setVocab,meaning,setMeaning,example,setExample}) {
    const {word, jwtToken} = useVocab();
    async function handleEdit(e){
        e.preventDefault()
        try{
           
            const res = await fetch(`${import.meta.env.VITE_URL}/api/vocab/${word._id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization:`Bearer ${jwtToken}`
                },body:JSON.stringify({
                    word:vocab,
                    meaning:meaning,
                    example:example
                })

                
            })
            console.log(res.status)
            const data = await res.json()
            console.log(data)
            setEditingWordId(null)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="flex justify-center">
        <div className="absolute ">
            <form onSubmit={handleEdit} className="relative z-10 bg-white flex justify-center flex-col gap-1 shadow-xl/30 w-70 p-4 rounded-md text-sm md:text-md ">
                
              
                <div>
               <label htmlFor="word"> Word : </label> <Input className="text-sm md:text-md" type="text" value={vocab} onChange={(e)=>setVocab(e.target.value)} id="word" minLength={3} required/>
               </div>
               <div >

              
                <label htmlFor="Meaning"> Meaning : </label>   <Textarea placeholder="Enter meaning..." type="text" className="text-sm md:text-md block min-h-14 resize-none" value={meaning} onChange={(e)=>setMeaning(e.target.value)} id="Meaning" minLength={5}  required/>
                 </div>
                <div >

               
                <label htmlFor="example"> Example : </label> <Textarea placeholder="Enter an example..." className="text-sm md:text-md block min-h-14 resize-none" type="text" value={example} onChange={(e)=>setExample(e.target.value)} id="example" minLength={5} required/>
                 </div>
                
               <div className="flex justify-between">
                    <Button type="submit">submit</Button>
               <Button onClick={(e)=>{e.preventDefault();
                     setEditingWordId(null)
                }}>cancel</Button>
               </div>
               
                
                
            </form>
        </div>
        </div>
    )
}

export default EditForm
