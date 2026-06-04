import { inngest } from '@/inngest/client';
import {
  baseProcedure,
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from '../init';
import { prisma } from '@/lib/db';

export const appRouter = createTRPCRouter({
  testAi: premiumProcedure.mutation(async () => {
    await inngest.send({
      name: 'execute/ai',
    });

    return { success: true, message: 'AI execution initiated' };
  }),

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
