// Global selectedItems
let selectedItems = [];

document.addEventListener('DOMContentLoaded', function () {
    const options = {
        strings: ["Vaqtni yaxshi vaqtga aylantiramiz"],
        typeSpeed: 50,
        backSpeed: 500,
        startDelay: 500,
        loop: false,
        showCursor: false,
    };

    // Typed.js kutubxonasi ulanganligini tekshiring
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('.wrapper-name', options);
    } else {
        console.error('Typed.js kutubxonasi ulanmagan!');
    }

    fetch('https://669fb472b132e2c136fed90f.mockapi.io/api/v1/products')
        .then(response => response.json())
        .then(data => displayMenu(data, selectedItems))
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
            alert('Ma’lumotlarni yuklashda xato yuz berdi. Iltimos, qayta urinib ko‘ring.');
        });

    document.querySelectorAll('.navlink').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            updateTotalPrice(selectedItems);
        });
    } else {
        console.warn('load-more-btn elementi topilmadi!');
    }
});

function displayMenu(items, selectedItems) {
    const menu = document.getElementById('menu-items');
    if (!menu) {
        console.error('menu-items elementi topilmadi!');
        return;
    }
    menu.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
                    <div class="menu_item_name_div">
                         <h3>${item.name}</h3>
                         <p class="price">$${item.price}</p>
                    </div>
            <p class="description">${item.description}</p>
                    <div class="menu_item_name_div">
                        <button class="add-btn">+</button>
                        <p class="rating">★★★★★</p>
        `;
        div.querySelector('.add-btn').addEventListener('click', () => {
            selectedItems.push(item);
            updateTotalPrice(selectedItems);
        });
        menu.appendChild(div);
    });
}

function updateTotalPrice(selectedItems) {
    if (selectedItems.length === 0) {
        alert('Hech qanday mahsulot tanlanmadi!');
        return;
    }
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
    alert(`Tanlangan mahsulotlarning umumiy narxi: $${totalPrice.toFixed(2)}`);
}

function loadMore() {
    updateTotalPrice(selectedItems);
}

function sendMessage() {
    const messageInput = document.getElementById('message');
    if (!messageInput) {
        console.error('message elementi topilmadi!');
        return;
    }
    const message = messageInput.value;
    if (message.trim() === '') {
        alert('Iltimos, xabar yozing!');
        return;
    }
    alert(`Xabaringiz yuborildi: ${message}`);
    messageInput.value = '';
}