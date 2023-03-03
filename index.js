const baseURL = "http://localhost:3000/users";
let container = document.querySelectorAll('.container')
let addBTN = document.querySelector('.add')
let addTodoForm = document.querySelector('#add-todo-form')

fetch(baseURL)
	.then((res) => res.json())
	.then((res) => reload(res.users))
	.catch((err) => console.log(err));


addTodoForm.addEventListener("submit", (e) => {
	e.preventDefault()
	const [nameInp, ageInp, colorInp] = e.target
	const tos = {
		id: Date.now(),
		name: nameInp.value,
		age: ageInp.value,
		color: colorInp.value
	}
	fetch(baseURL, {
		method: "POST",
		body: JSON.stringify(tos),
		headers: { "Content-Type": "application/json;charset=utf-8" }
	})
		.then((res) => res.json())
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
})

function createItem(item) {
	return `
		<div class="item">
			<img src="${item.image}" alt="">
			<span>${item.firstName} ${item.lastName}</span>
			<span>${item.age}</span>
		</div>
	`
}

function reload(arr) {
	container.forEach(el => el.innerHTML = "")
	for (let item of arr) {
		if (item.age < 25) {
			container[0].innerHTML += createItem(item)
		} else if (item.age < 50) {
			container[1].innerHTML += createItem(item)
		} else {
			container[2].innerHTML += createItem(item)
		}

	}

	let items = document.querySelectorAll('.item')
	items.forEach(element => {
		element.style = "background-color: " +
			'#' + (Math.random().toString(16) + '000000').substring(2, 8).toUpperCase();
	});
}
