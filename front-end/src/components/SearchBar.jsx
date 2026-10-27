
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function SearchBar({inpVal,setInpVal}) {
    
    return (
        <div className="flex justify-center">
           <Field orientation="horizontal" className="flex w-fit">
      <Input type="search" placeholder="Search..." className="w-50 md:w-80 bg-white text-[#000033] text-sm"  value={inpVal} onChange={(e)=>setInpVal(e.target.value)}/>
      
    </Field>
           
        </div>
    )
}

export default SearchBar
