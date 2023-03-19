import * as trpcExpress from '@trpc/server/adapters/express';
import { Router } from "express";
import { createContext } from "../server";
import { routerUser } from "./routerUser";

export const router = () => Router()
  .use('/tprc/user', 
    trpcExpress.createExpressMiddleware({
      router: routerUser,
      createContext
    })
  )