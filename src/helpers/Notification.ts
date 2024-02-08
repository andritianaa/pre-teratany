import { LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications';

export const notifiate = async (title: string, body: string, largeBody: string) => {
    try {
        const notification: LocalNotificationSchema = {
            title: title,
            body: body,
            largeBody: largeBody,
            id: Math.floor(Math.random() * 1000) + 1,
        };

        const pendingNotifications = await LocalNotifications.getPending();

        const existingNotifications = pendingNotifications.notifications.filter((notification: any) => {
            return notification.title === title;
        });

        if (existingNotifications.length > 0) {
            await LocalNotifications.cancel({ notifications: existingNotifications });
            console.log('Notifications précédentes supprimées avec succès :', existingNotifications);
        }

        const scheduleResult = await LocalNotifications.schedule({ notifications: [notification] });

        if (scheduleResult.notifications) {
            console.log('Notification planifiée avec succès :', scheduleResult.notifications);
        } else {
            console.error('Erreur lors de la planification de la notification.');
        }
    } catch (error) {
        console.error('Erreur lors de la planification de la notification :', error);
    }
}
