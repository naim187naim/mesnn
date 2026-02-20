const pages = {
    accueil: {
        title: "Pour Noélie",
        text: "Je sais que ça fait bien longtemps que je te parle du site web, mais je l'ai enfin fini en espérant qu'il te plaît.",
        color: "#0f0f0f", 
        heart: null,
        buttons: [{ text: "Next", action: "changePage('demande')" }]
    },
    demande: {
        title: "Noélie...",
        text: "Noélie, je voudrais que tu saches à quel point tu es gentille, belle, intelligente... <br><br>Et je voudrais te dire que chaque moment passé avec toi est un moment incroyable. À chaque fois que je suis avec toi, je ne veux qu'une chose : pouvoir te tenir la main et te dire je t'aime.<br><br>Et c'est pour ça qu'aujourd'hui, je prends mon courage à deux mains pour te demander si tu voudrais sortir avec moi...",
        color: "#2b0a1a", 
        heart: "❤️",
        buttons: [
            { text: "Oui", action: "saveAndExit('oui')" },
            { text: "Non", action: "changePage('choixNon')" }
        ]
    },
    choixNon: {
        title: "Pourquoi ?",
        text: "Bon, je vois que j'ai peut-être pas assez regardé de films romantiques pour te faire tomber sous mon charme... il faudrait que tu m'en conseilles plus alors...<br><br>Mais bon, je m'éloigne du sujet. J'ai une question à te poser avant : pourquoi tu ne veux pas ?",
        color: "#1a0a0a", 
        heart: "💔",
        buttons: [
            { text: "Je ne veux pas de relation maintenant", action: "saveAndExit('pas_relation')" },
            { text: "Je préfère que tu restes mon meilleur ami", action: "saveAndExit('ami')" }
        ]
    },
    oui: {
        title: "Je t'aime",
        text: "Noélie, je t'aime, je t'aime, je t'aime. <br><br>Ça fait bientôt 3 ans que j'attends cette réponse. Tu ne pouvais pas me rendre plus heureux que maintenant. <br><br>Je te promets d'être le meilleur à tes yeux, d'être toujours là pour toi dans les bons comme les mauvais moments, et de t'aimer toujours plus chaque jour.<br><br>Je peux enfin te le dire : je t'aime, Noélie.",
        color: "#3d0a1a", 
        heart: "💖",
        buttons: []
    },
    pas_relation: {
        title: "Je comprends",
        text: "Ça veut dire que ce n'est pas encore perdu et que j'ai encore mes chances si j'ai quelque chose à te dire, Noélie. <br><br>Si tu ne veux pas te mettre en couple, c'est normal, tu as tes raisons. <br><br>Et si pour toi il faudrait encore attendre 10 ans... je le ferai.",
        color: "#1d0a2b", 
        heart: "💜🩹", 
        buttons: []
    },
    ami: {
        title: "Ma meilleure pote",
        text: "Bon, si tel est ton choix, je dois le respecter.<br><br>Mais je veux que tu saches une chose : même en tant que meilleur ami, je serai toujours là pour toi et je ne te laisserai jamais tomber, peu importe ce qu'il se passe pour toi.<br><br><b>Ma meilleure pote.</b>",
        color: "#0a1a2b", 
        heart: "💙",
        buttons: []
    }
};

function initHearts() {
    const container = document.createElement('div');
    container.className = 'bg-hearts';
    container.id = 'bg-hearts';
    document.body.prepend(container);
}

function updateHearts(symbol) {
    const container = document.getElementById('bg-hearts');
    container.innerHTML = ''; 
    if (!symbol) return; 

    for(let i=0; i<15; i++) {
        setTimeout(() => createHeart(symbol), i * 300);
    }
}

function createHeart(symbol) {
    const container = document.getElementById('bg-hearts');
    if(!container) return;
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.innerHTML = symbol;
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (Math.random() * 3 + 4) + 's';
    container.appendChild(h);
    setTimeout(() => h.remove(), 6000);
}

function changePage(pageKey) {
    const page = pages[pageKey];
    document.body.style.background = page.color;
    updateHearts(page.heart);
    
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="glass-card">
            <h1>${page.title}</h1>
            <p>${page.text}</p>
            <div class="btn-container">
                ${page.buttons.map(btn => `<button onclick="${btn.action}">${btn.text}</button>`).join('')}
            </div>
        </div>
    `;
}

function saveAndExit(choice) {
    fetch('save.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `choix=${encodeURIComponent(choice)}`
    });
    changePage(choice);
}

initHearts();
changePage('accueil');
