import React from "react";
import EditFormDept from "./EditFormDept";

import { getDepartmentBySlug} from "@/lib/queries/departments";

export default async function page({ params }) {
  const { slug } = await params;
  const department_edit = await getDepartmentBySlug(slug);
  
  return (
    <>
      <EditFormDept department_edit={department_edit} />
    </>
  );
}
