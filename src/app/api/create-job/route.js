import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prisma";

export async function POST(req, res) {

    // console.log("I'm inside the API");
    // return NextResponse.json({message: "Hello World"}, {status: 200})
    
    try {

        const {
            jobTitle,
            jobDepartment,
            jobDescription,
            companyName,
            compDescription,
            worldwide,
            salaryMin,
            salaryMax,
            salaryCur,
            logo
        } = await req.json();
    
/*         console.log({
            jobTitle,
            jobDepartment,
            jobDescription,
            compDescription,
            companyName,
            worldwide,
            salaryMin,
            salaryMax,
        }); */
    
    
        const result = await prisma.job.create({
            data: {
                title : jobTitle,
                company: 1,
                department: jobDepartment,
                worldwide,
                expired: false,
                salary_range_min: salaryMin,
                salary_range_max: salaryMax,
                views: 0, 
                clicks: 0,
                description: jobDescription,
                company_description: compDescription,
            }
        })
    
        return NextResponse.json({message: "new job created successfully"}, {status: 200})
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error({ message: 'Internal server error' }, { status: 500 });
    }

    
}
