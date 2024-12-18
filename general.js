let updateAmount = () => {
	let productAmount = document.querySelectorAll('.product-amount');
	let cartContent = JSON.parse(localStorage.getItem('cart')) || [];
	productAmount.forEach((text) => {
		text.textContent = cartContent.length;
	});
};

document.addEventListener('DOMContentLoaded', updateAmount());
