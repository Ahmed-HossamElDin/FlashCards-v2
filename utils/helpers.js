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
    .then(data => {
      if (data === null) {
        Notifications.requestPermissionsAsync()
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(19);
              tomorrow.setMinutes(30);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), {
                time: tomorrow,
                repeat: 'day'
              });

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          }).catch(err => {
              console.log(err)});
      }
    }).catch(err => {
      console.log(err)});
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}
