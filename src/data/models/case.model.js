"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const mongoose_1 = require("mongoose");
const caseModel = new mongoose_1.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    genre: { type: String, required: true },
    age: { type: Number, required: true },
    isSent: { type: Boolean, default: false },
    creationDate: { type: Date, default: Date.now }
});
exports.Case = (0, mongoose_1.model)('Case', caseModel);
