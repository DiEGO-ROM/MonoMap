"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const case_router_1 = require("./case-router");
class AppRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use("/case", case_router_1.CaseRouter.routes);
        return router;
    }
}
exports.default = AppRouter;
