import webpush from 'web-push';
import { envs } from '../../config';
import { PushSubscriptionModel } from '../../data/mongodb';

webpush.setVapidDetails(
  envs.VAPID_SUBJECT,
  envs.VAPID_PUBLIC_KEY,
  envs.VAPID_PRIVATE_KEY,
);

export interface PushPayload {
  title: string;
  body: string;
  icon?: string;
}

export class PushService {

  async saveSubscription(
    userId: string,
    subscription: { endpoint: string; keys: { p256dh: string; auth: string } },
  ): Promise<void> {
    await PushSubscriptionModel.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      { userId, ...subscription },
      { upsert: true, new: true },
    );
  }

  async sendToUser(userId: string, payload: PushPayload): Promise<void> {
    const subscriptions = await PushSubscriptionModel.find({ userId });

    const sends = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
          JSON.stringify(payload),
        );
      } catch (err: unknown) {
        // Si la suscripción ya no es válida (410 Gone), eliminarla
        if (
          typeof err === 'object' &&
          err !== null &&
          'statusCode' in err &&
          (err as { statusCode: number }).statusCode === 410
        ) {
          await PushSubscriptionModel.deleteOne({ endpoint: sub.endpoint });
        }
      }
    });

    await Promise.all(sends);
  }
}