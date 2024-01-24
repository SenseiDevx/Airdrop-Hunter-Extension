chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.notifications.create('installNotification', {
            type: 'basic',
            iconUrl: "../assets/images/dollar.png",
            title: 'Installation complete',
            message: 'The extension has been successfully installed!'
        });
    } else if (details.reason === "update") {
        chrome.notifications.create('updateNotification', {
            type: 'basic',
            iconUrl: "../assets/images/dollar.png",
            title: 'Update complete',
            message: 'The extension has been successfully updated!'
        });
    }
});

chrome.alarms.create("checkForAirdrops", {periodInMinutes: 5});
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

chrome.runtime.onInstalled.addListener(function (details) {
    console.log("Extension installed", details);
    if (details.reason === "install") {
        chrome.alarms.create("postInstall", { delayInMinutes: 1 });
    }
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.setExtensionActionOptions({displayActionCountAsBadgeText: true});
});
