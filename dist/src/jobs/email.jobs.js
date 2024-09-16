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
exports.EmailJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const sendEmail_1 = require("../utils/sendEmail");
const case_model_1 = require("../data/models/case.model");
const mailTemplate_1 = require("../utils/mailTemplate");
const dontenv_1 = require("../utils/dontenv");
const EmailJob = () => {
    const emailService = new sendEmail_1.EmailService();
    node_cron_1.default.schedule('*/10 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cases = yield case_model_1.CaseModel.find({ isSent: false });
            if (!cases.length) {
                console.log("No hay casos para enviar correos");
                return;
            }
            console.log(`Procesando ${cases.length} casos.`);
            yield Promise.all(cases.map((monoCase) => __awaiter(void 0, void 0, void 0, function* () {
                const htmlBody = (0, mailTemplate_1.generateIncidentEmailTemplate)(monoCase.genre, monoCase.age, monoCase.lat, monoCase.lng);
                yield emailService.sendEmail({
                    to: dontenv_1.envs.MAILER_EMAIL,
                    subject: 'Nuevo caso creado o atualizado',
                    htmlBody: htmlBody
                });
                console.log(`Correo enviado para el caso con ID: ${monoCase.id}`);
                yield case_model_1.CaseModel.findByIdAndUpdate(monoCase._id, { isSent: true });
                console.log(`Caso actualizado con ID: ${monoCase._id}`);
            })));
        }
        catch (error) {
            console.error("Error durante el envio de correos");
        }
    }));
};
exports.EmailJob = EmailJob;
