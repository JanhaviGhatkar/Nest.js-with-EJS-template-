let currentPage = 1;
const pageSize = 10;
function nextPage() {
  currentPage++;
  document.getElementById('currentPage').innerText = `Page ${currentPage}`;
  updateButton();
  fetchAllData();
}

// Function to handle previous page button click
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    document.getElementById('currentPage').innerText = `Page ${currentPage}`;
    updateButton();
    fetchAllData();
  }
}
function updateButton() {
  const prevPageButton = document.getElementById('prevPageButton');
  const nextPageButton = document.getElementById('nextPageButton');
  if (currentPage === 1) {
    prevPageButton.disabled = true;
  } else {
    prevPageButton.disabled = false;
  }
}

const userName = JSON.parse(localStorage.getItem('userData'));
if (!userName) {
  ocument.getElementById('greeting').textContent = 'Welcome!';
}
document.getElementById('greeting').textContent = `Welcome, ${userName}!`;
function tableCreate(data) {
  const tbody = document.getElementById('allDataOfUser');
  tbody.innerHTML = '';
  data.forEach((element) => {
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    tdId.innerHTML = element.id;
    tr.appendChild(tdId);
    const tdName = document.createElement('td');
    tdName.innerHTML = element.name;
    tr.appendChild(tdName);
    const tdEmail = document.createElement('td');
    tdEmail.innerHTML = element.email;
    tr.appendChild(tdEmail);
    const action = document.createElement('td');
    const updateBtn = document.createElement('button');
    updateBtn.classList = 'update-button';
    updateBtn.innerHTML = 'Update';
    updateBtn.onclick = function () {
      fillUser(element);
    };
    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'delete-button';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.onclick = function () {
      deleteUser(element.id);
    };
    action.appendChild(updateBtn);
    action.appendChild(deleteBtn);
    tr.appendChild(action);
    tbody.appendChild(tr);
  });
}

function fetchAllData() {
  const tbody = document.getElementById('allDataOfUser');
  tbody.innerHTML = '';
  fetch(
    `http://localhost:3000/user/allUsers?page=${currentPage}&pageSize=${pageSize}`,
    {
      method: 'get',
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.allData) {
        // Handle case where data.allData is undefined
        document.getElementById('nextPageButton').disabled = true;
        Swal.fire('No data received from the server');
        return;
      } else {
        document.getElementById('nextPageButton').disabled = false; // Enable next page button
      }
      tableCreate(data.allData);
    });
}
function fillUser(userData) {
  location.href = `http://localhost:3000/user-ui/userUpdation?id=${userData.id}&name=${userData.name}&email=${userData.email}`;
}
function deleteUser(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/user/deleteUser/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          Swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          }).then(() => location.reload());
        })
        .catch((error) => {
          console.log(error.message);
          Swal.fire('Failed to delete user');
          // alert('Failed to delete user');
        });
    }
  });
}

function logOut() {
  Swal.fire({
    title: 'Are you sure you want to \nsign out?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sign Out!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'You have been successfully \nsigned out.',
        icon: 'success',
      }).then(() => location.replace(`http://localhost:3000/user-ui/login`));
    }
  });
}

function goBack() {
  location.replace(`http://localhost:3000/user-ui/login`);
}

function search() {
  const searchInput = document.getElementById('searchInput').value;
  fetch(`http://localhost:3000/user/getUserByParameter/${searchInput}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        response.json().then((error) => {
          console.log(error);
        });
        Swal.fire('User not found ').then(() => location.reload());
      }
      return response.json();
    })
    .then((data) => {
      tableCreate(data.Data);
    });
}

fetchAllData();
