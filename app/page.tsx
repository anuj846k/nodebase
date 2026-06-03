'use client';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const Page = () => {
  const trpc = useTRPC();
  const queryclient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        queryclient.invalidateQueries(trpc.getWorkflows.queryOptions());
      },
    }),
  );
  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onError: () => {
        toast.error('AI execution failed');
      },
    }),
  );

  return (
    <div className='justify-center flex items-center  min-h-screen bg-amber-50 '>
      Protected Server Component
      <div>{JSON.stringify(data, null, 2)}</div>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>
        {create.isPending ? 'Creating...' : 'Create Workflow'}
      </Button>
      <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
        {testAi.isPending ? 'Testing AI...' : 'Test AI'}
      </Button>
    </div>
  );
};

export default Page;
