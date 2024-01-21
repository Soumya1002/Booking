   const name = document.querySelector('#name');
   const email = document.querySelector('#email');
   const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const userList=document.querySelector('#user-list');

addbtn.addEventListener('click', (e) => {
    console.log("welcome");
    e.preventDefault(); 

    const existingUsersString = localStorage.getItem('userdetail');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
      
    const user = {
        name: name.value,
        email: email.value,
        phonenum: phonenum.value
    };    

    existingUsers.push(user);

    localStorage.setItem('userdetail', JSON.stringify(existingUsers));

    location.reload();
});



addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const usersString = localStorage.getItem('userdetail');
    const users = JSON.parse(usersString);

    console.log(users);

   
    userList.innerHTML = ''; 

    if (users && users.length > 0) {
        users.forEach(user => {
            let li = document.createElement('li');
            li.className = "list-group-item";
            li.appendChild(document.createTextNode(user.name + " " + user.email + " " + user.phonenum));
            userList.appendChild(li);
        });
       
    } else {
        window.alert("No user details found");
    }
});