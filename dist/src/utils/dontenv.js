"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = __importDefault(require("env-var"));
exports.envs = {
    PORT: env_var_1.default.get("PORT").required().asPortNumber(),
    MONGO_URL: env_var_1.default.get("MONGO_URL").required().asString(),
    MONGO_DB: env_var_1.default.get("MONGO_DB").required().asString(),
    MAPBOX_ACCESS_TOKEN: env_var_1.default.get("MAPBOX_ACCESS_TOKEN").required().asString(),
    MAILER_ACCESS_TOKEN: env_var_1.default.get("MAILER_ACCESS_TOKEN").required().asString(),
    MAILER_SERVICE: env_var_1.default.get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: env_var_1.default.get("MAILER_EMAIL").required().asString(),
};
