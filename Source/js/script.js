const btn = document.querySelector('#button');
const input = document.querySelector('#input');
const url = 'https://jsonplaceholder.typicode.com/users';
const usersBtn = document.querySelector('#usersBtn');
const usersContainer = document.querySelector('.page__cards');

btn.addEventListener('click', getUsers);

/*
const getUsers = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
    
}
*/

async function getUsers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const result = await response.json();
            if (result.length > 0) {
                const firstUserName = result[0].name; // Отримуємо ім'я першого користувача
                input.value = firstUserName; // Вставляємо ім'я в інпут
            } else {
                console.log('No users found.');
            }
        } else {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

async function showUsersList() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            createCards(data);
            updateBtnLabel(true);
        } else {
            throw new Error('Network response was not ok ' + response.statusText);
        }
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

function createCards(cardsData) {
    cardsData.forEach(cardData => {
        const card =
            `<div class="page__card card-page">
                <div class="card-page__image"></div>
                <div class="card-page__body">
                    <p class="card-page__name">${cardData.name}</p>
                    <div class="card-page__link">
                        <a href="email:#" class="card-page__email">${cardData.email}</a>
                    </div>
                    <p class="card-page__city">${cardData.city}</p>
                    <div class="card-page__link">
                        <a href="#" class="card-page__website">${cardData.website}</a>
                    </div>
                </div>
            </div>`;
        usersContainer.insertAdjacentHTML('beforeend', card);
    });
}

function updateBtnLabel(showingUsers) {
    if (showingUsers) {
        usersBtn.textContent = 'Hide Users';
    } else {
        usersBtn.textContent = 'Show All Users';
    }
}

usersBtn.addEventListener('click', () => {
    if (usersContainer.childElementCount > 0) {
        usersContainer.innerHTML = '';
        updateBtnLabel(false);
    } else {
        showUsersList();
    }
})