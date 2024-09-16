import cron from 'node-cron';
import { EmailService } from '../utils/sendEmail';
import { CaseModel } from '../data/models/case.model';
import { generateIncidentEmailTemplate } from '../utils/mailTemplate';
import { envs } from '../utils/dontenv';

export const EmailJob = () => {
  const emailService = new EmailService();

  cron.schedule('*/10 * * * * *', async () => {
    try {
      const cases = await CaseModel.find({ isSent: false });
      if (!cases.length) {
        console.log("No hay casos para enviar correos");
        return;
      }
      console.log(`Procesando ${cases.length} casos.`);

      await Promise.all(
        cases.map(async (monoCase) => {
          const htmlBody = generateIncidentEmailTemplate(
            monoCase.genre,
            monoCase.age,
            monoCase.lat,
            monoCase.lng
          )
          await emailService.sendEmail({
            to: envs.MAILER_EMAIL,
            subject: 'Nuevo caso creado o atualizado',
            htmlBody: htmlBody
          });
          console.log(`Correo enviado para el caso con ID: ${monoCase.id}`);

          await CaseModel.findByIdAndUpdate(monoCase._id, {isSent: true})
          console.log(`Caso actualizado con ID: ${monoCase._id}`);
        })
      );
    } catch (error) {
      console.error("Error durante el envio de correos");
    }
  });
}