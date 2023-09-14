import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, res) {

    console.log("hello");
    return {"message" : "Hello"}

    // console.log("printing the body")
    // console.log(body);
    
    // const {
    //     jobTitle,
    //     jobDepartment,
    //     companyName,
    //     worldwide,
    //     salaryMin,
    //     salaryMax,
    // } = await req.body;


    // const result = await prisma.job.create({
    //     data: {
    //         title : jobTitle,
    //         company: companyName,
    //         department: jobDepartment,
    //         worldwide,
    //         expired: false,
    //         salary_range_min: salaryMin,
    //         salary_range_max: salaryMax,
    //         views: 0, 
    //         clicks: 0,
    //         description: ""
    //     }
    // })
}
