import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaBookSkull } from "react-icons/fa6";
import { useVocab } from "@/pages/Contexts/VocabContext"





   


function VocabForm() {
    const {jwtToken,setVocabForm,setWords} = useVocab()
    const [word,setWord] = useState("")
    const [meaning,setMeaning] = useState("")
    const [example,setExample] = useState("")
    const [diff,setDiff] = useState("easy")
    

    async function  handleAddVocab(e){
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_URL}/api/vocab`,{
            method:"POST",
            headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${jwtToken}`
                },
            
                body:JSON.stringify({
                    word: word,
      meaning: meaning,
      example: example,
      difficulty: diff,
                })
        })
        const data = await res.json()
        console.log(data.data)
        setWords(prev => [data.data.newVocab,...prev])
        
        setWord("")
        setMeaning("")
        setExample("")
        setDiff("easy")
        setVocabForm(false)


    }
    return (
        <div className="absolute  ml-4 ">
            <form onSubmit={handleAddVocab} className="relative z-10 bg-white flex flex-col  gap-1 shadow-xl/30 w-50 md:w-70 p-4 text-[#A52A2A]  rounded-xl text-sm md:text-md">
              <div >
               <label htmlFor="word" className="font-bold"> Word : </label> <Input className="border-[grey] border-2  w-40 md:w-45  focus-visible:border-[#F87171] focus-visible:border-2 focus-visible:ring-0 text-sm md:text-md " placeholder="Enter a word" id="word" type="text" value={word} onChange={(e)=>setWord(e.target.value)} minLength={3} required />
               </div>
               <div >
                <label htmlFor="Meaning" className="font-bold"> Meaning : </label>   <Textarea placeholder="Enter meaning..." type="text" value={meaning} onChange={(e)=>setMeaning(e.target.value)} id="Meaning"  required minLength={5} className="border-[grey] border-2 w-45 md:w-60 shadow-xl  focus-visible:ring-0 focus-visible:border-red-500 
                 text-sm md:text-md block min-h-14 resize-none" />
                 </div>
                <div >
                <label htmlFor="example" className="font-bold"> Example : </label> <Textarea placeholder="Enter an example..." type="text" value={example} onChange={(e)=>setExample(e.target.value)} id="example" minLength={5} required className="border-[grey] border-2 w-45 md:w-60   shadow-xl focus:ring-2  focus-visible:ring-0 focus-visible:border-red-500  text-sm md:text-md block min-h-14 resize-none"/>
                 </div>
                 <div >
                <label htmlFor="difficulty" className="font-bold">Difficulty : </label>
                 <DropdownMenu >
      <DropdownMenuTrigger  className="text-[black]" render={<Button variant="outline" id="difficulty"  > <FaBookSkull /> Choose difficulty</Button>} />   
     <DropdownMenuContent
  className="w-36 rounded-xl border border-[#E5D5B5] bg-[#FFF9E8] p-1.5 shadow-lg "
>
  <DropdownMenuGroup>
    <DropdownMenuRadioGroup
      value={diff}
      onValueChange={setDiff}
      className="space-y-1 text-[red]"
    >
      <DropdownMenuRadioItem
        value="easy"
        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium
        text-green-700 outline-none transition-colors
        focus:bg-green-100 data-[state=checked]:bg-green-100"
      >
        Easy
      </DropdownMenuRadioItem>

      <DropdownMenuRadioItem
        value="medium"
        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium
        text-amber-700 outline-none transition-colors
        focus:bg-amber-100 data-[state=checked]:bg-amber-100"
      >
        Medium
      </DropdownMenuRadioItem>

      <DropdownMenuRadioItem
        value="hard"
        className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium
        text-red-700 outline-none transition-colors
        focus:bg-red-100 data-[state=checked]:bg-red-100"
      >
        Hard
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuGroup>
</DropdownMenuContent>
    </DropdownMenu>
                </div>
             
               <Button variant="outline" className="bg-[#171717] text-[#F2D58A] hover:bg-[#292929]    hover:text-[#D1D5DB] transition-colors " type="submit">submit</Button>
                
            </form>
        </div>
    )
}

export default VocabForm
