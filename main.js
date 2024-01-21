const name = document.querySelector('#name');
const email = document.querySelector('#email');
const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const userList = document.querySelector('#user-list');

addbtn.addEventListener('click', (e) => {
    console.log("welcome");
    e.preventDefault();

    const existingUsersString = localStorage.getItem('userdetail');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];

    // Check if the email already exists
    const isEmailUnique = existingUsers.every(user => user.email !== email.value);

    if (!isEmailUnique) {
        alert("Email already exists. Please use a different email.");
        return;
    }

    const user = {
        name: name.value,
        email: email.value,
        phonenum: phonenum.value
    };

    existingUsers.push(user);

    localStorage.setItem('userdetail', JSON.stringify(existingUsers));

    location.reload();
});

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const usersString = localStorage.getItem('userdetail');
    const users = JSON.parse(usersString);

    console.log(users);

    userList.innerHTML = '';

    if (users && users.length > 0) {
        users.forEach(user => {
            let li = document.createElement('li');
            li.className = "list-group-item";

            let delbtn = document.createElement('button');
            delbtn.className = "btn btn-danger";
            delbtn.appendChild(document.createTextNode("Delete"));

            delbtn.addEventListener('click', () => {
                deleteUser(user.email);
            });

            li.appendChild(document.createTextNode(user.name + " " + user.email + " " + user.phonenum));
            li.appendChild(delbtn);

            userList.appendChild(li);
        });

    } else {
        window.alert("No user details found");
    }
});

function deleteUser(email) {
    let usersString = localStorage.getItem('userdetail');
    let users = JSON.parse(usersString);

    users = users.filter(user => user.email !== email);

    localStorage.setItem('userdetail', JSON.stringify(users));

    location.reload();
}
