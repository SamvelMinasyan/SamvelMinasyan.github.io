const categories = {
    "moyka": ["Lva inqd", "avtolvacum"],
    "zapravka": ["hexuk gaz", "benzin", "gaz", "elektro"],
    "artaqin": ["c1", "c2", "c3"],
    "texnikakan": ["d1", "d2"]
};

const coordinates = {
    "Lva inqd": [['40.204482,44.498291', "Samo"], ["40.154790,44.511073", "Hayko"]]
};

const categoryButtonsContainer = document.getElementById('categories');
const mapContainer = document.getElementById('map');

function createCategoryButtons(category) {
    const buttons = categories[category];
    const categoryButtonsDiv = document.createElement('div');
    categoryButtonsDiv.className = 'category-buttons';
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button;
        btn.className = "subCategory"
        btn.addEventListener('click', () => {
            showMap(coordinates[button]);
        });
        categoryButtonsDiv.appendChild(btn);
    });
    return categoryButtonsDiv;
}


function showMap(coords) {
    ymaps.ready(() => {
        const map = new ymaps.Map('map', {
            center: [40.177764, 44.513061],
            zoom: 12
        });

        coords.forEach(coordSet => {
            const [lat, lng] = coordSet[0].split(',');
            const labelText = coordSet[1] || '';

            const marker = new ymaps.Placemark([parseFloat(lat), parseFloat(lng)], {}, {
                preset: 'islands#blueDotIcon'
            });

            const customLayout = ymaps.templateLayoutFactory.createClass(
                `<div class="custom-label">${labelText}</div>`
            );

            // Create a placemark with the custom layout
            const label = new ymaps.Placemark([parseFloat(lat), parseFloat(lng)], {}, {
                iconLayout: customLayout,
                iconShape: {
                    type: 'Rectangle',
                    coordinates: [[-100, -15], [100, 15]] // Adjust the rectangle size as needed
                }
            });

            map.geoObjects.add(marker);
            map.geoObjects.add(label);
            // const label = new ymaps.Placemark([parseFloat(lat), parseFloat(lng)], {
            //     iconContent: labelText,
            //     iconLayout: 'default#imageWithContent',
            //     iconImageSize: [200, 50],
            //     iconOffset: [-1000, -250]
            // });

            // map.geoObjects.add(marker);
            // map.geoObjects.add(label);
        });
    });
}


document.getElementById('moykaBtn').addEventListener('click', () => {
    categoryButtonsContainer.innerHTML = '';
    categoryButtonsContainer.appendChild(createCategoryButtons('moyka'));
});

document.getElementById('zapravkaBtn').addEventListener('click', () => {
    categoryButtonsContainer.innerHTML = '';
    categoryButtonsContainer.appendChild(createCategoryButtons('zapravka'));
});

document.getElementById('artaqinBtn').addEventListener('click', () => {
    categoryButtonsContainer.innerHTML = '';
    categoryButtonsContainer.appendChild(createCategoryButtons('artaqin'));
});

document.getElementById('texnikakanBtn').addEventListener('click', () => {
    categoryButtonsContainer.innerHTML = '';
    categoryButtonsContainer.appendChild(createCategoryButtons('texnikakan'));
});