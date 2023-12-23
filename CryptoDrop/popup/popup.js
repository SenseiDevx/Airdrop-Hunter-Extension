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
                <div class="card-block">
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