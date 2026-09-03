// Advanced JS - User Management Dashboard - Ammar Final
let users = JSON.parse(localStorage.getItem('users') || '[]');
let currentFilter = 'All';

const userList = document.getElementById('userList');
const totalUsers = document.getElementById('totalUsers');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const emptyEl = document.getElementById('empty');
const searchInput = document.getElementById('searchInput');
const userForm = document.getElementById('userForm');

const saveToStorage = () => localStorage.setItem('users', JSON.stringify(users));

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);

const renderUsers = (list = users) => {
  // apply course filter
  let filtered = list;
  if (currentFilter !== 'All') {
    filtered = filtered.filter(u => u.course.toLowerCase() === currentFilter.toLowerCase());
  }
  userList.innerHTML = '';
  if (filtered.length === 0) {
    emptyEl.classList.remove('hidden');
  } else {
    emptyEl.classList.add('hidden');
    const html = filtered.map(user => {
      const { id, name, email, course } = user;
      return `
      <div class="user-card">
        <div class="user-info">
          <h3>${name}</h3>
          <p>${email}</p>
          <p><strong>${course}</strong></p>
        </div>
        <div>
          <button class="delete-btn" data-id="${id}">Delete</button>
        </div>
      </div>`;
    }).join('');
    userList.innerHTML = html;
  }
  totalUsers.textContent = users.length;
  saveToStorage();
};

const addUser = (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const course = document.getElementById('course').value.trim();
  if (!name || !email || !course) return alert('All fields required');
  // email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Invalid email');

  const newUser = { id: generateId(), name, email, course };
  users = [...users, newUser]; // spread operator
  renderUsers(getFilteredBySearch());
  userForm.reset();
};

const getFilteredBySearch = () => {
  const query = searchInput.value.toLowerCase();
  if (!query) return users;
  return users.filter(user => user.name.toLowerCase().includes(query));
};

const handleSearch = () => renderUsers(getFilteredBySearch());

const handleDelete = (e) => {
  if (!e.target.classList.contains('delete-btn')) return;
  const id = e.target.dataset.id;
  users = users.filter(u => u.id !== id);
  renderUsers(getFilteredBySearch());
};

const fetchApiUsers = async () => {
  try {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    // map API data to our structure
    const apiUsers = data.slice(0,5).map(u => ({
      id: u.id.toString(),
      name: u.name,
      email: u.email,
      course: ['MERN','React','Node.js'][Math.floor(Math.random()*3)]
    }));
    // only add if local storage empty to avoid duplicates
    if (users.length === 0) {
      users = apiUsers;
    }
    loadingEl.classList.add('hidden');
    renderUsers();
  } catch (err) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    console.error(err);
    renderUsers();
  }
};

userForm.addEventListener('submit', addUser);
searchInput.addEventListener('input', handleSearch);
userList.addEventListener('click', handleDelete);
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderUsers(getFilteredBySearch());
  });
});

fetchApiUsers();
