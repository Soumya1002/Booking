   // Move the retrieval of values inside the event listener
  let name = document.querySelector('#name');
   let email = document.querySelector('#email');
   let phonenum = document.querySelector('#phoneno');

let addbtn = document.querySelector('.addbtn');
let showbtn = document.querySelector('.showbtn');

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

    // Correct usage of localStorage.getItem
    const detailsString = localStorage.getItem('userdetail');

    // Parse the JSON string back into an object
    const details = JSON.parse(detailsString);
    
    console.log(details);
    window.alert("user details displayed on console");
})
    
