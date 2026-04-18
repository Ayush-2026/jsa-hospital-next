import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import slugify from "slugify";
import { revalidateTag } from "next/cache";

export async function PUT(request,{params}){
    const {id} = await params;
    try{
        const {name_en,cover_image,name_hi,name_mr,icon,short_desc,short_desc_hi,short_desc_mr, description_en, description_hi,description_mr, image_url, is_active} = await request.json();
        const newSlug = slugify(name_en,{lower:true, strict:true});
        console.log("id",id);
        console.log("newSlug",newSlug);
        const result = await sql`
        UPDATE departments SET
        name=${name_en},
        name_en=${name_en},
        name_hi=${name_hi},
        name_mr=${name_mr},
        icon=${icon},
        short_desc=${short_desc},
        short_desc_hi=${short_desc_hi},
        short_desc_mr=${short_desc_mr},
        slug=${newSlug},
        description_en=${description_en},
        description_hi=${description_hi},
        description_mr=${description_mr},
        image_url=${image_url},
        cover_image=${cover_image},
        is_active=${is_active}
        WHERE slug=${id}
        `
        console.log(result);
        revalidateTag("departments");
        return NextResponse.json({ success: true, slug: newSlug });
    }
    catch(err){
        console.log("error:", err.message);
        return NextResponse.json({ success: false });
    }
}

export async function DELETE(request,{params}){
    const {id} = await params;
    try{
        const rows = await sql`
        DELETE FROM departments
        WHERE slug=${id}
        `;
        revalidateTag("departments");
         return NextResponse.json({ success: true});

    }
    catch(err){
        console.log("error:", err.message);
        return NextResponse.json({ success: false });
    }
}