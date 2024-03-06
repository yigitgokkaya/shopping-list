// DOM Selectors
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearButton = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formButton = itemForm.querySelector("button");

let isEditMode = false;

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
    checkUI();
  });
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;


  // Validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  }else{
    if(checkItemExistence(newItem)){
      alert('Item already exists.');
      return;
    }
  }

  // Create and add item to DOM
  addItemToDOM(newItem);

  //Add given item to local storage
  addItemsToStorage(newItem);

  checkUI();
  // Clear the input field
  itemInput.value = "";
};

const addItemToDOM = (item) => {
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  // Create Button
  const button = createButton("remove-item btn-link text-red");
  // Append button to the  created li element
  li.appendChild(button);
  // Append created li to the ul
  itemList.appendChild(li);
};

// Returns a button with given classes and appends the created icon to it
const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

// Returns an icon with given classes
const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const addItemsToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  // Add item to the array
  itemsFromStorage.push(item);

  // Turns the array into JSON string and put it into the local storage with the given key
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    // Parse the json to turn it into a javascript object and set it to array
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkItemExistence = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formButton.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
};

// Removes the list item when the 'X' icon is clicked
const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // Remove item from DOM

    item.remove();

    // Remove item from local storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
 
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

// Clears the entire Shopping List
const clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear items from local storage
  localStorage.removeItem("items");

  checkUI();
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

// Checks the items on the list and manages the UI accordingly
const checkUI = () => {
  itemInput.value = "";
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemFilter.style.display = "block";
  }

  isEditMode = false;
  formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formButton.style.backgroundColor = "#333";
};

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
