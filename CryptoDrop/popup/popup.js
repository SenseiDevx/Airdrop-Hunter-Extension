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
                        <img src="${ad.image}" alt="img"> 
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
        const aboutContent = document.querySelector('.about-content');
        aboutContent.innerHTML = `
            <div class="about-airdrop">
                <img src="${airdrop.image}" alt="${airdrop.name}" class="about-airdrop-image">
                <h2 class="about-airdrop-name">${airdrop.name}</h2>
                <p class="about-airdrop-description">${airdrop.description}</p>
                <p class="about-airdrop-status">Status: ${airdrop.status}</p>
                <p class="about-airdrop-price">${airdrop.price}</p>
            </div>
        `;
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
    // Остальная часть кода
});
