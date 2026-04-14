import React from 'react'
import EditForm from './EditForm'
import { getDoctorBySlug } from '@/lib/queries/doctors';

 

export default async function page({params}) {
  const {slug} = await params;
  const doctor = await getDoctorBySlug(slug)
    return (
    <>
        <EditForm doctor={doctor}/>
    </>
  )
}


