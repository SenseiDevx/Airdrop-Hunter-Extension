document.addEventListener('DOMContentLoaded', function () {
    fetch('../js/data.json')
        .then(response => response.json())
        .then(data => {
            displayAirdrops('latest', data.latestAirdrops);
            displayAirdrops('hottest', data.hottestAirdrops);
            displayAirdrops('potential', data.potentialAirdrops);
        })
        .catch(error => console.error('Ошибка при загрузке airdrops:', error));

    document.getElementById('latest-btn').addEventListener('click', () => toggleAirdrops('latest'));
    document.getElementById('hottest-btn').addEventListener('click', () => toggleAirdrops('hottest'));
    document.getElementById('potential-btn').addEventListener('click', () => toggleAirdrops('potential'));
});

function displayAirdrops(sectionId, airdrops) {
    const section = document.getElementById(sectionId);
    if (section && airdrops.length > 0) {
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
            adElement.addEventListener('click', function() {
                showAboutPage(ad.id);
            });
        });
    } else {
        section.innerHTML = `<div>No ${sectionId} airdrops found.</div>`;
    }
}

function toggleAirdrops(sectionId) {
    document.querySelectorAll('.airdrops-section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';
}


let allAirdrops;
function showAboutPage(adId) {
    const airdrop = allAirdrops.find(ad => ad.id === adId);

    if (airdrop) {
        const mainContent = document.querySelector('.main-content');
        const aboutContent = document.querySelector('.about-content');
        const backButton = document.createElement('button');
        backButton.textContent = 'Назад';
        backButton.id = 'back-btn';

        backButton.addEventListener('click', function() {
            mainContent.style.display = 'block';
            aboutContent.style.display = 'none';
        });

        aboutContent.innerHTML = `    
            <div class="about-airdrop">
                <div class="about-airdrop-image">
                    <img class="image" src="${airdrop.image}" alt="${airdrop.name}"> 
                </div>
                <div class="airdrop-about-data">
                    <h2 class="about-airdrop-name">${airdrop.name}</h2>
                    <p class="about-airdrop-description">${airdrop.description}</p>
                    <p class="about-airdrop-status">Status: ${airdrop.status}</p>
                    <p class="about-airdrop-price">${airdrop.price}</p>
                    <p class="about-airdrop-price">${airdrop.platform}</p>
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
