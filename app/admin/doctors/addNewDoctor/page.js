import React from 'react'
import TakeInput from './TakeInput'
import { getDepartments } from '@/lib/queries/departments'

export default async function page() {
  
  const fetched_departments = await getDepartments()

    return (
    <>
        <TakeInput fetched_departments={fetched_departments} />
    </>
  )
}
