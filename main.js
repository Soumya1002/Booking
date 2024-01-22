   const name = document.querySelector('#name');
   const email = document.querySelector('#email');
   const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const userList=document.querySelector('#user-list');

let flag="false";

addbtn.addEventListener('click', (e) => {
    console.log("welcome");
    e.preventDefault(); 

    const existingUsersString = localStorage.getItem('userdetail');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
      
    const isEmailUnique = existingUsers.every(user => user.email !== email.value);

    if (flag="false" && !isEmailUnique) {
        alert("Email already exists. Please use a different email");
        location.reload();
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
            
            let editbtn=document.createElement('button');          
            editbtn.className="btn-edit edit"
            editbtn.appendChild(document.createTextNode("Edit"));

            li.appendChild(document.createTextNode(user.name + " " + user.email + " " + user.phonenum+ " "));
            li.appendChild(delbtn);
            li.appendChild(editbtn);

            userList.appendChild(li);
        });
       
    } else {
        window.alert("No user details found");
    }
});

userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteItem(e);
    } else if (e.target.classList.contains('edit')) {
        editItem(e);
    }
});

function deleteItem(e) {
    const parentLi = e.target.parentElement;
    userList.removeChild(parentLi);

   
    const emailToDelete = parentLi.textContent.split(' ')[1].trim();

    const updatedUsers = (JSON.parse(localStorage.getItem('userdetail')) || []).filter(user => user.email !== emailToDelete);
    localStorage.setItem('userdetail', JSON.stringify(updatedUsers));

    console.log("Updated users in localStorage: ", updatedUsers);
}

function editItem(e) {
    flag="true";
    console.log('edit');

        let Parli = e.target.parentElement;
        userList.removeChild(Parli);

        let na = Parli.textContent.split(' ')[0].trim();        
        let mail = Parli.textContent.split(' ')[1].trim();
        let pno = Parli.textContent.split(' ')[2].trim();

        console.log(mail);

        const updatedUsers = (JSON.parse(localStorage.getItem('userdetail')) || []).filter(user => user.email !== mail);
        localStorage.setItem('userdetail', JSON.stringify(updatedUsers));

        name.value = na;
        email.value = mail;
        phonenum.value = pno;


}

