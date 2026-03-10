import { gpus } from './data.js';

// --- ELEMENTOS DEL DOM ---
const mainImage = document.getElementById('main-image');
const modelMenu = document.getElementById('model-menu');
const btnModelos = document.getElementById('btn-modelos');
const btnFront = document.getElementById('view-front');
const btnBack = document.getElementById('view-back');

// Elementos del Carrito
const cartMenu = document.getElementById('cart-menu');
const btnCarrito = document.getElementById('btn-carrito');
const cartList = document.getElementById('cart-list');
const cartCountLabel = document.getElementById('cart-count');
const cartTotalPriceLabel = document.getElementById('cart-total-price');
const btnVaciarCarrito = document.getElementById('btn-vaciar-carrito');
const btnAddToPurchase = document.getElementById('btn-add-to-cart'); // Botón de compra

// --- ESTADO DE LA APLICACIÓN ---
let currentGPUIndex = 0;
let currentEditionIndex = 0;
let currentView = 'front';

// ESTADO DEL CARRITO EFÍMERO (Se borra al pulsar F5)
let cartState = []; 

// --- FUNCIONES DE RENDERIZADO DE GPU ---

function updateImage() {
    const edition = gpus[currentGPUIndex].editions[currentEditionIndex];
    if (!edition) return;
    
    mainImage.style.opacity = "0";
    setTimeout(() => {
        mainImage.src = currentView === 'front' ? edition.front : edition.back;
        mainImage.style.opacity = "1";
    }, 150);
}

function renderGPU(index) {
    currentGPUIndex = index;
    currentEditionIndex = 0;
    currentView = 'front';
    
    const gpu = gpus[index];
    if (!gpu) return;
    
    document.getElementById('gpu-name').innerText = gpu.model;
    document.getElementById('info-vram').innerText = gpu.specs.memory;
    document.getElementById('info-tdp').innerText = gpu.specs.tdp;
    document.getElementById('final-price').innerText = `$${gpu.basePrice.toFixed(2)}`;
    
    btnFront.classList.add('active');
    btnBack.classList.remove('active');
    
    renderEditions(gpu);
    renderTech(gpu);
    updateImage();
}

function renderEditions(gpu) {
    const container = document.getElementById('edition-selector');
    container.innerHTML = '';
    
    if (!gpu.editions) return;
    
    gpu.editions.forEach((ed, idx) => {
        const btn = document.createElement('button');
        btn.className = `w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all ${idx === 0 ? 'border-black scale-110' : 'border-transparent'}`;
        btn.style.backgroundColor = ed.color;
        btn.onclick = () => {
            currentEditionIndex = idx;
            document.getElementById('gpu-edition-label').innerText = ed.name;
            document.querySelectorAll('#edition-selector button').forEach(b => b.classList.replace('border-black', 'border-transparent'));
            btn.classList.replace('border-transparent', 'border-black');
            updateImage();
        };
        container.appendChild(btn);
    });
    document.getElementById('gpu-edition-label').innerText = gpu.editions[0].name;
}

function renderTech(gpu) {
    const container = document.getElementById('tech-container');
    container.innerHTML = gpu.highlights?.map(h => `
        <div class="bg-white p-3 lg:p-4 border border-gray-100 text-center hover:border-black transition-all">
            <span class="text-xl lg:text-2xl block mb-1">${h.icon}</span>
            <span class="text-[8px] lg:text-[9px] font-bold uppercase text-gray-400">${h.label}</span>
        </div>
    `).join('') || '';
}

// --- LÓGICA DEL CARRITO EFÍMERO ---

