"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./presentation/routes");
// Crear la aplicación Express
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Registrar rutas
app.use("/", routes_1.AppRoutes.routes);
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
