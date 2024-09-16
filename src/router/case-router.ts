import { Router } from "express";
import { CaseController } from "../presentation/cases/controller";

export class CaseRouter{
  static get routes(): Router{
    const router = Router();
    const caseController = new CaseController()
    router.post("/", caseController.createCase)
    router.get("/", caseController.getAll)
    router.get("/lastWeek", caseController.getLastWeek)
    router.get("/:id", caseController.getoneById)
    router.put("/:id", caseController.updateCase)
    router.delete("/:id", caseController.deleteCase)
    return router
  }
}