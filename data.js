export const gpus = [
    {
        id: "gpu-4060-yeston",
        brand: "Yeston",
        model: "GeForce RTX 4060",
        basePrice: 329.99,
        specs: { memory: "8GB GDDR6", tdp: "115W" },
        highlights: [
            { label: "Ray Tracing", icon: "💎" },
            { label: "DLSS 3.0", icon: "🚀" },
            { label: "0dB Fans", icon: "🔇" },
            { label: "RGB Sync", icon: "🌈" }
        ],
        editions: [
            { 
                name: "Sakura Sugar", 
                color: "#ffb7c5", 
                front: "1.png",
                back: "2.png" 
            },
            { 
                name: "Black Edition", 
                color: "#1a1a1a", 
                front: "3.png",
                back: "4.png"
            }
        ]
    },
    {
        id: "gpu-7900-xtx",
        brand: "Yeston",
        model: "Radeon RX 7900 XTX",
        basePrice: 949.00,
        specs: { memory: "24GB GDDR6", tdp: "355W" },
        highlights: [
            { label: "FSR 3.0", icon: "🏎️" },
            { label: "Dual BIOS", icon: "🔄" }
        ],
        editions: [
            { 
                name: "Standard Edition", 
                color: "#ffffff", 
                front: "5.png",
                back: "6.png"
            }
        ]
    }

];
