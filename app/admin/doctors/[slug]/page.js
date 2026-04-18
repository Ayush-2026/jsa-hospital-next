import React from 'react'
import EditForm from './EditForm'
import { getDoctorBySlug } from '@/lib/queries/doctors';
import { getDepartments } from '@/lib/queries/departments';

 

export default async function page({params}) {
  const {slug} = await params;
  const doctor = await getDoctorBySlug(slug);
  const departments_edit = await getDepartments();
    return (
    <>
        <EditForm doctor={doctor} departments_edit={departments_edit} />
    </>
  )
}


