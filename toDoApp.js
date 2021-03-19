// select require elements
const INDEXES = document.getElementById('index');

document.addEventListener('DOMContentLoaded', getToDo);
const LISTCONTAINER = document.getElementById('list');
LISTCONTAINER.addEventListener('click',checkDelete);



var dt = new Date();
let options = {weekday:'long', month:'short', day:'numeric'};
date.innerHTML=dt.toLocaleDateString("en-US",options);

// add Event Listener to Enter Button 
document.addEventListener('keyup', function createNew(e) {
	var inputField = document.querySelector('input#item');
	e.preventDefault();
	if (e.keyCode==13) {
		if(inputField.value!==""){
			addToDo(inputField.value);
			inputField.value='';
		}
		else alert('Write something to Add in List')
	}
});

// FUNCTION DEFINATION OF addToDo(text)//

function addToDo(name) {
	let index = 1;
	var newItem = `<li class="item">
						<i class="complete fa fa-check-circle font-zero"></i>
						<p class="text">${name}</p>
						<i class="delete fa fa-trash"></i>
					</li>`;
	LISTCONTAINER.insertAdjacentHTML("beforeend", newItem);
	addToLocal(name);
	
	// CALL THE FUNCTION addToLocal(itemName)

}

// FUNCTION TO ADD ITEMS IN LOCAL STORAGE //

function addToLocal(itemName) {
	
	let todos;
	if (localStorage.getItem('todos')===null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.push(itemName);
	localStorage.setItem("todos",JSON.stringify(todos));

}

// FUNCTION TO RETRIVE THE SAVE TODOS BACK

function getToDo() {
	let todos;
	if (localStorage.getItem('todos')===null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.forEach(function(todo){
		var newItem = `<li class="item">
						<i class="complete fa fa-check-circle font-zero"></i>
						<p class="text">${todo}</p>
						<i class="delete fa fa-trash"></i>
					</li>`;
		LISTCONTAINER.insertAdjacentHTML("beforeend", newItem);
		
	});
	
}

function checkDelete(e) {
	if (e.target.classList[0]=="delete") {
		e.target.parentElement.remove();
		let innerTxt = e.target.parentElement.children[1].innerText;
		removeFromLocal(innerTxt);
	}
	else if (e.target.classList[0]=="complete"){
		e.target.classList.toggle('font-zero');
		e.target.parentElement.classList.toggle('comp');
	}

}

function removeFromLocal(itemName) {
	let todos;
	if (localStorage.getItem('todos')===null){
		todos = [];
	}
	else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.splice(todos.indexOf(itemName), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}

