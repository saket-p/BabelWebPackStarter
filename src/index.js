import { getUsers } from './users.js';

const userListElem = document.querySelector('#users');
getUsers().then(users => {
    userListElem.innerHTML = users.map(user => user.name)
        .reduce((userArr, userName) => {
            userArr.splice(1, 0, `<li>${userName}</li>`);
            return userArr;
        }, ['<ul>', '</ul>']).join('');
    
});


