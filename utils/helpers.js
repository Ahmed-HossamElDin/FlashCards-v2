import AsyncStorage from '@react-native-async-storage/async-storage';
import  { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "udaciFlashcards2:notifications";

const titleText = "Its Quiz Time!";
const message = "👋 Don't forget to take a quiz today!";

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

export const getDailyReminderValue = () => {
  return {
    today: message,
  };
};

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate());
            tomorrow.setHours(18);
            tomorrow.setMinutes(50);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem("notification", JSON.stringify(true));
          }
        });
      }
    });
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
