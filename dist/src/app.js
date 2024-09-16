"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dontenv_1 = require("./utils/dontenv");
const app_router_1 = __importDefault(require("./router/app-router"));
const connection_1 = require("./db/connection");
const email_jobs_1 = require("./jobs/email.jobs");
const app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () { return yield connection_1.MongoDatabase.connect({ mongoUrl: dontenv_1.envs.MONGO_URL, dbName: dontenv_1.envs.MONGO_DB }); }))();
app.use(express_1.default.json());
app.use("/", app_router_1.default.routes);
app.listen(dontenv_1.envs.PORT, () => {
    console.log(`Server is running on port ${dontenv_1.envs.PORT}`);
    (0, email_jobs_1.EmailJob)();
});
