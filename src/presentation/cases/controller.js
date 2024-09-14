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
const case_model_1 = require("../../data/models/case.model");
class CaseController {
    // Obtener todos los casos
    getCases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cases = yield case_model_1.Case.find(); // Recuperar todos los casos
                res.status(200).json(cases);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al recuperar los casos', error });
            }
        });
    }
    // Crear un nuevo caso
    createCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { lat, lng, genre, age } = req.body;
            try {
                // Crear un nuevo caso usando el modelo
                const newCase = new case_model_1.Case({
                    lat,
                    lng,
                    genre,
                    age,
                    isSent: false // Inicialmente, el correo no ha sido enviado
                });
                // Guardar el caso en la base de datos
                yield newCase.save();
                // Aquí podria llamar a la función para enviar el correo electrónico
                // await sendEmail(newCase); // Define la función sendEmail, sino no sirve perro
                res.status(201).json(newCase); // Respuesta con el caso creado
            }
            catch (error) {
                res.status(400).json({ message: 'Error al crear el caso', error });
            }
        });
    }
    // Obtener un caso por ID
    getCaseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const caseItem = yield case_model_1.Case.findById(id);
                if (!caseItem) {
                    res.status(404).json({ message: 'Caso no encontrado' });
                    return;
                }
                res.status(200).json(caseItem);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al recuperar el caso', error });
            }
        });
    }
    // Actualizar un caso
    updateCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { lat, lng, genre, age, isSent } = req.body;
            try {
                const updatedCase = yield case_model_1.Case.findByIdAndUpdate(id, { lat, lng, genre, age, isSent }, { new: true } // Devolver el caso actualizado
                );
                if (!updatedCase) {
                    res.status(404).json({ message: 'Caso no encontrado' });
                    return;
                }
                res.status(200).json(updatedCase);
            }
            catch (error) {
                res.status(400).json({ message: 'Error al actualizar el caso', error });
            }
        });
    }
    // Eliminar un caso
    deleteCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedCase = yield case_model_1.Case.findByIdAndDelete(id);
                if (!deletedCase) {
                    res.status(404).json({ message: 'Caso no encontrado' });
                    return;
                }
                res.status(200).json({ message: 'Caso eliminado correctamente' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar el caso', error });
            }
        });
    }
}
exports.CaseController = CaseController;
