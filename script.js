const data = [
    {
        "type": "person",
        "firstname": "Psyche",
        "lastname": "Rubena",
        "age": 21,
        "status": "Active",
        "sex": "Female",
        "avatar": "2-f.jpeg"
    },
    {
        "type": "place",
        "name": "Pott Shrigley",
        "region": "England",
        "avatar": "England.png",
        "longitude": "53.309",
        "latitude": "-2.084"
    },
    {
        "type": "quote",
        "title": "The Two Towers",
        "description": "There is some good in this world, and it\u2019s worth fighting for.",
        "author": "J.R.R. Tolkien",
        "avatar": "j-r-r-tolkien.jpg"
    },
    // Add the rest of the data here...
];

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions');
const resultContainer = document.getElementById('result-container');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';
   
    if (query.length > 0) {
        const suggestions = data.filter(item => {
            if (item.type === 'person') {
                return `${item.firstname} ${item.lastname}`.toLowerCase().includes(query);
            } else if (item.type === 'place') {
                return item.name.toLowerCase().includes(query);
            } else if (item.type === 'quote') {
                return item.title.toLowerCase().includes(query);
            }
        });

        suggestions.forEach(item => {
            const li = document.createElement('li');
            if (item.type === 'person') {
                li.textContent = `${item.firstname} ${item.lastname}`;
            } else if (item.type === 'place') {
                li.textContent = item.name;
            } else if (item.type === 'quote') {
                li.textContent = item.title;
            }
            li.addEventListener('click', () => {
                showResult(item);
            });
            suggestionsList.appendChild(li);
        });
    }
});

function showResult(item) {
    resultContainer.innerHTML = '';
    if (item.type === 'person') {
        resultContainer.innerHTML = `
            <img src="${item.avatar}" alt="${item.firstname}">
            <div class="name">${item.firstname} ${item.lastname}</div>
            <div class="details">Age: ${item.age}</div>
            <div class="details">Sex: ${item.sex}</div>
            <div class="details">Status: ${item.status}</div>
        `;
    } else if (item.type === 'place') {
        resultContainer.innerHTML = `
            <img src="${item.avatar}" alt="${item.name}">
            <div class="name">${item.name}</div>
            <div class="details">Region: ${item.region}</div>
            <div class="details">Longitude: ${item.longitude}</div>
            <div class="details">Latitude: ${item.latitude}</div>
        `;
    } else if (item.type === 'quote') {
        resultContainer.innerHTML = `
            <img src="${item.avatar}" alt="${item.title}">
            <div class="name">${item.title}</div>
            <div class="details">"${item.description}"</div>
            <div class="details">- ${item.author}</div>
        `;
    }
    resultContainer.style.display = 'block';
}
