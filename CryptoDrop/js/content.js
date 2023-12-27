const keywords = ["airdrop", "token giveaway", "crypto airdrop"];

function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';

    popup.innerHTML = `
        <h1 class="popup-title">Crypto Drop</h1>
        <div id="airdrop-info" class="popup-info">Checking the current site...</div>
        <div id="airdrop-history" class="popup-history">Sites with airdrops detected:</div>`;
    document.body.appendChild(popup);
    updateHistory();
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .popup {
            width: 300px;
            height: 500px;
            position: fixed;
            bottom: 20px;
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
        }
        .popup-title {
            color: #FFFFFF;
            margin: 5px;
        }
        .popup-info, .popup-history {
            margin: 10px;
            color: white;
        }
        .popup-link {
            color: lightblue;
        }
        .content-h6 {
            color: #f4f0f0;
        }
    `;
    document.head.appendChild(style);
}


function updateCurrentSiteInfo(found, url = '') {
    const infoDiv = document.getElementById('airdrop-info');
    if (found) {
        infoDiv.innerHTML = `<h6 class="content-h6">Airdrops have been discovered on this site:</h6> 
                             <a class="popup-link" href='${url}' target='_blank'>${url}</a>`;

        chrome.storage.local.get(['visitedSites'], function (result) {
            const visitedSites = result.visitedSites || [];
            if (!visitedSites.includes(url)) {
                visitedSites.push(url);
                chrome.storage.local.set({ 'visitedSites': visitedSites }, function () {
                    console.log('Visited sites updated:', visitedSites);
                });
            }
        });
    } else {
        infoDiv.innerHTML = `<h6 class="content-h6">Airdrops are not detected on this site.</h6>`;
    }
}


function updateHistory() {
    chrome.storage.local.get(['visitedSites'], function (result) {
        const historyDiv = document.getElementById('airdrop-history');
        if (result.visitedSites && result.visitedSites.length > 0) {
            const links = result.visitedSites.map(site => `<a href='${site}' target='_blank'>${site}</a>`).join('<br>');
            historyDiv.innerHTML = 'Sites with airdrops detected:<br>' + links;
        } else {
            historyDiv.innerHTML = `<h6> Sites with detected airdrops: none</h6>`;
        }
    });
}

function searchForKeywords(text) {
    return keywords.some(keyword => text.includes(keyword));
}



function checkForAirdrops() {
    if (!window.location.href.includes("google.com")) {
        const paragraphs = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, article');
        let found = false;
        for (const paragraph of paragraphs) {
            if (searchForKeywords(paragraph.innerText.toLowerCase())) {
                updateCurrentSiteInfo(true, window.location.href);
                found = true;
                break;
            }
        }
        if (!found) {
            updateCurrentSiteInfo(false);
        }
    } else {
        updateCurrentSiteInfo(false);
    }
}


window.addEventListener('load', () => {
    addStyles();
    createPopup();
    checkForAirdrops();
});
