const expenseList = document.querySelector("#expense-list");



function addUser(){
var name=document.getElementById('username').value;
var password=document.getElementById('password').value;
var  emailid= document.getElementById('email').value;

    console.log("in");          
    

        console.log(name);
        console.log(password);   
        console.log(emailid);       

        const user=JSON.parse(localStorage.getItem('user'))||[];
        user.push({username:name, password:password, emailid:emailid});
        localStorage.setItem('user', JSON.stringify(user));

        console.log("User Details:", JSON.parse(localStorage.getItem('user')));
        resetform();


    return false;

};

function resetform(){
    document.getElementById('username').value='';
       document.getElementById('password').value='';
         document.getElementById('email').value='';
}

function showUser() {
    const users = JSON.parse(localStorage.getItem('user'));

    // Clear existing list items
    expenseList.innerHTML = ' ';

    // Check if there are any users
    if (users&& users.length > 0) {
              
        users.forEach(user => {
            const li = document.createElement('li');
            const username = user.username;
            const password = user.password;
            const email = user.emailid;

            const userDataParagraph = document.createElement('p');
            userDataParagraph.innerHTML = `${username}, ${password}, ${email}`;
            userDataParagraph.className="userdetails";
            li.appendChild(userDataParagraph);

            var edit=document.createElement('button');
            edit.innerText='Edit';    
            edit.className="newbutton";        
            li.appendChild(edit);


            var del=document.createElement('button');
            del.innerText="Delete";
            del.className="newbutton";     
            li.appendChild(del);

            
            li.className = "list-group-item";
            expenseList.appendChild(li);


           
           
         
        });
        
    } else {
        // Display a message if no users are found
        alert('No user data found in localStorage.');
    }
}
