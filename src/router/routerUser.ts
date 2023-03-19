import { initTRPC } from '@trpc/server';
import { z } from 'zod';
// import { Context } from '../server';

// const t = initTRPC.context<Context>().create();
const t = initTRPC.create();

export const routerUser = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    return { id: req.input, name: "Felipe Massa" };
  }),
  createUser: t.procedure.input(z.object({
    name: z.string().min(3)
  })).mutation(async (req) => {
    const persona = { 
      id: 4,
      name: req.input
    }

    return await persona;
  })
})

export type RouterUser = typeof routerUser;