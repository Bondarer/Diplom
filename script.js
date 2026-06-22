// Елементи калькулятора
const sizeSelect = document.getElementById('size');
const threadSelect = document.getElementById('thread');
const quantityInput = document.getElementById('quantity');
const qtyLabel = document.getElementById('qty-label');
const totalPriceDisplay = document.getElementById('total-price');
const perItemPriceDisplay = document.getElementById('per-item-price');
const termDeliveryDisplay = document.getElementById('term-delivery');

// Елементи модального вікна
const modalOverlay = document.getElementById('modal-overlay');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const summaryDetails = document.getElementById('summary-details');
const summaryPrice = document.getElementById('summary-price');
const orderForm = document.getElementById('order-form');

let currentTotalText = "0 грн";
let currentSummaryText = "";

// Функція розрахунку вартості
function calculatePrice() {
    const size = sizeSelect.value;
    const thread = threadSelect.value;
    const quantity = parseInt(quantityInput.value);

    qtyLabel.innerText = quantity;

    let basePrice = 0;
    let sizeText = "";
    if (size === 'small') { basePrice = 120; sizeText = "Малий розмір"; }
    else if (size === 'medium') { basePrice = 250; sizeText = "Середній розмір"; }
    else if (size === 'large') { basePrice = 480; sizeText = "Великий розмір"; }

    let threadText = "стандартні нитки";
    if (thread === 'metallic') {
        basePrice *= 1.3;
        threadText = "металізовані нитки";
    }

    let discount = 1;
    if (quantity >= 10 && quantity < 30) discount = 0.9;
    else if (quantity >= 30) discount = 0.8;

    const finalPricePerItem = Math.round(basePrice * discount);
    const totalPrice = finalPricePerItem * quantity;

    let terms = "2-3 робочих дні";
    if (quantity > 20) terms = "3-5 робочих днів";
    if (quantity > 50) terms = "5-7 робочих днів";

    currentTotalText = `${totalPrice.toLocaleString()} грн`;
    totalPriceDisplay.innerHTML = `${totalPrice.toLocaleString()} <span>грн</span>`;
    perItemPriceDisplay.innerText = `Ціна за 1 шт: ${finalPricePerItem} грн (з урахуванням тиражу)`;
    termDeliveryDisplay.innerText = `Орієнтовний термін: ${terms}`;

    currentSummaryText = `${sizeText}, ${threadText}, тираж ${quantity} шт.`;
}

// Функції керування модальним вікном
function openModal() {
    summaryDetails.innerText = currentSummaryText;
    summaryPrice.innerText = currentTotalText;
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// Слухачі подій
sizeSelect.addEventListener('change', calculatePrice);
threadSelect.addEventListener('change', calculatePrice);
quantityInput.addEventListener('input', calculatePrice);

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});

orderForm.addEventListener('submit', () => {
    
    document.getElementById('order_details_hidden').value = currentSummaryText;
    document.getElementById('total_price_hidden').value = currentTotalText;
    
    closeModal();
});

calculatePrice();
