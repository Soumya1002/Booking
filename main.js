   const name = document.querySelector('#name');
   const email = document.querySelector('#email');
   const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const userList=document.querySelector('#user-list');

let flag="false";

addbtn.addEventListener('click', (e) => {
    console.log("welcome");
    e.preventDefault();    
            
    const user = {
        name: name.value,
        email: email.value,
        phonenum: phonenum.value
    };  

    let infojson=JSON.stringify(user); 
    axios.post("https://crudcrud.com/api/55cf7c8f8eca400d9ceb5d7c634fe6c0/users",infojson,{
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        showUser(res.data);        
        console.log(res);
        name.value='';
        email.value='';
        phonenum.value= '';
    })
    .catch(err=>{
        console.log(err);
    })
});



function showUser(data) {
   
let user=data;
    console.log(user);

   
    userList.innerHTML = ''; 

   
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
    userList.removeChild(parentLi);

   
    const emailToDelete = parentLi.textContent.split(' ')[1].trim();

    

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

      
        name.value = na;
        email.value = mail;
        phonenum.value = pno;


}

