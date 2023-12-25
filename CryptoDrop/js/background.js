chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        chrome.notifications.create('installNotification', {
            type: 'basic',
            iconUrl: '../assets/images/icon.png',
            title: 'Установка завершена',
            message: 'Расширение Crypto Drop успешно установлено!'
        });
    }
});


chrome.alarms.create("checkForAirdrops", { periodInMinutes: 5 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkForAirdrops") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "../assets/images/dollar.png",
            title: "New Airdrops",
            message: "Check the latest airdrops!"
        });
    }
});
