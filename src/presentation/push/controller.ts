import { Request, Response } from 'express';
import { PushClient } from '../../config';
import { envs } from '../../config';

export class PushController {
  private readonly pushService = new PushClient();

  getVapidKey = (_req: Request, res: Response): void => {
    res.json({ publicKey: envs.VAPID_PUBLIC_KEY });
  };

  saveSubscription = async (req: Request, res: Response): Promise<void> => {
    const userId: string = (req.body.user as { id: string }).id;
    const { endpoint, keys } = req.body as {
      endpoint: string;
      keys: { p256dh: string; auth: string };
    };

    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      res.status(400).json({ error: 'Suscripción inválida' });
      return;
    }

    await this.pushService.saveSubscription(userId, { endpoint, keys });
    res.status(201).json({ msg: 'Suscripción guardada' });
  };
}