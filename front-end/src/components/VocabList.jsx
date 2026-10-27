
import { useNavigate } from "react-router-dom"
import VocabForm from "./VocabForm"
import Word from "./Word"
import Filter from "./Filter"
import { GiNotebook } from "react-icons/gi";
import SearchBar from "./SearchBar"
import Page from "./Page"
import { HiMiniNoSymbol } from "react-icons/hi2";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io";
import { FiMinusCircle } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { jwtDecode } from 'jwt-decode';

import {


  LogOutIcon,
 
  
} from "lucide-react"
import { BsPersonBadge } from "react-icons/bs";
import { useVocab } from "@/pages/Contexts/VocabContext";


function VocabList({setDifficulty,inpVal,setInpVal,page,setPage,totPage,difficulty}) {
    const {jwtToken,words,vocabForm,setVocabForm,setJwtToken} = useVocab()
    const navigate = useNavigate();
    const [decodedVal,setDecodedVal] = useState({})
    
    useEffect(()=>{
      if(!jwtToken)return
        function decode(){
           const decoded = jwtDecode(jwtToken)
           
           setDecodedVal(decoded)
        }
        decode(); 
    },[jwtToken])
    
    const [editingWordId, setEditingWordId] = useState(null);
    
    function handleLogout(){
        localStorage.setItem("jwtToken","")
        setJwtToken("")
        navigate("/login")
    }
    return (
        <div >
            <h1 className=" mt-[10px] flex items-center justify-center gap-1 text-4xl text-[#0A0A0A] md:text-6xl ">Vocab <GiNotebook /></h1>
            
            <Button onClick={()=>setVocabForm(form => !form)} className={`${vocabForm ?"bg-stone-600 text-white ml-4  cursor-pointer text:4xl md:text-lg hover:bg-stone-500" : "bg-orange-600 ml-4   text-white  text:4xl md:text-lg cursor-pointer hover:bg-orange-500" }`}>{vocabForm ? <FiMinusCircle /> : <IoMdAdd />}{`${vocabForm ?  "close" :   "Add"}`}</Button>
            {vocabForm && <VocabForm />}
            <div className="flex justify-end mr-4 " >
                        <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="text-sm  lg:text-lg "><FaUserCircle /> {decodedVal.name}</Button>} />
      <DropdownMenuContent>
        { decodedVal.role === "admin" &&
        <DropdownMenuItem onClick={()=>navigate('/admin')} className=" text-sm lg:text-lg">
          
          <BsPersonBadge />
         admin
        </DropdownMenuItem>
}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={handleLogout}
        className="text-sm lg:text-lg"

        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
                
            </div>
             <SearchBar inpVal={inpVal} setInpVal={setInpVal}/>
            <Filter setDifficulty={setDifficulty} difficulty={difficulty}/>
            {words.length === 0 ?  <div className="flex justify-center items-center h-[70vh] ">
                
                    <span className="flex items-center gap-2 text-red-500 text-4xl">  The list is empty <HiMiniNoSymbol /> </span> 
                    </div> :
           <>
            
            
            
            {
                words.length > 0  &&  <>
            {words.map(word => <Word word={word} key={word._id}  setEditingWordId={setEditingWordId} editingWordId={editingWordId}/>)}
            </>
            }
            {totPage > 1 &&
           <Page page={page} setPage={setPage} totPage={totPage}/>
            } 
            </>

            
            
             }
        </div>
    )
}

export default VocabList
