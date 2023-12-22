const airdrops = {
    upcoming: [
        {
            name: "CryptoGalaxy",
            description: "Раздача токенов для ранних подписчиков новой криптовалюты, ориентированной на космические технологии.",
            price: null,
            startDate: "2024-02-01",
            endDate: "2024-02-15"
        },
        {
            name: "GreenChain",
            description: "Экологически ориентированный токен, поддерживающий проекты возобновляемой энергии.",
            price: "0.05",
            startDate: "2024-03-20",
            endDate: "2024-04-05"
        }
    ],
    active: [
        {
            name: "HealthToken",
            description: "Токен для поддержки инноваций в области здравоохранения.",
            price: "0.10",
            startDate: "2023-12-01",
            endDate: "2023-12-31"
        },
        {
            name: "EduCoin",
            description: "Токен для финансирования образовательных проектов и стипендий.",
            price: "0.02",
            startDate: "2023-11-15",
            endDate: "2023-12-30"
        }
    ],
    past: [
        {
            name: "ArtToken",
            description: "Токен для поддержки художников и культурных проектов.",
            price: "0.08",
            startDate: "2023-06-01",
            endDate: "2023-06-15"
        },
        {
            name: "TravelChain",
            description: "Токен для стимулирования туризма и путешествий.",
            price: "0.03",
            startDate: "2023-05-10",
            endDate: "2023-05-25"
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    displayAirdrops('upcoming', airdrops.upcoming);
    displayAirdrops('active', airdrops.active);
    displayAirdrops('past', airdrops.past);
});

function displayAirdrops(sectionId, airdrops) {
    const section = document.getElementById(sectionId);
    if (section && airdrops.length > 0) {
        airdrops.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.classList.add('airdrop-section');
            adElement.innerHTML = `
                <div class="airdrop-name">${ad.name}</div>
                <div>${ad.description}</div>
                <div>Price: ${ad.price ? ad.price + '$' : 'N/A'}</div>
                <div>Start Date: ${ad.startDate}</div>
                <div>End Date: ${ad.endDate}</div>
            `;
            section.appendChild(adElement);
        });
    } else {
        section.innerHTML = `<div>No ${sectionId} airdrops found.</div>`;
    }
}