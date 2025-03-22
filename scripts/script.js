const img1 = "./assets/abacate_com_ovo.jpg";
const img2 = "./assets/saladacaesar.jpg";
const img3 = "./assets/frango_grelhado.png";
const meals = [
  {
    id: 1,
    name: "Frango Grelhado com Quinoa",
    calories: 450,
    price: 29.9,
    image: img3,
  },
  {
    id: 2,
    name: "Salada Caesar Fit",
    calories: 320,
    price: 25.5,
    image: img2,
  },
  {
    id: 3,
    name: "Bowl de Abacate com Ovo",
    calories: 380,
    price: 27.0,
    image: img1,
  },
];

let cart = [];
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".total-price");
const cartModal = document.querySelector(".cart-modal");

// Gerar cards dos pratos
function renderMeals() {
  const container = document.querySelector(".meals-container");
  container.innerHTML = meals
    .map(
      (meal) => `
            <div class="meal-card">
                <img src="${meal.image}" class="meal-image" alt="${meal.name}">
                <div class="meal-info">
                    <h3 class="meal-title">${meal.name}</h3>
                    <p class="meal-calories">${meal.calories} kcal</p>
                    <p class="meal-price">R$ ${meal.price.toFixed(2)}</p>
                    <button onclick="addToCart(${
                      meal.id
                    })" class="add-to-cart">Adicionar</button>
                </div>
            </div>
        `
    )
    .join("");
}

// Função do carrinho
function addToCart(mealId) {
  const meal = meals.find((m) => m.id === mealId);
  const existingItem = cart.find((item) => item.id === mealId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...meal, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.innerHTML = cart
    .map(
      (item) => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.quantity}x R$ ${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        `
    )
    .join("");

  totalPrice.textContent = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
}

function removeFromCart(mealId) {
  cart = cart.filter((item) => item.id !== mealId);
  updateCart();
}

// Event Listeners
document.querySelector(".cart-btn").addEventListener("click", () => {
  cartModal.style.display = "block";
});

document.addEventListener("click", (e) => {
  if (!cartModal.contains(e.target) && !e.target.closest(".cart-btn")) {
    cartModal.style.display = "none";
  }
});

function closeCart() {
  cartModal.style.display = "none";
}
renderMeals();
