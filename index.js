let booksContainer = document.getElementById('books-container');
let currentTopic = document.getElementById('current-topic');
let cartLinks = document.querySelectorAll('.cart-link drop-btn');
document.addEventListener('DOMContentLoaded', () => {
	fetchBooks();
});

function agregarAlCarrito(book) {
	let bookData = book;

	let cartContent = JSON.parse(localStorage.getItem('cart')) || [];
	let bookSaved = cartContent.find((book) => book.t === bookData.t);

	if (bookSaved === undefined) {
		cartContent.push(bookData);
		localStorage.setItem('cart', JSON.stringify(cartContent));
		updateAmount();
		alert(`${book.t} ha sido agregado al carrito!`);
	} else {
		alert(`${book.t} ya fue agregado al carrito.`);
	}
}

function shorterTitles(title) {
	let newStr = '';
	const arrayOfString = title.split(' ');
	for (let i = 0; i < 8; i++) {
		if (arrayOfString[i] != undefined) {
			newStr += ` ${arrayOfString[i]}`;

			if (i === 7) {
				if (
					newStr.endsWith(',') ||
					newStr.endsWith(':') ||
					newStr.endsWith(';')
				) {
					newStr = newStr.slice(0, -1) + '';
				}
				newStr += '...';
			}
		}
	}
	return newStr;
}

function fetchBooks(subject = '', nameToShowcase = 'Mas Populares') {
	let booksData;
	booksContainer.innerHTML = `
							<div class="loader">
							<div class="earth"></div>
							<div class="moon"></div>
						</div>
`;
	let thingToSearch;
	if (subject != '') {
		thingToSearch = `search=${subject}`;
	} else {
		thingToSearch = 'sort';
	}
	currentTopic.textContent = 'Cargando...';

	fetch(`https://gutendex.com/books?${thingToSearch}`)
		// Con "?limit=20" se limita la cantidad de bookos a 20
		.then((response) => response.json())
		.then((data) => {
			booksData = data.results;
			booksContainer.innerHTML = '';
			for (let i = 0; i < 6; i++) {
				// agrega cards por cada element del json obtenido en la petición
				const cardDiv = document.createElement('div');

				const bookData = {
					i: booksData[i].formats['image/jpeg'],
					t: shorterTitles(booksData[i].title),
					a: booksData[i].authors[0].name,
					b: booksData[i].formats['text/html'],
					p: Math.floor(Math.random() * (100 - 10 + 1)),
				};
				cardDiv.className = 'book';
				const lazy = 'loading="lazy"';

				cardDiv.innerHTML = `
            <div class="card mb-3 rounded-4 pink-borders">
				<div class="row g-0">
					<div class="col-md-4">
						<img
							src="${bookData.i}"
							alt="${bookData.t}"
							${i > 0 ? lazy : ''}
						/>
					</div>
					<div class="col-md-8">
						<div class="card-body h-100 text-light d-flex flex-column ">
							<h5 class="book-title card-title mb-0">${bookData.t}</h5>
							<div class="book-author h6">${bookData.a}</div>
							<p class="mb-2">Aca iría una sinopsis breve.</p>
							<div class="card-btn d-flex flex-column mt-auto mb-1">
								<span class="price mb-2">$${bookData.p}</span>
								<button class="btn pink-borders focus-ring">Agregar</button>
							</div>
						</div>
					</div>
				</div>
			</div>
                `;

				//agregar evento al boton "agregar"
				const btnAdd = cardDiv.querySelector('button');
				btnAdd.addEventListener('click', () => {
					//agrega al carrito el book
					agregarAlCarrito(bookData);
				});

				booksContainer.appendChild(cardDiv);
				currentTopic.textContent = nameToShowcase;
			}
		})
		.catch((error) => console.error('Error de conexion', error));
}
