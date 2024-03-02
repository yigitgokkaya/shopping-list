// Query  Selectors
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  //Create Button
  const button = createButton("remove-item btn-link text-red");
  // Append button to the  created li element
  li.appendChild(button);
  //Append created li to the ul
  itemList.appendChild(li);
  // Clear the input field
  itemInput.value = "";
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

// Event Listeners
itemForm.addEventListener("submit", addItem);
