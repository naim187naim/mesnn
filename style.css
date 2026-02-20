:root {
    --glass: rgba(255, 255, 255, 0.1);
    --border: rgba(255, 255, 255, 0.2);
}

* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }

body {
    height: 100vh;
    background: #0f0f0f;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: white;
    transition: background 1.5s ease;
}

.bg-hearts {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 1;
    pointer-events: none;
}

.floating-heart {
    position: absolute;
    bottom: -50px;
    font-size: 1.5rem;
    animation: flyUp 6s linear infinite;
}

@keyframes flyUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    20% { opacity: 0.6; }
    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
}

.glass-card {
    background: var(--glass);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--border);
    border-radius: 25px;
    padding: 40px;
    width: 90%;
    max-width: 650px;
    text-align: center;
    z-index: 10;
    box-shadow: 0 10px 32px rgba(0,0,0,0.5);
}

h1 { font-size: 2.2rem; margin-bottom: 20px; }
p { font-size: 1.05rem; line-height: 1.6; margin-bottom: 30px; }

.btn-container { display: flex; flex-direction: column; gap: 12px; align-items: center; }

button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid white;
    color: white;
    padding: 12px 35px;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover { background: white; color: black; transform: scale(1.05); }
