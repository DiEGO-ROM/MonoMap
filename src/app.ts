import express from "express";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./db/connection";
import { envs } from "./config/envs";

// Crear la aplicación Express
const app = express();

(async () => await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB}))();

// Middleware para parsear JSON
app.use(express.json());

// Ruta para la raíz
app.get("/", (req, res) => {
  res.send("API MonoMap is running");
});

// Registrar otras rutas
app.use("/", AppRoutes.routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
