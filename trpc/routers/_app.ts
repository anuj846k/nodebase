import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import { prisma } from '@/lib/db';
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(() => {
    return prisma.workflow.findMany({});
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: 'app/task.created',
      data: {
        id: 'task-123',
      },
    });

    return prisma.workflow.create({
      data: {
        name: 'Test Workflow',
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
