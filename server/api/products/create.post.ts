import productModel from "../models/product.model";
import {z} from 'zod'

const productSchema=z.object({
    name:z.string(),
    categories:z.any().array().min(1)
})
export default defineEventHandler(async (event)=>{
    const validate=await readValidatedBody(event,body=>productSchema.safeParse(body))
    if(validate.success){
        const now=new Date()
        const body=await readBody(event)
        const result=await productModel.create([
            {
                name:body.name,
                barcode:body.barcode,
                categories:body.categories,
                images:body.images,
                description:body.description,
                note:body.note,
                tags:body.tags,
                created_by:body.createdBy,
                edited_by:body.updatedBy,
                created_at:now,
                edited_at:now
            }
        ])
        return result
    }
    return validate
})