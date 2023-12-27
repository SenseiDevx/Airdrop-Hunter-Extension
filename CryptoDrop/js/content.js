const keywords = ["airdrop", "token giveaway", "crypto airdrop"];

function createPopup() {
    const popup = document.createElement('div');

    popup.style = `
        width: 200px;
        position: fixed;
        bottom: 30px;
        left: 20px;
        padding: 5px;
        padding-top: 10px;
        z-index: 9999;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        background-color: #1f73b9;
        font-size: 12px;
        color: #fff;
        font-family: Arial, Helvetica, sans-serif;
    `
    popup.innerHTML = '<strong>Crypto Drop</strong><div id="airdrop-info">Проверка текущего сайта...</div><div id="airdrop-history">Сайты с обнаруженными аирдропами:</div>';
    document.body.appendChild(popup);
    updateHistory();
}

// Функция для обновления истории посещенных сайтов
function updateHistory() {
    chrome.storage.local.get(['visitedSites'], function(result) {
        const historyDiv = document.getElementById('airdrop-history');
        if (result.visitedSites && result.visitedSites.length > 0) {
            historyDiv.innerHTML = 'Сайты с обнаруженными аирдропами:<br>' + result.visitedSites.map(site => `- ${site}`).join('<br>');
        } else {
            historyDiv.innerHTML = 'Сайты с обнаруженными аирдропами: нет.';
        }
    });
}

function updateCurrentSiteInfo(found, url = '') {
    const infoDiv = document.getElementById('airdrop-info');
    if (found) {
        infoDiv.innerText = `На этом сайте обнаружены аирдропы: ${url}`;
        // Добавление сайта в хранилище
        chrome.storage.local.get(['visitedSites'], function(result) {
            const visitedSites = result.visitedSites || [];
            if (!visitedSites.includes(url)) {
                visitedSites.push(url);
                chrome.storage.local.set({visitedSites: visitedSites}, function() {
                    updateHistory();
                });
            }
        });
    } else {
        infoDiv.innerText = 'Аирдропы на этом сайте не обнаружены.';
    }
}
function checkForAirdrops() {
    // Игнорирование сайта google.com
    if (!window.location.href.includes("google.com")) {
        const text = document.body.innerText.toLowerCase();
        let found = keywords.some(keyword => text.includes(keyword));
        updateCurrentSiteInfo(found, window.location.href);
    } else {
        // Обработка случая, когда сайт - это google.com
        updateCurrentSiteInfo(false);
    }
}

window.addEventListener('load', () => {
    createPopup();
    checkForAirdrops();
});