let priceOfPurchase = 0;

function updatePrices(price, action) {
	let subtotalPrice = document.querySelector('#subtotal-price');
	let totalPrice = document.querySelector('#total-price');
	subtotalPrice.textContent = '';
	totalPrice.textContent = '';
	if (action === 'add') {
		priceOfPurchase = priceOfPurchase + price;
	} else {
		priceOfPurchase = priceOfPurchase - price;
	}
	subtotalPrice.textContent = `$${priceOfPurchase}`;
	totalPrice.textContent = `$${priceOfPurchase}`;
}

function removeProduct(productId, cartTitle) {
	let productList = document.querySelector('.product-list');
	let product = document.getElementById(productId);
	let cartContent = JSON.parse(localStorage.getItem('cart')) || [];

	let bookToRemove = cartContent.filter((book) => book.t === cartTitle);
	let bookPrice = bookToRemove[0].p;
	bookToRemove.forEach((x) =>
		cartContent.splice(
			cartContent.findIndex((n) => n === x),
			1
		)
	);

	updatePrices(bookPrice, 'substract');
	productList.removeChild(product);
	localStorage.setItem('cart', JSON.stringify(cartContent));
	updateAmount();
}

let buyBtn = document.querySelector('#buyBtn');

buyBtn.addEventListener('click', () => {
	let cartContent = JSON.parse(localStorage.getItem('cart'));
	if (cartContent.length) {
	}
});

document.addEventListener('DOMContentLoaded', () => {
	let productList = document.querySelector('.product-list');
	let cartContent = JSON.parse(localStorage.getItem('cart')) || [];

	for (let i = 0; i < cartContent.length; i++) {
		const productDiv = document.createElement('div');
		productDiv.id = `product-N${i}`;
		productDiv.className = 'product';

		productDiv.innerHTML = `
			<div class="book-column column">
			<div class="d-flex">
				<img src=${cartContent[i].i} class="product-cover rounded-3">
				<div class="ps-2">
				<p class="mb-0 text-start">${cartContent[i].t}</p>
				<p class="text-white-50 mb-0 text-start">${cartContent[i].a}</p>
				</div>
				</div>
				</div>
				<div class="price-column column">
				<div class="d-flex justify-content-center">
				<p class="price mb-0">$${cartContent[i].p}</p>
				</div>
				</div>
				<div class="delete-column column">
				<div class="d-flex">
				<button
				class="btn py-2 px-3 bg-transparent focus-ring d-flex justify-content-center"
				>
				<i class="fa-solid fa-trash"></i>
				</button>
			</div>
		</div>
	`;

		const btnRemove = productDiv.querySelector('button');
		productList.appendChild(productDiv);
		updatePrices(cartContent[i].p, 'add');

		btnRemove.addEventListener('click', () => {
			//elimina el producto de la lista

			removeProduct(productDiv.id, cartContent[i].t);
		});
	}
});

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openBtn = document.querySelector('#buyBtn');
const closeBtn = document.querySelector('#closeBtn');

function openModal() {
	let cartContent = JSON.parse(localStorage.getItem('cart'));

	// if the modal is not visible, opens it and shows the blur effect
	if (modal.classList.contains('hidden') && cartContent.length) {
		modal.classList.remove('hidden');
		overlay.classList.remove('hidden');

		const linksContainer = document.querySelector('.links-container');
		linksContainer.innerHTML = '';
		for (let i = 0; i < cartContent.length; i++) {
			const link = document.createElement('a');
			link.id = `link-N${i}`;
			link.className = 'link link-offset-2 link-offset-3-hover';

			link.href = cartContent[i].b;
			link.target = '_blank';
			link.textContent = cartContent[i].t;
			linksContainer.appendChild(link);
		}
	}
}

function closeModal() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

openBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);
/* modal */

/* 


document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
		close();
	}
});
 */
/* If the user presses "Esc" and the modal is open, it closes it */
