import { MdDelete } from "react-icons/md";

import { useState } from "react";
import EditForm from "./EditForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useVocab } from "@/pages/Contexts/VocabContext";



function Word({word,editingWordId, setEditingWordId}) {
    const {jwtToken,setWords, words} = useVocab()
    
    const [vocab,setVocab] = useState(`${word.word}`)
    const [meaning,setMeaning] = useState(`${word.meaning}`)
    const [example,setExample] = useState(`${word.example}`)
    
    
    async function handleDelete(){
        
        try{
            
            const res = await fetch(`${import.meta.env.VITE_URL}/api/vocab/${word._id}`,{
            method:"DELETE",
            headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
        })
        const data = await res.json();
        console.log(data);
        const newData = words.filter(word => word !== data.data)
        setWords(newData)
        
        
        }catch(err){
            console.log(err)
        }
    }
   
        
    

    
    return (
        <div>
        <div className="relative flex items-center h-[100px] m-2.5 border border-[#D6E2F0] [&_div]:m-5 bg-[#FFF8DC] text-[#3D342B] rounded-xl" onDoubleClick={()=>setEditingWordId(word._id)}>
            <div >
            <p><strong>{vocab}: </strong>{meaning}</p>
            <p><strong>Example : </strong>{example}</p>
            </div>
             <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="absolute top-0 right-0 box-content p-[30px]  cursor-pointer hover:text-gray-500">
            <MdDelete  className="h-[30px] w-[30px]"/>
          </button>
        }

      />
      <AlertDialogContent className="w-60 text-sm md:text-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
         
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={
            handleDelete

          }>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
                
           
          
            
        </div>
           
            {editingWordId === word._id && <EditForm vocab={vocab} setVocab={setVocab} meaning={meaning} setMeaning={setMeaning} example={example} setExample={setExample}   setEditingWordId={setEditingWordId}/> }
        </div>
    )
}

export default Word
