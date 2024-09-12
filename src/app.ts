import express, { Request, Response } from "express";
import { Case } from 'MonoMap\src\data\models\case.model.ts';  // Importa el modelo de casos

 
const app = express()

 app.get("/", (req:Request,res:Response)=>{
    res.send("Hola a todos, cuidense de la viruela del mono");
 });

 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
 });


app.post('/cases', async (req: Request, res: Response) => {
  try {
    const { lat, lng, genre, age } = req.body;

    // Crear un nuevo caso usando el modelo
    const newCase = new Case({
      lat,
      lng,
      genre,
      age,
      isSent: false // Inicialmente, el correo no ha sido enviado
    });

    // Guardar el caso en la base de datos
    await newCase.save();

    res.status(201).json(newCase);  // Respuesta con el caso creado
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el caso', error });
  }
});
