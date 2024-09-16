"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const caseSchema = new mongoose_1.default.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        required: false,
        default: false
    },
    genre: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    age: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});
exports.CaseModel = mongoose_1.default.model("Case", caseSchema);
