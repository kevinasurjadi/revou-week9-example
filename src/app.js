function toggleMobileMenu() {
    let mobileMenuButton = document.getElementById('m-menu-button');
    let mobileMenu = document.getElementById('m-menu')
    if (mobileMenuButton.children[1].classList.contains('block')) {
        mobileMenuButton.children[1].classList.replace('block', 'hidden');
        mobileMenuButton.children[2].classList.replace('hidden', 'block');
        mobileMenu.classList.replace('hidden', 'block');
    } else {
        mobileMenuButton.children[1].classList.replace('hidden', 'block');
        mobileMenuButton.children[2].classList.replace('block', 'hidden');
        mobileMenu.classList.replace('block', 'hidden');
    }
}

function loadBooks() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let page = urlParams.get('page');

    if (!page) {
        page = 1;
    } else {
        page = Number(page);
    }

    const booksPerPage = 12;
    let bookGrid = document.getElementById('book-grid');
    bookGrid.innerHTML = '';
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
            let books = json['books'].slice((page - 1) * booksPerPage, page * booksPerPage);
            books.forEach(book => {
                let outerDiv = document.createElement('div');
                outerDiv.className = 'w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';
                
                let aImg = document.createElement('a');
                aImg.href = '#';

                let img = document.createElement('img');
                img.className = 'h-72 mx-auto';
                img.src = book['image'];
                img.alt = book['title'];

                aImg.appendChild(img);

                let innerDiv = document.createElement('div');
                innerDiv.className = 'p-5';

                let aH5 = document.createElement('a');
                aH5.href = '#';

                let h5 = document.createElement('h5');
                h5.className = 'mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white';
                h5.innerHTML = book['title'];

                aH5.appendChild(h5);

                let p = document.createElement('p');
                p.className = 'mb-3 font-normal text-gray-700 dark:text-gray-400';

                let b = document.createElement('b');
                b.innerHTML = 'Author(s): ';

                p.innerHTML = b + book['authors'];

                innerDiv.appendChild(aH5);
                innerDiv.appendChild(p);

                outerDiv.appendChild(aImg);
                outerDiv.appendChild(innerDiv);

                bookGrid.appendChild(outerDiv);
            });
        });
}

function previousBooksPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let page = urlParams.get('page');

    if (page && page == '2') {
        window.location.replace('?page=1');
    } else {
        window.location.reload();
    }
}

function nextBooksPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let page = urlParams.get('page');

    if (page && page == '1') {
        window.location.replace('?page=2');
    } else {
        window.location.reload();
    }
}
