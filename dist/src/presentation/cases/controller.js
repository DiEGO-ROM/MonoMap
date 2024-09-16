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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseController = void 0;
const http_status_codes_1 = require("http-status-codes");
const case_model_1 = require("../../data/models/case.model");
class CaseController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const cases = yield case_model_1.CaseModel.find();
                res.json(cases).status(http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.deleteCase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const monoCase = yield case_model_1.CaseModel.findById(id);
                if (!monoCase) {
                    res.json("Case not found").status(http_status_codes_1.StatusCodes.NOT_FOUND);
                }
                yield case_model_1.CaseModel.findByIdAndDelete(id);
                res.status(http_status_codes_1.StatusCodes.OK).send();
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.updateCase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const monoCase = req.body;
                const { id } = req.params;
                const oldMonoCase = yield case_model_1.CaseModel.findById(id);
                yield case_model_1.CaseModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, monoCase), { creationDate: oldMonoCase.creationDate, isSent: false }));
                const updatedCase = yield case_model_1.CaseModel.findById(id);
                res.json(updatedCase).status(http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getoneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const monoCase = yield case_model_1.CaseModel.findById(id);
                res.json(monoCase).status(http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.getLastWeek = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                const cases = yield case_model_1.CaseModel.find({
                    creationDate: { $gte: oneWeekAgo }
                });
                res.json(cases).status(http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
        this.createCase = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const monoCase = req.body;
                const insertionResponse = yield case_model_1.CaseModel.create({
                    age: monoCase.age,
                    creationDate: new Date().toISOString(),
                    genre: monoCase.genre,
                    isSent: false,
                    lat: monoCase.lat,
                    lng: monoCase.lng,
                });
                res.json(insertionResponse).status(http_status_codes_1.StatusCodes.OK);
            }
            catch (error) {
                res.json(error).status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.CaseController = CaseController;
