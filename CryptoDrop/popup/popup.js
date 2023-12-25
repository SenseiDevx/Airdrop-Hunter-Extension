let allAirdrops = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('../js/data.json')
        .then(response => response.json())
        .then(data => {
            allAirdrops = data.airdrops || [];
            displayAirdrops(allAirdrops);

            const searchInput = document.querySelector('.input');
            searchInput.addEventListener('input', function() {
                const searchText = searchInput.value.toLowerCase();
                filterAirdrops(searchText);
            });
        })
        .catch(error => console.error('Ошибка при загрузке airdrops:', error));
});

function filterAirdrops(searchText) {
    const filteredAirdrops = allAirdrops.filter(ad => ad.name.toLowerCase().includes(searchText));
    displayAirdrops(filteredAirdrops);
}

function displayAirdrops(airdrops) {
    const section = document.getElementById('all-airdrops');
    if (!section) return;

    section.innerHTML = ''; // Очищаем секцию перед добавлением новых элементов

    if (airdrops.length > 0) {
        airdrops.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.classList.add('airdrop-section');
            adElement.innerHTML = `
                <div class="card-block" data-ad-id="${ad.id}">
                    <div class="airdrop-image">
                        <img src="${ad.image}" alt="${ad.name}"> 
                    </div>
                    <div class="airdrop-data">
                        <h2 class="airdrop-name">${ad.name}</h2>
                        <div class="airdrop-price">
                            <img src="${ad.icon}" alt="img"> 
                            <div class="price-text">${ad.price}</div>
                        </div>
                    </div>
                    <div class="airdrop-status">${ad.status}</div>
                </div>
                `;
            section.appendChild(adElement);
        });
    } else {
        section.innerHTML = '<div>No airdrops found.</div>';
    }
}



function toggleAirdrops(sectionId) {
    document.querySelectorAll('.airdrops-section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}



function showAboutPage(adId) {
    const airdrop = allAirdrops.find(ad => ad.id === adId);

    if (airdrop) {
        const mainContent = document.querySelector('.main-content');
        const aboutContent = document.querySelector('.about-content');
        const backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.id = 'back-btn';

        backButton.classList.add('back-btn');

        backButton.addEventListener('click', function () {
            mainContent.style.display = 'block';
            aboutContent.style.display = 'none';
        });

        let guidesHtml = '<ol class="guides-list">';
        airdrop.stepByStepGuide.forEach(guide => {
            guidesHtml += `<li>${guide}</li>`;
        });
        guidesHtml += '</ol>';

        aboutContent.innerHTML = `    
            <div class="about-airdrop">
                <div class="about-airdrop-image">
                    <img class="image" src="${airdrop.image}" alt="${airdrop.name}"> 
                </div>
                <h2 class="about-airdrop-name">${airdrop.name}</h2>
                <div class="airdrop-about-data">
                    <div class="airdrop-inform">
                        <img src="${airdrop.airdropLinkIcon}" alt="link">
                        <p class="p">Airdrop Link: <a href="${airdrop.airdropLink}" target="_blank">Go to airdrop</a></p>
                    </div>
                    <div class="airdrop-inform">
                        <img src="${airdrop.totalValueIcon}" alt="link">
                        <p class="p">Total value: ${airdrop.totalValue}</p>
                    </div>
                    <div class="airdrop-inform">
                        <img src="${airdrop.platformIcon}" alt="link">
                        <p class="p">Platform: ${airdrop.platform}</p>
                    </div>
                </div>
                <div class="airdrop-about-description">
                    <div class="airdrop-descriptions">
                        <p class="airdrop-p">${airdrop.description}</p>
                        <p class="airdrop-p">${airdrop.description2}</p>
                    </div>
                    <div class="step-by-step">
                        <h3 class="h3">Step-by-Step Guide:</h3>
                        ${guidesHtml}
                    </div>
                    <a href="${airdrop.airdropLink}" target="_blank">
                        <button class="airdrop-button" id="openPage">CLAIM AIRDROP</button>
                    </a>
                </div>
            </div>
        `;

        aboutContent.appendChild(backButton);

        mainContent.style.display = 'none';
        aboutContent.style.display = 'block';
    } else {
        console.error('Airdrop с таким ID не найден:', adId);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('../js/data.json')
        .then(response => response.json())
        .then(data => {
            allAirdrops = [...data.latestAirdrops, ...data.hottestAirdrops, ...data.potentialAirdrops];
        })
        .catch(error => console.error('Ошибка при загрузке airdrops:', error));
});
