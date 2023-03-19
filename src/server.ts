import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';

import { router } from './router';
// import { appRouter } from './router/router';
// import { z } from 'zod';


// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res }); // no context

export type Context = inferAsyncReturnType<typeof createContext>;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  origin: "*",
  credentials: true,
}))

app.use(router());

app.listen(8008, () => {
  console.log('listening on http://localhost on port 8008');
})


// export type definition of API
// export type AppRouter = typeof appRouter;