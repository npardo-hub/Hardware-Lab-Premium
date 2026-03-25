# 🖥️ Boutique GPU  ((invented Content))

Welcome to **Hardware Lab Premium**, a high-end, minimalist e-commerce interface designed for PC hardware enthusiasts. This project focuses on a "boutique" shopping experience, prioritizing high-fidelity product visualization and a clean, distraction-free UI.

---

## 💎 Project Concept

As a developer with a deep interest in **PC hardware and component diagnostics**, I built HLP to bridge the gap between technical specs and premium aesthetics. Unlike traditional e-commerce sites, HLP treats every GPU like a piece of art, offering interactive viewing angles and dynamic color customization.

### 🌟 Key Features

* **Interactive Dual-View:** Seamlessly toggle between **Front** and **Back** views of the hardware to inspect PCB designs and cooling arrays.
* **Dynamic Edition Switching:** Real-time UI updates for different GPU editions (e.g., the Yeston Sakura Sugar), changing color schemes and asset paths instantly.
* **Ephemeral Smart Cart:** A memory-based shopping cart that handles real-time total calculations and item stacking.
* **Safety Logic:** Includes a custom "excess quantity" trigger—if a user attempts to add more than 5 units of a single item, the system executes a security reset to prevent bot-like behavior.
* **Mobile-First Architecture:** Fully responsive design using Tailwind CSS, ensuring a premium experience on both ultra-wide monitors and smartphones.

---

## 🛠️ Technology Stack

| Component | Technology | Implementation |
| :--- | :--- | :--- |
| **Styling** | **Tailwind CSS** | Utility-first classes for a minimalist, "Inter" font-driven design. |
| **Logic** | **Vanilla JavaScript (ES6+)** | Modular code using `import/export` to manage hardware data and state. |
| **Data** | **JSON/Object Modules** | Centralized `data.js` for easy inventory updates and scalability. |
| **UX** | **CSS Transitions** | Soft opacity fades and scale transforms for "premium" tactile feedback. |

---

## ⚙️ Logic & "Modding"

This project is built to be easily customized for different hardware catalogs.

### **The Data Engine**
The inventory is decoupled from the UI. To add new GPUs, you simply update the `gpus` array in `data.js`:
```javascript
{
    id: "gpu-new-model",
    brand: "BrandName",
    model: "ModelName",
    basePrice: 000.00,
    specs: { memory: "XGB", tdp: "XW" },
    editions: [...]
}
```

### **The Cart Controller**
The shopping cart logic is designed for speed. It uses a unique ID generator based on the GPU ID and the specific edition name to ensure that "Black Edition" and "Sakura Edition" are tracked as separate inventory items.

---

## 🚀 How to Run

1.  Clone the repository.
2.  Because this project uses **ES6 Modules** (`type="module"`), it must be run via a local server.
    * *Option A:* Use the "Live Server" extension in VS Code.
    * *Option B:* Use Python: `python -m http.server 8000`.
3.  Open your browser at `localhost`.

---

## 📈 Future Roadmap
* **Persistence:** Integrate `localStorage` to keep the cart active after a page refresh.
* **3D Integration:** Upgrade static images to interactive 3D `.glb` models using `<model-viewer>`.
* **Checkout Flow:** Add a simulated Stripe or PayPal payment gateway.
