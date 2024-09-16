import { Router } from "express";
import { CaseRouter } from "./case-router";

export default class AppRouter {
  static get routes(): Router{
    const router = Router();
    router.use("/case", CaseRouter.routes);
    return router;
  }
}