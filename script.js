const API = "https://YOUR_API_URL/contacts"

const list = document.getElementById("contactList")

function getContacts(){

fetch(API)
.then(res => res.json())
.then(data => {

list.innerHTML = ""

data.forEach(contact => {

const li = document.createElement("li")

li.innerHTML = `
<div>
<strong>${contact.name}</strong><br>
${contact.phone}<br>
${contact.email}
</div>

<div class="actions">
<button onclick="editContact('${contact.id}')">Edit</button>
<button class="delete" onclick="deleteContact('${contact.id}')">Delete</button>
</div>
`

list.appendChild(li)

})

})

}

getContacts()

function addContact(){

const name = document.getElementById("name").value
const phone = document.getElementById("phone").value
const email = document.getElementById("email").value

fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name,
phone,
email
})
})
.then(()=>{

document.getElementById("name").value=""
document.getElementById("phone").value=""
document.getElementById("email").value=""

getContacts()

})

}

function deleteContact(id){

fetch(`${API}/${id}`,{
method:"DELETE"
})
.then(()=>getContacts())

}

function editContact(id){

const newName = prompt("Enter new name")

if(!newName) return

fetch(`${API}/${id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:newName
})
})
.then(()=>getContacts())

}