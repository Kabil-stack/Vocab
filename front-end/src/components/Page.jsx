

import {
  Pagination,
  PaginationContent,
 
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"




function Page({page,setPage,totPage}) {
    
    return (
        <div>
            <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious    className={` ${page <= 1 && "text-[grey] hover:text-[grey] hover:bg-[none]"}`} onClick={()=>{
                if(page > 1){

                    setPage(page => page - 1)
                }
            }} />
         </PaginationItem>
        {Array.from({length:totPage},(_,index) => index + 1).map(pageNum =>(

       
        <PaginationItem key={pageNum}>
          <PaginationLink onClick={()=>setPage(pageNum)} isActive={page === pageNum}>{pageNum}</PaginationLink>
        </PaginationItem>
        ))}
       

       
        <PaginationItem>
          <PaginationNext className={`${page >= totPage && "text-[grey] hover:text-[grey] hover:bg-[none]"}`} onClick={()=>{if(page < totPage){setPage(page => page + 1)}} } />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
            
        </div>
    )
}

export default Page
