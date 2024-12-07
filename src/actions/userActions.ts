"use server";
import { memberEditSchema, MemberEditSchema } from "@/app/lib/schemas/memberEditSchema";
import { Member } from "@prisma/client";
import { getAuthUserId } from "./likeActions";
import { prisma } from "@/app/lib/prisma";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const userId = await getAuthUserId();

        const validated = memberEditSchema.safeParse(data);

        if(!validated.success) return { status: "error", error: validated.error.errors };
        
        const {name, description, city, country} = validated.data;

        const member = await prisma.member.update({
            where: {userId },
            data: {
                name,
                description,
                city,
                country
            }
        });
        return { status: "success", data: member };

    } catch (error) {
        console.error(error);
        return {status: "error", error: "An error occurred while updating the member profile."};
    }

}