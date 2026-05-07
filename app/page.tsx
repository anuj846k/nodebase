import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className='justify-center flex items-center  min-h-screen '>
      <Button variant='outline'>Hello World : {JSON.stringify(users)}</Button>
    </div>
  );
};

export default page;
