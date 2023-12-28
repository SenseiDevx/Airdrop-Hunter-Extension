const keywords = ["airdrop", "token giveaway", "crypto airdrop"];

function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup';

    popup.innerHTML = `
        <h1 class="popup-title" style="color: #ffffff; font-size: 22px; font-weight: bold">Crypto Drop</h1>
        <div id="airdrop-info" class="popup-info" style="color: #ffffff; font-size: 18px; font-weight: 500">Checking the current site...</div>`;
    document.body.appendChild(popup);
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .popup {
            width: max-content;
            height: max-content;
            position: fixed;
            bottom: 20px;
            left: 20px;
            padding: 10px;
            padding-top: 10px;
            z-index: 9999;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 10px;
            background-color: #1fb98b;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
}

function updateCurrentSiteInfo(found, url = '') {
    const infoDiv = document.getElementById('airdrop-info');
    if (found) {
        infoDiv.innerHTML = `
            <div class="link-block">
                <h6 class="content-h6" style="color: #ffffff; font-size: 18px; font-weight: 500">Airdrops have been <br> discovered on this site:</h6> 
                <a class="popup-link" href='${url}' target='_blank'>${url}</a>
            </div>`;
    } else {
        infoDiv.innerHTML = `<h6 class="content-h6" style="color: #ffffff; font-size: 18px; font-weight: 500">Airdrops are not <br> detected on this site.</h6>`;
    }
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
