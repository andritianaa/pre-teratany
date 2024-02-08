import { LocalNotifications, PendingLocalNotificationSchema } from '@capacitor/local-notifications';

export const notifiate = async (title: string, body: string, largeBody: string) => {
    try {
        const notificationOptions = {
            notifications: [
                {
                    title: title,
                    body: body,
                    largeBody: largeBody,
                    id: Math.floor(Math.random() * 1000) + 1,
                },
            ],
        };

        const pendingNotifications = await LocalNotifications.getPending();

        const existingNotification = pendingNotifications.notifications.find((notification: PendingLocalNotificationSchema) => {
            return notification.body === body
        });

        if (existingNotification) {
            await LocalNotifications.cancel({ notifications: [existingNotification] });
        }
        const scheduleResult = await LocalNotifications.schedule(notificationOptions);
        if (scheduleResult.notifications) {
            console.log('Notification planifiée avec succès :', scheduleResult.notifications);
        } else {
            console.error('Erreur lors de la planification de la notification.');
        }
    } catch (error) {
        console.error('Erreur lors de la planification de la notification :', error);
    }
}
