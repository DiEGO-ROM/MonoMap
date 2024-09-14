import express from "express";
import { AppRoutes } from "./presentation/routes";

// Crear la aplicación Express
const app = express();


// Middleware para parsear JSON
app.use(express.json());

// Registrar rutas
app.use("/", AppRoutes.routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
