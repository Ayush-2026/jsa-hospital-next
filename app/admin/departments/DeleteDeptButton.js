'use client'
import React from 'react'
import { useRouter } from 'next/navigation'




export default function DeleteDeptButton({slug}) {
    const router = useRouter();

  return (
    <>
        <button onClick={async ()=>{
            if(confirm("Are you sure you want to delete this doctor?")){
                //hit delete endpoint
                await fetch(`/api/admin/departments/${slug}`, { method: "DELETE" });

                router.refresh();
            }
        }} className='px-3 py-1 rounded-xl text-white text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80 active:scale-95' style={{ background: "linear-gradient(to right, #dc2626, #b91c1c)" }}>
            Delete
        </button>
    </>
  )
}
