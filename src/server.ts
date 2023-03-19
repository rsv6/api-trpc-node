import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { z } from 'zod';


// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

// export const t = initTRPC.create();
const t = initTRPC.context<Context>().create();


export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input;
    // console.log("req.input: ", req.input);
    return { id: req.input, name: "Rafael Santos Vieira"};
  }),
  createUser: t.procedure.input(z.object({ name: z.string().min(3) }))
    .mutation(async (req) => {

      const persona = {
        id: 2,
        name: req.input
      }

      // Use your ORM of choice:
      // return await UserModel.create({
      //   data: req.input,
      // });

      return await persona;
    }),
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  }),
);


app.listen(8008, () => {
  console.log('listening on http://localhost on port 8008');
})


// export type definition of API
// export type AppRouter = typeof appRouter;