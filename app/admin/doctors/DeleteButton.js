'use client'
import React from 'react'
import { useRouter } from 'next/navigation'




export default function DeleteButton({slug}) {
    const router = useRouter();

  return (
    <>
        <button onClick={async ()=>{
            if(confirm("Are you sure you want to delete this doctor?")){
                //hit delete endpoint
                await fetch(`/api/admin/doctors/${slug}`, { method: "DELETE" });

                router.refresh();
            }
        }} className='px-3 py-1 border rounded-xl text-white bg-red-700'>
            Delete
        </button>
    </>
  )
}
