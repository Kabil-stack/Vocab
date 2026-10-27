import { useContext } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";

const VocabContext = createContext();

function VocabProvider({children}){
    const [confirmpassword,setConfirmpassword] = useState("");
    const [name,setName] = useState("");
    const [jwtToken,setJwtToken] = useState(()=>{
       return localStorage.getItem("jwtToken") || ""; 
     
    });

    useEffect(()=>{
      localStorage.setItem("jwtToken",jwtToken)
      console.log(jwtToken)
    },[jwtToken])
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [userDetails,setUserDetails] = useState("");
    const [words,setWords] = useState([]);
    const [vocabForm,setVocabForm] = useState(false);
    
    return <VocabContext.Provider value={{confirmpassword,setConfirmpassword,name,setName,jwtToken,setJwtToken,email,setEmail,password,setPassword,userDetails,setUserDetails,words,setWords,vocabForm,setVocabForm

    }}>
        {children}
    </VocabContext.Provider>
}
function useVocab(){
    const context = useContext(VocabContext);
    if(!context){
        return
    }
    return context
}

export  {useVocab,VocabProvider}