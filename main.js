   const name = document.querySelector('#name');
   const email = document.querySelector('#email');
   const phonenum = document.querySelector('#phoneno');

const addbtn = document.querySelector('.addbtn');
const showbtn = document.querySelector('.showbtn');
const userList=document.querySelector('#user-list');

addbtn.addEventListener('click', (e) => {
    console.log("welcome");
    e.preventDefault(); 

    const user = {
        name: name.value,
        email: email.value,
        phonenum: phonenum.value
    };

    console.log('in');

    localStorage.setItem('userdetail', JSON.stringify(user));
});



showbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    
    const detailsString = localStorage.getItem('userdetail');
    const details = JSON.parse(detailsString);
    
    console.log(details);
    let li=document.createElement('li');
    li.className="list-group-item";
    li.appendChild(document.createTextNode(details.name+" "+details.email+" "+details.phonenum));

    userList.appendChild(li);
    window.alert("user details displayed on console and screen");
})
    
