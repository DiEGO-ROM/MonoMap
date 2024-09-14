import { Request, Response } from 'express';
import { Case } from '../../data/models/case.model';


export class CaseController {
  
  // Obtener todos los casos
  async getCases(req: Request, res: Response): Promise<void> {
    try {
      const cases = await Case.find();  // Recuperar todos los casos
      res.status(200).json(cases);
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar los casos', error });
    }
  }

  // Crear un nuevo caso
  async createCase(req: Request, res: Response): Promise<void> {
    const { lat, lng, genre, age } = req.body;

    try {
      // Crear un nuevo caso usando el modelo
      const newCase = new Case({
        lat,
        lng,
        genre,
        age,
        isSent: false  // Inicialmente, el correo no ha sido enviado
      });

      // Guardar el caso en la base de datos
      await newCase.save();

      // Aquí podria llamar a la función para enviar el correo electrónico
      // await sendEmail(newCase); // Define la función sendEmail, sino no sirve perro

      res.status(201).json(newCase);  // Respuesta con el caso creado
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el caso', error });
    }
  }

  // Obtener un caso por ID
  async getCaseById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const caseItem = await Case.findById(id);

      if (!caseItem) {
        res.status(404).json({ message: 'Caso no encontrado' });
        return;
      }

      res.status(200).json(caseItem);
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar el caso', error });
    }
  }

  // Actualizar un caso
  async updateCase(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { lat, lng, genre, age, isSent } = req.body;

    try {
      const updatedCase = await Case.findByIdAndUpdate(
        id,
        { lat, lng, genre, age, isSent },
        { new: true }  // Devolver el caso actualizado
      );

      if (!updatedCase) {
        res.status(404).json({ message: 'Caso no encontrado' });
        return;
      }

      res.status(200).json(updatedCase);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el caso', error });
    }
  }

  // Eliminar un caso
  async deleteCase(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deletedCase = await Case.findByIdAndDelete(id);

      if (!deletedCase) {
        res.status(404).json({ message: 'Caso no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Caso eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el caso', error });
    }
  }
}
