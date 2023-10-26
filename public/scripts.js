document.getElementById('loginButton').addEventListener('click', function() {
    // You would implement actual login logic here
    const role = prompt('Enter your role (Player/DM):');
    if (role.toLowerCase() === 'dm') {
      document.getElementById('addLoreForm').classList.remove('hidden');
    } else {
      alert('You must be a DM to add lore.');
    }
  });
  
  function addLore() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    // You would implement logic to send this data to your server here
  
    const loreList = document.getElementById('loreList');
    const newLore = document.createElement('div');
    newLore.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
    loreList.appendChild(newLore);
  
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
  }
  