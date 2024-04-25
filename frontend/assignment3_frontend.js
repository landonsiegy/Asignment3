function fetchProducts() {
    fetch("http://localhost:8081/listProducts")
        .then(response => response.json())
        .then(products => loadProducts(products));
}

function loadProducts(products) {
    const productListDiv = document.getElementById("productList");

    productListDiv.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productListDiv.appendChild(productCard);
    });
}

function createProductCard(product) {
    const { id, title, price, description, category, image, rating } = product;

    const productCard = document.createElement("div");
    productCard.classList.add("col");

    productCard.innerHTML = `
        <div class="card">
            <img src="${image}" class="card-img-top" alt="${title}">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Price: $${price}</p>
                <p class="card-text">Description: ${description}</p>
                <p class="card-text">Category: ${category}</p>
                <p class="card-text">Rating: ${rating.rate} (${rating.count} reviews)</p>
            </div>
        </div>
    `;

    return productCard;
}

window.addEventListener('load', fetchProducts);
