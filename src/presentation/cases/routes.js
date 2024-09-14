"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class CaseRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const caseController = new controller_1.CaseController();
        router.get("/", caseController.getCases);
        router.post("/", caseController.createCase);
        router.get("/:id", caseController.getCaseById);
        router.put("/:id", caseController.updateCase);
        router.delete("/:id", caseController.deleteCase);
        return router;
    }
}
exports.CaseRoutes = CaseRoutes;
