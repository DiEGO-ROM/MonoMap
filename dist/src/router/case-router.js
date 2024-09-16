"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../presentation/cases/controller");
class CaseRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        const caseController = new controller_1.CaseController();
        router.post("/", caseController.createCase);
        router.get("/", caseController.getAll);
        router.get("/lastWeek", caseController.getLastWeek);
        router.get("/:id", caseController.getoneById);
        router.put("/:id", caseController.updateCase);
        router.delete("/:id", caseController.deleteCase);
        return router;
    }
}
exports.CaseRouter = CaseRouter;
