document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 30, // offset (in px) from the original trigger point
        delay: 150, // values from 0 to 3000, with step 50ms
        duration: 800, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });

    if (typeof List !== 'undefined') {
        new List('product-list', {
        valueNames: ['name', 'description', 'price']
        });
    }

    const cart = [];

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const card = e.target.closest('.card-body');
            const name = card.querySelector('.name').textContent;
            const price = parseFloat(card.querySelector('.price').textContent.replace('$', ''));
            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        const count = document.getElementById('cart-count');
        cart.push({ name: name, price: price });
        count.textContent = cart.length;
        count.style.display = 'block';
        alert(`${name} has been added to your cart!`);
    }

    document.getElementById('cart-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        const modalBody = document.querySelector('#cartModal .modal-body');
        modalBody.innerHTML = '';
        if (cart.length === 0) {
            modalBody.innerHTML = '<p class="text-center">There is no item</p>';
        } else {
            let total = 0;

            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item border border-dark rounded p-3 m-2';
                listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                modalBody.appendChild(listItem);
                total += item.price;
            });
            const totalElement = document.createElement('h5');
            totalElement.className = 'p-3 text-end';
            totalElement.textContent = 'total: $' + total;
            modalBody.appendChild(totalElement);
        }
        cartModal.show();
    });
});
