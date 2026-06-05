import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import slugify from 'slugify'
import { revalidateTag } from "next/cache";

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const { name_en, name_hi, name_mr, specialization_en, specialization_hi, specialization_mr,
      bio_en, bio_hi, bio_mr, image_url, is_active, department_id, redirect_link } = await request.json();
    const newSlug = slugify(name_en, { lower: true, strict: true });
    console.log("id from params:", id);
    console.log("newSlug:", newSlug);
    console.log("department_id:", department_id);

    const result = await sql`
      UPDATE doctors SET
        name_en = ${name_en},
        name_hi = ${name_hi},
        name_mr = ${name_mr},
        specialization_en = ${specialization_en},
        specialization_hi = ${specialization_hi},
        specialization_mr = ${specialization_mr},
        bio_en = ${bio_en},
        bio_hi = ${bio_hi},
        bio_mr = ${bio_mr},
        image_url = ${image_url},
        is_active = ${is_active},
        department_id = ${department_id},
        redirect_link = ${redirect_link},
        slug = ${newSlug}
      WHERE slug = ${id}
    `;
    console.log("update result:", result);

    revalidateTag("doctors");
    return NextResponse.json({ success: true, slug: newSlug });
  } catch (err) {
    console.log("error:", err.message);
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request,{params}) {
  const {id} = await params;
  try{
    await sql`DELETE FROM doctors WHERE slug=${id}`;
    revalidateTag("doctors");
    return NextResponse.json({success:true});
  }
  catch(err){
    return NextResponse.json({success:false});
  }
}


