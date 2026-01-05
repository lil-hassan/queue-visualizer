const array = new Array();

const sizeInput = document.getElementById("array-size");
const arrayContainer = document.getElementById("arrayContainer");
const input = document.getElementById("array-input");

const message = document.getElementById("message");

document.getElementById("add-to-front").addEventListener("click", add_front);
document.getElementById("add-to-back").addEventListener("click", add_back);

//document.getElementById("add-at-index").addEventListener("click", add_index);
//document.getElementById("remove-index").addEventListener("click", remove_index);

document.getElementById("remove-front").addEventListener("click", remove_front);
document.getElementById("remove-back").addEventListener("click", remove_back);


input.addEventListener("keydown", (event)=>{
  if(event.key === "Enter") {
    event.preventDefault();
    add_back();
  }
});


sizeInput.addEventListener("input", () => {
  const size = Number(sizeInput.value);

  // Max allowed array size is 10
  if(size>10)
  {
    alert("Max Array size: 10") ;
    sizeInput.value = "" ; 
    return ;
  }

  // if size NaN or less than 0, print: Empty Array
  if (!size || size <= 0) {
    arrayContainer.innerHTML = "";
    message.textContent = "Array is empty.";
    return;
  }

  // Remove existing array display
  arrayContainer.innerHTML = "";

  // Render an empty array
  for (let i = 0; i < size; i++) 
    {
    const div = document.createElement("div");
    div.className = "array-item empty"; // Applies css to the div
    div.textContent = "-"; // empty slot indicator
    arrayContainer.appendChild(div);
  }

  message.textContent = `Initialized array of size ${size}.`;
});


// Add at index 0 and shift others elements if they exist
function add_front() {
  const value = input.value.trim();
  const maxSize = Number(sizeInput.value);

  if (value === "") {
    message.textContent = "Please enter a Key value.";
    return;
  }

  if (array.length >= maxSize) {
    message.textContent = "Array Overflow! Cannot Add.";
    return;
  }

  array.unshift(value);
  input.value = "";

  // Lock queue size after first enqueue
  sizeInput.disabled = true;

  message.textContent = `Added ${value} to the start of Array.`;
  renderArray();
}

// Add at index (array.length-1)
function add_back() 
{
    const value = input.value.trim();
  const maxSize = Number(sizeInput.value);

  if (value === "") {
    message.textContent = "Please enter a Key value.";
    return;
  }

  if (array.length >= maxSize) {
    message.textContent = "Array Overflow! Cannot Add.";
    return;
  }

  array.push(value);
  input.value = "";

  // Lock the queue size after first enqueue
  sizeInput.disabled = true;

  message.textContent = `Added ${value} to the End of Array.`;
  renderArray();
}

// remove array(0) and shift left 
function remove_front() {
  if (array.length === 0) {
    message.textContent = "Array is empty. Nothing to remove.";
    return;
  }

  const removed = array.shift();
  message.textContent = `Removed ${removed} from front.`;
  renderArray();
}

// remove last available index 
function remove_back() {
  if (array.length === 0) {
    message.textContent = "Array is empty. Nothing to remove.";
    return;
  }

  const removed = array.pop();
  message.textContent = `Removed ${removed} from back.`;
  renderArray();
}



function renderArray() {
  const maxSize = Number(sizeInput.value);
  arrayContainer.innerHTML = "";

  // Render all array slots based on max size
  for (let i = 0; i < maxSize; i++) {
    const div = document.createElement("div");
    div.className = "array-item";
    
    // If there's a value at this index, show it; otherwise show empty
    if (i < array.length && array[i] !== undefined) {
      div.textContent = array[i];
      div.classList.add("filled");
    } else {
      div.textContent = "-";
      div.classList.add("empty");
    }
    
    arrayContainer.appendChild(div);
  }
}
