"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./presentation/routes");
require("dotenv/config");
// Crear la aplicación Express
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Registrar rutas
app.use("/", routes_1.AppRoutes.routes);
// Configuración de la base de datos
const { MONGO_URL, PORT } = process.env;
// Conectar a MongoDB
mongoose_1.default.connect(MONGO_URL || 'mongodb://root:12345@localhost:27017')
    .then(() => {
    console.log('Conectado a la base de datos MongoDB');
    // Iniciar el servidor después de la conexión a la base de datos
    app.listen(PORT || 3000, () => {
        console.log(`Server is running on port ${PORT || 3000}`);
    });
})
    .catch(error => {
    console.error('Error al conectar con la base de datos', error);
    process.exit(1); // Salir del proceso si la conexión falla
});
