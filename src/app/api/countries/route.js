import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req, res){

    console.log("I'm inside the API");

    try {
        const data = await prisma.country.findMany();

        res.status(200).json(data);
    } catch (error) {
        return {"message" : "there was an error"}
    }

}