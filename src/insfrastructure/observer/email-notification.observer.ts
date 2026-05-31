import {
  EventChangePayload,
  EventObserver,
  ObserverResult,
} from '../../domain';
import { EmailService } from '../services/email.service';

export class EmailNotificationObserver implements EventObserver {
  constructor(private readonly emailService: EmailService) {}

  async notify(payload: EventChangePayload): Promise<ObserverResult> {
    const { action, event, triggeredBy } = payload;

    if (!triggeredBy?.email) {
      return {
        observer: 'email',
        status: 'error',
        message: `No hay correo para notificar sobre "${event.title}"`,
      };
    }

    try {
      const actionText: Record<string, string> = {
        created: 'creado',
        updated: 'actualizado',
        deleted: 'eliminado',
      };

      const actionLabel = actionText[action] ?? action;
      const subject = `Evento ${actionLabel}: ${event.title}`;

      const html = `
        <div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
            <div style="background:#2563eb;color:#ffffff;padding:20px 24px;">
              <h2 style="margin:0;font-size:20px;">Notificación de calendario</h2>
            </div>

            <div style="padding:24px;color:#111827;">
              <p style="margin:0 0 12px;">Hola,</p>
              <p style="margin:0 0 16px;line-height:1.6;">
                El evento <strong>${event.title}</strong> fue <strong>${actionLabel}</strong>.
              </p>

              <p style="margin:0 0 8px;"><strong>Acción:</strong> ${actionLabel}</p>
              <p style="margin:0 0 8px;"><strong>Fecha:</strong> ${payload.occurredAt.toLocaleString()}</p>

              <div style="margin-top:20px;padding:14px;background:#eff6ff;border-left:4px solid #2563eb;border-radius:6px;color:#1e3a8a;">
                Revisa tu calendario para ver los cambios.
              </div>
            </div>
          </div>
        </div>
      `;

      await this.emailService.send(triggeredBy.email, subject, html);

      return {
        observer: 'email',
        status: 'success',
        message: `Email enviado por acción ${actionLabel} sobre "${event.title}"`,
      };
    } catch (error) {
      return {
        observer: 'email',
        status: 'error',
        message: error instanceof Error ? error.message : 'Error enviando email',
      };
    }
  }
}