function updateCartUI() {
    // 1. Actualizar el contador de la cabecera
    const totalItems = cartState.reduce((sum, item) => sum + item.quantity, 0);
    cartCountLabel.innerText = totalItems;

    // 2. Limpiar la lista actual del menú
    cartList.innerHTML = '';

    // 3. Si está vacío, mostrar mensaje
    if (cartState.length === 0) {
        cartList.innerHTML = `<li class="p-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">El carrito está vacío</li>`;
        cartTotalPriceLabel.innerText = '$0.00';
        return;
    }

    // 4. Renderizar cada item
    let totalPrice = 0;
    cartState.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartList.innerHTML += `
            <li class="p-4 flex items-center justify-between gap-3 group">
                <div class="flex items-center gap-3">
                    <img src="${item.image}" alt="${item.model}" class="w-10 h-10 object-contain border border-gray-100 p-1 bg-white">
                    <div>
                        <p class="text-[10px] font-bold uppercase tracking-tight">${item.model}</p>
                        <p class="text-blue-600 text-[9px] font-bold uppercase tracking-widest">${item.edition}</p>
                        <p class="text-[9px] text-gray-400 font-bold uppercase">Cant: ${item.quantity}</p>
                    </div>
                </div>
                <div class="text-right flex flex-col items-end gap-1">
                    <p class="text-lg font-light tracking-tighter">$${itemTotal.toFixed(2)}</p>
                    </div>
            </li>
        `;
    });

    // 5. Actualizar el precio total del menú
    cartTotalPriceLabel.innerText = `$${totalPrice.toFixed(2)}`;
}

function addToCart() {
    const gpu = gpus[currentGPUIndex];
    const edition = gpu.editions[currentEditionIndex];

    // Crear un ID único para la combinación GPU + Edición
    const cartItemId = `${gpu.id}_${edition.name.toLowerCase().replace(/\s+/g, '')}`;

    // Buscar si ya existe en el carrito
    const existingItem = cartState.find(item => item.cartId === cartItemId);

    if (existingItem) {
        // Lógica de exceso: si la cantidad supera 5, vaciamos el carrito (vulnerabilidad de 'exceso' solicitada)
        if (existingItem.quantity >= 5) {
            alert("Exceso de cantidad detectado. El carrito se vaciará por seguridad.");
            vaciarCarrito();
            return;
        }
        existingItem.quantity++;
    } else {
        // Añadir nuevo item
        cartState.push({
            cartId: cartItemId,
            model: gpu.model,
            edition: edition.name,
            price: gpu.basePrice,
            image: edition.front,
            quantity: 1
        });
    }

    updateCartUI();
    
    // Opcional: abrir el menú del carrito para mostrar que se añadió
    cartMenu.classList.add('active');
    modelMenu.classList.remove('active'); // Cerrar el otro si está abierto
}

function vaciarCarrito() {
    cartState = []; // Resetear el array en memoria
    updateCartUI();
    cartMenu.classList.remove('active'); // Cerrar el menú
}

// --- EVENTOS DE INTERACCIÓN ---

// Controles de Vista (Frente/Atrás)
btnFront.onclick = () => {
    currentView = 'front';
    btnFront.classList.add('active');
    btnBack.classList.remove('active');
    updateImage();
};

btnBack.onclick = () => {
    currentView = 'back';
    btnBack.classList.add('active');
    btnFront.classList.remove('active');
    updateImage();
};

// Eventos del Carrito
btnAddToPurchase.onclick = addToCart;
btnVaciarCarrito.onclick = vaciarCarrito;

// --- INICIALIZACIÓN ---

function init() {
    const modelList = document.getElementById('model-list');
    
    // 1. Poblar menú de modelos
    gpus.forEach((gpu, i) => {
        const li = document.createElement('li');
        li.className = "p-3 lg:p-4 hover:bg-gray-50 cursor-pointer text-[9px] lg:text-[10px] font-bold uppercase border-b transition-colors";
        li.innerText = gpu.model;
        li.onclick = () => { renderGPU(i); modelMenu.classList.remove('active'); };
        modelList.appendChild(li);
    });

    // 2. Control de menús desplegables (asegurar que no se superpongan)
    
    // Botón Modelos
    btnModelos.onclick = (e) => { 
        e.stopPropagation(); 
        modelMenu.classList.toggle('active'); 
        cartMenu.classList.remove('active'); // Cerrar carrito
    };
    
    // Botón Carrito
    btnCarrito.onclick = (e) => { 
        e.stopPropagation(); 
        cartMenu.classList.toggle('active'); 
        modelMenu.classList.remove('active');
    };
    document.onclick = () => {
        modelMenu.classList.remove('active');
        cartMenu.classList.remove('active');
    };
    updateCartUI();
}
init();
renderGPU(0); // Carga inicial
