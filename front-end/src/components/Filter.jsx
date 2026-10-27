"use client"

import * as React from "react"

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




function Filter({setDifficulty,difficulty}) {
    
    return (
        <div className="flex justify-end mr-4 mt-4">

            <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" className="text-sm lg:text-lg"><FaBookSkull /> Difficulty</Button>} />
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          
          <DropdownMenuRadioGroup value={difficulty} onValueChange={setDifficulty} >
            <DropdownMenuRadioItem value="" className="text-sm lg:text-lg cursor-pointer ">All</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="easy" className="text-sm lg:text-lg cursor-pointer  ">easy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="medium" className="text-sm lg:text-lg cursor-pointer">medium</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="hard" className="text-sm lg:text-lg cursor-pointer">hard</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
            
        </div>
    )
}

export default Filter
