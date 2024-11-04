import { Img, Container, Head, Heading, Text, Section, Hr, Button, Html, Link, Tailwind } from "@react-email/components";
import * as React from "react";

export default function WeeklyNewsletter({ categories }) {


  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
              "remotify-lb": "#39D1CC",
              'remotify-db': '#142C42',
            },
            fontFamily: {
                "poppins": ['Poppins'],
            },
        },
      }}}
    >
        <Html
            className="flex flex-col w-10/12 justify-center items-center font-poppins"
        >
            <Container >
                <Heading as="h1" className="text-right text-base font-extralight text-slate-500">October 30, 2024</Heading>
                    
                        <Img src="/Logo.png" alt="Remotify Logo" width="200" height="200"></Img>
                        <Text className="text-base">Hey there, Welcome to this week’s newsletter! We’re excited to bring you the newest <span className="font-bold">remote</span> job opportunities posted on our site, each one handpicked to help you find your next career move. </Text>
                        <Text className="text-base">Let’s dive into these amazing opportunities!</Text>
                    
                        {Object.entries(categories).map(([categoryName, jobs]) => (
                            <div key={categoryName}>
                                <Heading as="h2" className="text-base font-bold italic py-0">{categoryName}</Heading>
                                {jobs.map((job) => (
                                    <Container key={job.id}>
                                        <Text className="flex flex-col">
                                            <Link
                                                href={job.job_link}
                                                className="no-underline font-light text-base py-0"
                                            >
                                                {job.title}
                                            </Link>
                                        </Text>
                                    </Container>
                                ))}
                            </div>
                        ))}
                </Container>
        </Html>
    </Tailwind>
  );
}