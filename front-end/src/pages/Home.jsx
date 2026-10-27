import { useEffect, useState } from "react"
import VocabList from "../components/VocabList"
import { useNavigate } from "react-router-dom"
import {useVocab} from './Contexts/VocabContext'


function Home() {
    const {jwtToken,words,setWords} = useVocab();
    const [difficulty ,setDifficulty] = useState("")
    const [inpVal,setInpVal] = useState("")
   const navigate = useNavigate()
   const [page,setPage] = useState(1)
   const [isPageNotExists,setIsPageNotExists] = useState(false)
   const [totPage,setTotPage] = useState(0)
   
    useEffect(()=>{
        if(!jwtToken){
            navigate("/login")
            return
        }
        const controller = new AbortController();
        async function getData(){
            const params = new URLSearchParams();
            params.append("page",page);

            
            if(difficulty){
               params.append("difficulty",difficulty)
            }
            if(inpVal.length > 2){
                params.append("search",inpVal)
            }
            try{
                const URL = `http://localhost:3000/api/vocab?${params.toString()}`
                const res = await fetch(URL,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                },
                signal:controller.signal,
            })

            if(res.status === 401){
                
                navigate("/login")
                
            }
            
            const data = await res.json()
             if(data.message === "Page doesn't exist"){
                setIsPageNotExists(true)
            }
            setIsPageNotExists(false)
             setWords(data.data || [])
             setTotPage(data.totalPage)
            }catch(err){
                if(err.name !== "AbortError"){
                    console.log(err)
                }
            }
            
        }
        getData()
        return ()=> controller.abort();
    },[jwtToken,difficulty,inpVal,page,words,totPage])
    
    return (
        <div>
            
            <VocabList     setDifficulty={setDifficulty} setInpVal={setInpVal} inpVal={inpVal} page={page} setPage={setPage} isPageNotExists={isPageNotExists} totPage={totPage} difficulty={difficulty}/>
        </div>
    )
}

export default Home
