// Save data to localStorage
function saveData() {
  let username = document.getElementById('username').value;
  let usernumber = document.getElementById('usernumber').value;
  let phone = document.getElementById('phone').value;
  let company = document.getElementById('company').value;
  let unit = document.getElementById('unit').value;

  // Check if the user number already exists
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let isUserNumberExists = users.some(user => user.usernumber === usernumber);

  if (isUserNumberExists) {
    alert('This user number already exists. Please enter a unique number.');
    return; // Exit the function if the user number already exists
  }

  let user = {
    username,
    usernumber,
    phone,
    company,
    unit
  };

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Data has been saved successfully!');
  renderUsers();  // Refresh the displayed list
}

// Render users in table
function renderUsers() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  users.forEach((user, index) => {
    resultContainer.innerHTML += `<tr>
      <td>${user.username}</td>
      <td>${user.usernumber}</td>
      <td>${user.phone}</td>
      <td>${user.company}</td>
      <td>${user.unit}</td>
      <td>
        <button class="edit" onclick="editUser(${index})">Edit</button>
        <button class="delete" onclick="deleteUser(${index})">Delete</button>
      </td>
    </tr>`;
  });
}

// Search function
function searchUser() {
  let searchQuery = document.getElementById('search').value.toLowerCase();
  let users = JSON.parse(localStorage.getItem('users')) || [];

  let resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';

  // Show loading animation
  document.getElementById('loading').style.display = 'inline';

  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    
    let filteredUsers = users.filter(user => 
      user.username.toLowerCase().includes(searchQuery) || 
      user.usernumber.includes(searchQuery) || 
      user.phone.includes(searchQuery) || 
      user.company.toLowerCase().includes(searchQuery) || 
      user.unit.toLowerCase().includes(searchQuery)
    );

    if (filteredUsers.length > 0) {
      filteredUsers.forEach((user, index) => {
        resultContainer.innerHTML += `<tr>
          <td>${user.username}</td>
          <td>${user.usernumber}</td>
          <td>${user.phone}</td>
          <td>${user.company}</td>
          <td>${user.unit}</td>
          <td>
            <button class="edit" onclick="editUser(${index})">Edit</button>
            <button class="delete" onclick="deleteUser(${index})">Delete</button>
          </td>
        </tr>`;
      });
    } else {
      resultContainer.innerHTML = '<tr><td colspan="6">No results found.</td></tr>';
    }
  }, 1000);  // Simulating loading time
}

// Edit user data
function editUser(index) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user = users[index];

  document.getElementById('username').value = user.username;
  document.getElementById('usernumber').value = user.usernumber;
  document.getElementById('phone').value = user.phone;
  document.getElementById('company').value = user.company;
  document.getElementById('unit').value = user.unit;

  // Update the button functionality to update the user
  let saveButton = document.querySelector('button');
  saveButton.innerHTML = 'Update Info';
  saveButton.setAttribute('onclick', `updateUser(${index})`);
}

// Update user data
function updateUser(index) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  users[index] = {
    username: document.getElementById('username').value,
    usernumber: document.getElementById('usernumber').value,
    phone: document.getElementById('phone').value,
    company: document.getElementById('company').value,
    unit: document.getElementById('unit').value
  };

  localStorage.setItem('users', JSON.stringify(users));
  alert('Data has been updated successfully!');
  renderUsers();  // Refresh the displayed list

  // Reset form and button text
  document.querySelector('button').innerHTML = 'Save Info';
  document.querySelector('button').setAttribute('onclick', 'saveData()');
}

// Delete user data
function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.splice(index, 1);  // Remove the user at the given index
  localStorage.setItem('users', JSON.stringify(users));
  alert('Data has been deleted successfully!');
  renderUsers();  // Refresh the displayed list
}

// Initial render
renderUsers();
