// GET (All products)
const allProducts = document.querySelector('#allProducts');
const updated = document.querySelector('#updated');
getAllProducts(); // when window loaded

// GET (One product)
const pid = document.querySelector('#pid');
const result = document.querySelector('#result');
const price = document.querySelector('#price');
const name = document.querySelector('#name');
const description = document.querySelector('#description');
const getBt = document.querySelector('#get');
getBt.addEventListener('click', getProduct);

// POST
const postForm = document.querySelector('form');
postForm.addEventListener('submit', postProduct);

// UPDATE
const updateBt = document.querySelector('#update');
updateBt.addEventListener('click', updateProduct);

// SEARCH(GET)
const results = document.querySelector('#results');
const searchName = document.querySelector('#searchName');
const debouncingTime = document.querySelector('#time');
let timer;
searchName.addEventListener('keyup', (e) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        searchProducts(e.target.value.toLowerCase());
    }, debouncingTime.value);
});

// INIT DATA
const set = document.querySelector('#set');
set.addEventListener('click', initProduct);

// FORCE REFRESH
document.querySelector('#ref').addEventListener('click', getAllProducts);
