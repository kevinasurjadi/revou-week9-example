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

function loadLibrary() {
    let searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', searchLibrary);
}

function searchLibrary(event) {
    event.preventDefault();
    let searchInput = document.getElementById('search');
    let query = searchInput.value;

    let searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';

    let wrapper = document.createElement('div');
    wrapper.className = 'my-6';
    
    if (query && query != '') {
        searchResult.classList.remove('hidden');
        fetch('./data.json')
            .then(response => response.json())
            .then(json => {
                let books = json['books'];
                console.log(books);
                let filteredBooks = books.filter((book) => book['title'].toLowerCase().includes(query) || book['authors'].join(', ').toLowerCase().includes(query) || book['subjects'].join(', ').toLowerCase().includes(query));
                if (filteredBooks.length > 0) {
                    filteredBooks.forEach((book) => {
                        let a = document.createElement('a');
                        a.href = '#';
                        a.className = 'flex flex-col items-center bg-white border border-gray-200 p-4 shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700';

                        let img = document.createElement('img');
                        img.className = 'object-cover w-full rounded-lg h-96 md:h-auto md:w-24';
                        img.src = book['image'];
                        img.alt = book['title'];

                        let div = document.createElement('div');
                        div.className = 'flex flex-col justify-between p-4 leading-normal text-gray-400';

                        let h5 = document.createElement('h5');
                        h5.className = 'mb-2 text-2xl font-bold tracking-tight';
                        h5.innerHTML = book['title'];

                        let p = document.createElement('p');
                        p.className = 'mb-3 font-normal';

                        let b = document.createElement('b');
                        b.innerHTML = 'Author(s): ';

                        let authors = document.createTextNode(book['authors'].join(', '));

                        p.appendChild(b);
                        p.appendChild(authors);

                        let caption = document.createElement('caption');
                        caption.innerHTML = book['subjects'].join(', ');

                        div.appendChild(h5);
                        div.appendChild(b);
                        div.appendChild(caption);

                        a.appendChild(img);
                        a.appendChild(div);

                        wrapper.appendChild(a);
                    });
                    searchResult.appendChild(wrapper);
                } else {
                    let center = document.createElement('center');

                    let h1 = document.createElement('h1');
                    h1.className = 'text-gray-400';
                    h1.innerHTML = 'No books found, please try with another keyword';

                    center.appendChild(h1);

                    searchResult.appendChild(center);
                }
            });
    } else {
        searchResult.classList.add('hidden');
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

                var author = document.createTextNode(book['authors'].join(', '));

                p.appendChild(b);
                p.appendChild(author);

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
