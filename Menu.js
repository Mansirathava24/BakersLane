/*Fetch and render all categories*/
fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const categories = {
      cakes: 'cake-carousel',
      breads: 'bread-carousel',
      beverages: 'beverage-carousel',
      specials: 'specials-carousel'
    };
    for (const [key, containerId] of Object.entries(categories)) {
      renderItems(data[key], containerId);
    }
  });

/*Carousel items*/
function renderItems(items, containerId) {
  const container = document.getElementById(containerId);
  items.forEach(({ id, img, alt, desc, price, name }) => {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.id = id;
    div.innerHTML = `
      <img src="${img}" alt="${alt}" onclick="openPopup('${img}', '${desc}', '${price}')">
      <p class="text1">${name}</p>
    `;
    container.appendChild(div);
  });
}

/*Pop-up handling*/
function openPopup(imageSrc, description, price) {
  document.getElementById('popup-image').src = imageSrc;
  document.getElementById('popup-description').innerText = description;
  document.getElementById('popup-price').innerHTML = price;
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

/* Close popup/menu on ESC key*/
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePopup();
    closeMenu();
  }
});

/*Dropdown menu + overlay*/
function togglemenu() {
  const dropdown = document.getElementById('dropdownmenu');
  const overlay = document.getElementById('overlay');
  const isVisible = dropdown.style.display === 'flex';

  dropdown.style.display = isVisible ? 'none' : 'flex';
  overlay.style.display = isVisible ? 'none' : 'block';
}

function closeMenu() {
  document.getElementById('dropdownmenu').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}
