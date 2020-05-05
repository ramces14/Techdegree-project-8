const main = document.getElementById('main-grid');
const modalContainer = document.querySelector('.modal-content');
const popup = document.querySelector('.popup');
const close = document.querySelector('.close');
let people = [];


fetch('https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US')
    .then(response => response.json())
    .then(data => data.results)
    .then(displayData)


function displayData(data){
    people = data;
    let html = '';
    people.forEach((person, number) => {
        let name = person.name;
        let email = person.email;
        let city = person.location.city;
        let picture = person.picture.medium;
        html += `
        <div class="card" data-number="${number}">
            <img class="random-person" src="${picture}">
            <div class="text-container">
                <h3 class="name">${name.first} ${name.last}</h3>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>`
    });
    main.innerHTML = html;
};

function displayModal(number) {
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = people[number];
    let date = new Date(dob.date);

    const modalHTML = `
            <img class="modal-random-person" src="${picture.medium}">
            <div class="modal-text-container">
                <h2 class="modal-name">${name.first} ${name.last}</h2>
                <p class="modal-email">${email}</p>
                <p class="modal-city">${city}</p>
                <hr/>
                <p class="modal-phone">${phone}</p>
                <p class="modal-address">${street.number} ${street.name} ${city}, ${state} ${postcode}</p>
                <p class="modal-date"> Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
            </div>`;
        popup.style.display = "block";
        modalContainer.innerHTML = modalHTML;
}

main.addEventListener('click', e => {
    if (e.target !== main) {
        const card = e.target.closest(".card");
        const number = card.getAttribute('data-number');

        displayModal(number);
    }
});

close.addEventListener('click', () => {
    popup.style.display = "none";
})