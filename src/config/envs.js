"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env = __importStar(require("env-var"));
exports.envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    MONGO_URL: env.get("MONGO_URL").required().asString(),
    MONGO_DB: env.get("MONGO_DB").required().asString(),
    MAPBOX_ACCESS_TOKEN: env.get("MAPBOX_ACCESS_TOKEN").required().asString(),
    MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
    MAILER_EMAIL: env.get("MAILER_EMAIL").required().asString(),
    MAILER_ACCESS_TOKEN: env.get("MAILER_ACCESS_TOKEN").required().asString()
};
