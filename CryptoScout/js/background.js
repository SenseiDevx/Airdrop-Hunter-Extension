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

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm triggered", alarm);
    if (alarm.name === "postInstall") {
        chrome.notifications.create('cookieTrackingAlert', {
            type: 'basic',
            iconUrl: "../assets/images/icon.png",
            title: 'Privacy Notice',
            message: 'This extension tracks cookies for functionality purposes. Please review our privacy policy for more details.'
        });
    }
});


chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
        console.log(tab.url, tab.title);
    }
});

chrome.storage.local.set({key: "value"}, function () {
    if (chrome.runtime.lastError) {
        console.log("Error when saving:", chrome.runtime.lastError);
    } else {
        console.log("The value has been successfully saved.");
    }
});


chrome.storage.onChanged.addListener(function (changes, areaName) {
    console.log(changes, areaName);
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.setExtensionActionOptions({displayActionCountAsBadgeText: true});
});
