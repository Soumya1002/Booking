   const name = document.querySelector('#name');
   const email = document.querySelector('#email');
   const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const userList=document.querySelector('#user-list');

let flag="false";

addbtn.addEventListener('click', (e) => {               
    const user = {
        name: name.value,
        email: email.value,
        phonenum: phonenum.value
    }; 
    const userId = addbtn.getAttribute("data-user-id"); 


      if (userId) {
        axios.put(`https://crudcrud.com/api/1b9a8e3ccd89478faf831c23ea924eb0/users/${userId}`, user)
            
    } else {
        
        axios.post("https://crudcrud.com/api/1b9a8e3ccd89478faf831c23ea924eb0/users", user)
           
    }

    // Reset form fields
    name.value = '';
    email.value = '';
    phonenum.value = '';

    // Reset button to "Add" mode
    addbtn.removeAttribute("data-user-id");
    addbtn.value = 'Add';

    // Reload the window (optional, depending on your requirements)
    window.reload();
});


window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/1b9a8e3ccd89478faf831c23ea924eb0/users")
    .then(res => {
        for (let i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
    }).catch(err => {
        console.log(err);
    })
})



function showUser(data) {
   
let user=data;
    console.log(user);    
            let li = document.createElement('li');
            li.className = "list-group-item";
           

            let delbtn=document.createElement('button');          
            delbtn.className="btn-danger delete"
            delbtn.appendChild(document.createTextNode("Delete"));
            
            let editbtn=document.createElement('button');          
            editbtn.className="btn-edit edit"
            editbtn.appendChild(document.createTextNode("Edit"));

            li.setAttribute('data-user-id', user._id);

            li.appendChild(document.createTextNode(user.name + "|" + user.email + "|" + user.phonenum+ "|"));
            li.appendChild(delbtn);
            li.appendChild(editbtn);

            userList.appendChild(li);     
       
    
};

userList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteItem(e);
    } else if (e.target.classList.contains('edit')) {
        editItem(e);
    }
});

function deleteItem(e) {
    const parentLi = e.target.parentElement;
    const userId = parentLi.getAttribute('data-user-id');

    // Sending DELETE request
    axios.delete(`https://crudcrud.com/api/1b9a8e3ccd89478faf831c23ea924eb0/users/${userId}`)
    .then(() => {
        // Remove the list item from the UI
        userList.removeChild(parentLi);
    })
    .catch(err => {
        console.log(err);
    });
}



function editItem(e) {
    flag = "true";
    console.log('edit');

    // Get the parent list item
    let parentLi = e.target.parentElement;

    // Get the user ID from the data attribute
    let userId = parentLi.getAttribute("data-user-id");

    // Get the user details from the list item
    let name = parentLi.textContent.split('|')[0].trim();
    let email = parentLi.textContent.split('|')[1].trim();
    let phonenum = parentLi.textContent.split('|')[2].trim();

    // Set the form values
    document.querySelector('#name').value = name;
    document.querySelector('#email').value = email;
    document.querySelector('#phoneno').value = phonenum;

    // Set the update button attributes
    addbtn.setAttribute("data-user-id", userId);
    addbtn.value = 'Update';
    //deleteItem();
}



