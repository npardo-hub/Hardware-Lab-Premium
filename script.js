import { gpus } from './data.js';

const mainImage = document.getElementById('main-image');
const modelMenu = document.getElementById('model-menu');
const btnModelos = document.getElementById('btn-modelos');
const btnFront = document.getElementById('view-front');
const btnBack = document.getElementById('view-back');

let currentGPUIndex = 0;
let currentEditionIndex = 0;
let currentView = 'front';

function updateImage() {
    const gpu = gpus[currentGPUIndex];
    const edition = gpu.editions[currentEditionIndex];
    
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
    gpu.editions.forEach((ed, idx) => {
        const btn = document.createElement('button');
        btn.className = `w-10 h-10 rounded-full border-2 transition-all ${idx === 0 ? 'border-black scale-110' : 'border-transparent'}`;
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
        <div class="bg-white p-4 border border-gray-100 text-center hover:border-black transition-all">
            <span class="text-2xl block mb-1">${h.icon}</span>
            <span class="text-[9px] font-bold uppercase text-gray-400">${h.label}</span>
        </div>
    `).join('') || '';
}

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

function init() {
    const modelList = document.getElementById('model-list');
    gpus.forEach((gpu, i) => {
        const li = document.createElement('li');
        li.className = "p-4 hover:bg-gray-50 cursor-pointer text-[10px] font-bold uppercase border-b transition-colors";
        li.innerText = gpu.model;
        li.onclick = () => { renderGPU(i); modelMenu.classList.remove('active'); };
        modelList.appendChild(li);
    });

    btnModelos.onclick = (e) => { e.stopPropagation(); modelMenu.classList.toggle('active'); };
    document.onclick = () => modelMenu.classList.remove('active');
}

init();
renderGPU(0);