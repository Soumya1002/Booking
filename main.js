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
           

            let delbtn=document.createElement('button');          
            delbtn.className="btn-danger delete"
            delbtn.appendChild(document.createTextNode("Delete"));

            li.appendChild(document.createTextNode(user.name + " " + user.email + " " + user.phonenum));
            li.appendChild(delbtn);

            userList.appendChild(li);
        });
       
    } else {
        window.alert("No user details found");
    }
});

userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const parentLi = e.target.parentElement;
        userList.removeChild(parentLi);

        // Extract the name from the clicked element
        const nameToDelete = parentLi.textContent.split(' ')[0].trim();

        // Update localStorage by filtering out the user with the matching name
        const updatedUsers = (JSON.parse(localStorage.getItem('userdetail')) || []).filter(user => user.name !== nameToDelete);
        localStorage.setItem('userdetail', JSON.stringify(updatedUsers));

    }
});

