const URL = "https://dummyjson.com/products";

export async function getProducts() {
    const res = await fetch(URL);
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`${URL}/${id}`);
    return res.json();
}

export async function getProductsByQuery(query) {
    const res = await fetch(`${URL}/search?q=${query}`);
    return res.json();
}