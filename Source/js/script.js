const btn = document.querySelector('#button');
const input = document.querySelector('#input');
const url = 'https://jsonplaceholder.typicode.com/users';

btn.addEventListener('click', getUsers);

async function getUsers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();

        if (result.length > 0) {
            const firstUserName = result[0].name; // Отримуємо ім'я першого користувача
            input.value = firstUserName; // Вставляємо ім'я в інпут
        } else {
            console.log('No users found.');
        }

    } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
}

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