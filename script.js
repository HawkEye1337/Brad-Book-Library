// Book Constructor
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
	const list = document.querySelector("#book-list");
	// create html row for a book
	const row = document.createElement("tr");
	let text = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
    <td><a href="#" class="delete">X</a?</td>
    `;
	row.insertAdjacentHTML("afterbegin", text);
	list.append(row);
};

UI.prototype.clearFields = function () {
	document.querySelector("#title").value = "";
	document.querySelector("#author").value = "";
	document.querySelector("#pages").value = "";
	document.querySelector("#read").checked = false;
};

// show alert

UI.prototype.showAlert = function (msg, className) {
	// create a div
	const div = document.createElement("div");
	// add class
	div.className = `alert ${className}`;
	// add alert text
	div.textContent = msg;

	// select alert parent
	const container = document.querySelector(".container");
	// select alert sibling
	const form = document.querySelector("#book-form");
	// insert alert
	container.insertBefore(div, form);

	// alert timeout
	setTimeout(function () {
		document.querySelector(".alert").remove();
	}, 3000);
};

// delete a book method
UI.prototype.deleteBook = function (ui, target) {
	if (target.className === "delete") {
		target.parentElement.parentElement.remove();
		//show removed alert
		ui.showAlert("Book Removed!", "success");
	}
};

//Event Listeners
// Submit Event
document.querySelector("#book-form").addEventListener("submit", function (e) {
	// get book info from the form
	const title = document.querySelector("#title").value,
		author = document.querySelector("#author").value,
		pages = document.querySelector("#pages").value;
	let read = document.querySelector("#read").checked;
	read = read === true ? "Yes" : "No";

	// create book object containing said info
	const book = new Book(title, author, pages, read);
	// create book UI object
	const ui = new UI();

	// validate if book info exists in form
	if (title === "" || author === "" || pages === "") {
		// show error
		ui.showAlert("please fill in all fields", "error");
		e.preventDefault();
	} else {
		// add book to list
		ui.addBookToList(book);

		// show success alert
		ui.showAlert("Book Added", "success");
		// clear form fields
		ui.clearFields();
		e.preventDefault();
	}
});
// delete a book Event
document.querySelector("#book-list").addEventListener("click", function (e) {
	// create new UI object
	const ui = new UI();

	ui.deleteBook(ui, e.target);

	e.preventDefault();
});
