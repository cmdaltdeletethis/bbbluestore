const PRODUCTS = [
  {
    id: 1,
    name: "AULA Computer Keyboard F75 Wireless Mechanical Keyboard",
    category: "Desk",
    price: 67.99,
    featured: true,
    tag: "Desk Aesthetic",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcREXItsSC96gDGuvUHY8EGP5hah7frDDmq__TcFbWinTTW6NrQcU3C4KHQVBnCCFk6x9Sfk7_6hwVe1O0-nGW-Dal5_e1EPSOVlVjGSjblMOPK6qe2Vl-B6uaE",
    description:
      "A compact 75% mechanical keyboard featuring tri-mode connectivity ...",
  },
  {
    id: 2,
    name: "TOBISFISK mug, blue, 33cl",
    category: "Home",
    price: 3.12,
    featured: true,
    tag: "Need a drink?",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTEGceXaaXtbxUWiXVhOGYK9Q2wVDQ7yYfrYgcflPQbyPPbzaz0ABWJPMA399gONFuhDiuS4wbgSlTG5INhv9LxT3GdedxVGHnO5nrw0ekqP0VH_Y6JboLIej0",
    description:
      "One of the secrets toa  truly enjoyable coffee break is having your own favourite mug.",
  },
  {
    id: 3,
    name: "Port & Co. Fleece Pullover Hoodie",
    category: "Apparel",
    price: 14.0,
    featured: true,
    tag: "Bestseller",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6HaxTP6ppuNoU8cbuORZMFIXYmu73IcBQUy3xzH6IqpOi62Pzi8YcDW08seYhh1Ow0q9QtO5i6INxMJ2ZdM5aQxF_DraF",
    description:
      "Made from 50/50 cotton/poly fleece with air jet yarn for softness.",
  },
  {
    id: 4,
    name: "Christy Ng Women's Russo Large Monogram Tote Limited Edition Baby",
    category: "Apparel",
    price: 52.0,
    featured: false,
    tag: "Campus Ready",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTvCA7fXO6_slQx_QokK0Ye1iTcU-a5ksTU6biNQmtO-26j7JUVgykvHYSmWgOCMqkgYGDo5rU-4XvzDY41ivH45WGbJ85PVQ",
    description:
      "A bag that transitions effortlessly from morning commutes to weekend trips.",
  },
  {
    id: 5,
    name: "Osume Konbini Standard Deskmat",
    category: "Desk",
    price: 36.0,
    featured: false,
    tag: "Smooth Glide",
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTffYKTZ9gx060uds5LhlKrP6pPbEPtR3gwSHaN8OfjRhxqTnL5LcxAdRYRXvLep2Xml4m7TuoUgDgVMybBqV7mMG4czkBSpTfuA54QQtWxD56glaB07nLSug",
    description: "Stitched-edge extended desk pad with non-slip rubber base.",
  },
  {
    id: 6,
    name: "Stanley H2.0 FlowState Quencher Tumbler",
    category: "Home",
    price: 45.35,
    featured: false,
    tag: "Hydration",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT10eM5xnERF0bgrNe77rA-7APHaxPcKctnM314z4veZzTsQp_JOcB0XS17fDP9FDO-K0dqkn52pSD1zqEbGTUY6eCKabpoacgpeJ3Z_njjyELRniF2i4bkIfQ",
    description: "The perfect companion for your active lifestyle.",
  },
];

const CART_KEY = "baby_blue_cart_v1";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartModal();
}

function updateCartBadge() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
  });
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }
  saveCart(cart);
}

function changeQty(productId, delta) {
  const cart = getCart()
    .map((item) =>
      item.id === productId ? { ...item, qty: item.qty + delta } : item,
    )
    .filter((item) => item.qty > 0);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function createProductCardHTML(product) {
  return `
    <div class="col-12 col-sm-6 col-lg-4">
      <div class="card product-card h-100 p-3 d-flex flex-column">
        <img src="${product.image}" alt="${product.name}" class="product-img mb-3" />
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge badge-baby px-2 py-1">${product.category}</span>
          <small class="text-muted fw-bold">${product.tag}</small>
        </div>
        <h5 class="fw-bold mb-1">${product.name}</h5>
        <p class="text-muted small flex-grow-1">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center pt-2 border-top">
          <span class="fs-5 fw-bold">$${product.price.toFixed(2)}</span>
          <button class="btn btn-baby btn-sm px-3 py-2" onclick="addToCart(${product.id})">
            add to cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const container = document.getElementById("featured-grid");
  if (!container) return;
  const featured = PRODUCTS.filter((p) => p.featured);
  container.innerHTML = featured.map(createProductCardHTML).join("");
}

function initCatalog() {
  const grid = document.getElementById("catalog-grid");
  const searchInput = document.getElementById("search-input");
  const filterButtons = document.querySelectorAll("[data-category]");
  const countLabel = document.getElementById("result-count");
  if (!grid) return;

  let activeCategory = "All";

  function applyFilters() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const filtered = PRODUCTS.filter((item) => {
      const matchesCat =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });

    if (countLabel) {
      countLabel.textContent = `showing ${filtered.length} baby blue item${filtered.length === 1 ? "" : "s"}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5 box-panel">
          <p class="fs-5 fw-bold mb-1">no baby blue items match that filter.</p>
          <p class="text-muted mb-0">try clearing your search or switching back to "all".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(createProductCardHTML).join("");
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });

  searchInput?.addEventListener("input", applyFilters);
  applyFilters();
}

function renderCartModal() {
  const body = document.getElementById("cart-items-container");
  const totalEl = document.getElementById("cart-subtotal");
  if (!body || !totalEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `<p class="text-muted text-center my-4">your baby blue cart is currently empty.</p>`;
    totalEl.textContent = "$0.00";
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  totalEl.textContent = `$${subtotal.toFixed(2)}`;

  body.innerHTML = cart
    .map(
      (item) => `
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <div class="pe-2">
          <div class="fw-bold">${item.name}</div>
          <small class="text-muted">$${item.price.toFixed(2)} each</small>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-outline-baby px-2" onclick="changeQty(${item.id}, -1)">-</button>
          <span class="fw-bold px-1">${item.qty}</span>
          <button class="btn btn-sm btn-outline-baby px-2" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `,
    )
    .join("");
}

function initCheckout() {
  const checkoutBtn = document.getElementById("demo-checkout-btn");
  const notice = document.getElementById("checkout-success");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {
    if (getCart().length === 0) return;
    clearCart();
    if (notice) {
      notice.classList.remove("d-none");
    }
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const alertBox = document.getElementById("contact-success");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    form.reset();
    form.classList.remove("was-validated");
    alertBox?.classList.remove("d-none");
  });
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartModal();
  triggerCartPulse();
}

function triggerCartPulse() {
  document.querySelectorAll('[data-bs-target="#cartModal"]').forEach((btn) => {
    btn.classList.add("cart-pulse");
    setTimeout(() => btn.classList.remove("cart-pulse"), 400);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  renderFeatured();
  initCatalog();
  renderCartModal();
  initCheckout();
  initContactForm();
});
