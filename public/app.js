const loreList = document.getElementById('lore-list');

function addLore() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  fetch('http://localhost:3000/add-lore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    getLore();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function getLore() {
  fetch('http://localhost:3000/get-lore')
  .then(response => response.json())
  .then(data => {
    loreList.innerHTML = '';
    data.forEach(lore => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${lore.title}</h3><p>${lore.content}</p>`;
      loreList.appendChild(div);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

getLore();
