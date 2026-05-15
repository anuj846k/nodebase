import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const Page = async () => {
  await requireAuth();
  const data = await caller.getUsers();

  return (
    <div className='justify-center flex items-center  min-h-screen bg-amber-50 '>
      Protected Server Component
      <div>{JSON.stringify(data,null,2)}</div>
    </div>
  );
};

export default Page;
