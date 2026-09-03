// Same logic as JS assignment but styled with Tailwind
let users = JSON.parse(localStorage.getItem('users_tw') || '[]');
let currentFilter='All';
const userList=document.getElementById('userList'), totalUsers=document.getElementById('totalUsers'), loadingEl=document.getElementById('loading'), errorEl=document.getElementById('error'), emptyEl=document.getElementById('empty'), searchInput=document.getElementById('searchInput'), userForm=document.getElementById('userForm');
const save=()=>localStorage.setItem('users_tw',JSON.stringify(users));
const idGen=()=>Date.now().toString(36)+Math.random().toString(36).slice(2);
const getSearch=()=>{const q=searchInput.value.toLowerCase(); return q?users.filter(u=>u.name.toLowerCase().includes(q)):users;};
const render=(list=users)=>{
  let filtered=list;
  if(currentFilter!=='All') filtered=filtered.filter(u=>u.course.toLowerCase()===currentFilter.toLowerCase());
  userList.innerHTML='';
  if(filtered.length===0){ emptyEl.classList.remove('hidden');}
  else{ emptyEl.classList.add('hidden');
    userList.innerHTML=filtered.map(({id,name,email,course})=>`
    <div class="card flex justify-between items-center border-l-4 border-l-blue-500">
      <div><h3 class="font-semibold text-gray-800">${name}</h3><p class="text-sm text-gray-500">${email}</p><span class="inline-block mt-1 bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded">${course}</span></div>
      <button data-id="${id}" class="delete-btn bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg">Delete</button>
    </div>`).join('');
  }
  totalUsers.textContent=users.length; save();
};
userForm.addEventListener('submit',e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim(), email=document.getElementById('email').value.trim(), course=document.getElementById('course').value.trim();
  if(!name||!email||!course) return alert('All fields required');
  users=[...users,{id:idGen(),name,email,course}];
  render(getSearch()); e.target.reset();
});
searchInput.addEventListener('input',()=>render(getSearch()));
userList.addEventListener('click',e=>{
  if(!e.target.classList.contains('delete-btn')) return;
  users=users.filter(u=>u.id!==e.target.dataset.id);
  render(getSearch());
});
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>{x.classList.remove('bg-blue-600','text-white'); x.classList.add('bg-gray-200')});
  b.classList.add('bg-blue-600','text-white'); b.classList.remove('bg-gray-200');
  currentFilter=b.dataset.filter; render(getSearch());
}));
async function loadAPI(){
  try{loadingEl.classList.remove('hidden'); const r=await fetch('https://jsonplaceholder.typicode.com/users'); const d=await r.json(); if(users.length===0){users=d.slice(0,6).map(u=>({id:u.id.toString(), name:u.name, email:u.email, course:['MERN','React','Node.js'][Math.floor(Math.random()*3)]}));} loadingEl.classList.add('hidden'); render();}catch{loadingEl.classList.add('hidden'); errorEl.classList.remove('hidden'); render();}
}
loadAPI();
document.getElementById('darkToggle').onclick=()=>{document.documentElement.classList.toggle('dark'); document.body.classList.toggle('bg-gray-900'); document.body.classList.toggle('text-white');};
