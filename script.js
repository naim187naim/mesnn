const pages = {
    login: {
        title: "Accès Réservé",
        text: "Veuillez décliner votre identité pour continuer :",
        color: "#050505",
        isLoginPage: true,
        buttons: [{ text: "Entrer", action: "verifierIdentite()" }]
    },
    intrude: {
        title: "Accès Refusé",
        text: "Désolé, mais vous n'avez rien à faire ici. Ce site est privé. <br><br>Veuillez fermer cet onglet et continuer votre chemin.",
        color: "#1a0000",
        heart: "🚫",
        buttons: [{ text: "Réessayer", action: "location.reload()" }]
    },
    naim: {
        title: ":}",
        text: "01000011 01110010 01101111 01101001 01110010 01100101 00100000 01100101 01101110 00100000 01110011 01100101 01110011 00100000 01110010 01100101 01110110 01100101 01110011 00100000 01100011 00100111 01100101 01110011 01110100 00100000 01100010 01101001 01100101 01101110 00101100 00100000 01101100 01100101 01110011 00100000 01110010 01100101 01100001 01101100 01101001 01110011 01100101 01110011 00100000 01100011 00100111 01100101 01110011 01110100 00100000 01101101 01101001 01100101 01110101 01111000",
        color: "#1a0033",
        buttons: [{ text: "Retour", action: "location.reload()" }]
    },
    accueil: {
        title: "Pour Noélie",
        text: "Je sais que ça fait bien longtemps que je te parle du site web, mais je l'ai enfin fini en espérant qu'il te plaît.",
        color: "#0f0f0f", 
        buttons: [{ text: "Next", action: "changePage('demande')" }]
    },
    demande: {
        title: "Noélie...",
        text: "Noélie, je voudrais que tu saches à quel point tu es gentille, belle, intelligente... <br><br>Et je voudrais te dire que chaque moment passé avec toi est un moment incroyable. À chaque fois que je suis avec toi, je ne veux qu'une chose : pouvoir te tenir la main et te dire je t'aime.<br><br>Et c'est pour ça qu'aujourd'hui, je prends mon courage à deux mains pour te demander si tu voudrais sortir avec moi...",
        color: "#2b0a1a", 
        heart: "❤️",
        buttons: [
            { text: "Oui", action: "saveAndExit('oui')" },
            { text: "Non", action: "gererClicNon(this)", id: "btn-non" }
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
        text: "Noélie, je t'aime, je t'aime, je t'aime. <br><br>Ça fait bientôt 3 ans que j'attends cette réponse. Tu ne pouvais pas me rendre plus heureux que maintenant. <br><br>Je peux enfin te le dire : je t'aime, Noélie.",
        color: "#3d0a1a", 
        heart: "💖",
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    pas_relation: {
        title: "Je comprends",
        text: "Ça veut dire que ce n'est pas encore perdu et que j'ai encore mes chances si j'ai quelque chose à te dire, Noélie. <br><br>Si tu ne veux pas te mettre en couple, c'est normal, tu as tes raisons. <br><br>Et si pour toi il faudrait encore attendre 10 ans... je le ferai.",
        color: "#1d0a2b", 
        heart: "💜🩹", 
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    ami: {
        title: "Ma meilleure pote",
        text: "Bon, si tel est ton choix, je dois le respecter.<br><br>Mais je veux que tu saches une chose : même en tant que meilleur ami, je serai toujours là pour toi et je ne te laisserai jamais tomber, peu importe ce qu'il se passe pour toi.<br><br>Ma meilleure pote.",
        color: "#0a1a2b", 
        heart: "💙",
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    laisser_message: {
        title: "Un petit mot ?",
        text: "Si tu as envie de me dire quelque chose de particulier, tu peux l'écrire ici :",
        color: "linear-gradient(135deg, #0a1f1a 0%, #1e5144 100%)", 
        heart: "✉️",
        isMessagePage: true,
        buttons: [{ text: "Envoyer le message", action: "envoyerMessage()" }]
    }
};

// CONFIGURATION WEB3FORMS
const WEB3_ACCESS_KEY = "dffce9ea-55d0-48bb-aba3-4e6ecfdaa557";

let typingTimer;
let nbClicsNon = 0;
const phrasesNon = ["Tu es sûre ?", "Vraiment ?", "Réfléchis encore...", "Bon bah..."];

function gererClicNon(btnElement) {
    if (nbClicsNon < phrasesNon.length) {
        btnElement.innerText = phrasesNon[nbClicsNon];
        nbClicsNon++;
    } else {
        nbClicsNon = 0; 
        changePage('choixNon');
    }
}

function verifierIdentite() {
    const input = document.getElementById('nomLogin');
    if(!input) return;
    const nomSaisi = input.value.trim().toLowerCase();
    
    // Notification de connexion
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            access_key: WEB3_ACCESS_KEY,
            subject: "Connexion au Site",
            nom_entre: nomSaisi
        })
    });

    if (nomSaisi === "bruja") { changePage('accueil'); } 
    else if (nomSaisi === "naim" || nomSaisi === "naïm") { changePage('naim'); } 
    else { changePage('intrude'); }
}

function typeWriter(text, i, fnCallback) {
    const el = document.getElementById('typewriter');
    if (!el) return;

    if (i < text.length) {
        if (text.substring(i, i+4) === '<br>') {
            el.innerHTML += '<br>';
            i += 4;
        } else {
            el.innerHTML += text.charAt(i);
            i++;
        }
        typingTimer = setTimeout(() => typeWriter(text, i, fnCallback), 35);
    } else if (typeof fnCallback == 'function') {
        fnCallback();
    }
}

function changePage(pageKey) {
    const page = pages[pageKey];
    if (!page) return;

    clearTimeout(typingTimer);
    document.body.style.background = page.color;
    updateHearts(page.heart);
    
    const app = document.getElementById('app');
    let htmlContent = `<div class="glass-card"><h1>${page.title}</h1>`;
    htmlContent += `<p id="typewriter"></p>`;
    htmlContent += `<div id="extra-content" style="display:none; opacity:0; transition: opacity 0.5s ease;">`;
    
    if (page.isLoginPage) {
        htmlContent += `<input type="text" id="nomLogin" placeholder="Mot de passe..." autocomplete="off">`;
    }
    if (page.isMessagePage) {
        htmlContent += `<textarea id="zoneMessage" placeholder="Ton message ici..."></textarea>`;
    }
    
    htmlContent += `<div class="btn-container">`;
    page.buttons.forEach(btn => {
        const action = btn.id === "btn-non" ? "gererClicNon(this)" : btn.action;
        htmlContent += `<button onclick="${action}">${btn.text}</button>`;
    });
    htmlContent += `</div></div></div>`;
    
    app.innerHTML = htmlContent;

    if (page.isLoginPage) {
        document.getElementById('typewriter').innerHTML = page.text;
        const extra = document.getElementById('extra-content');
        extra.style.display = 'block';
        setTimeout(() => extra.style.opacity = '1', 10);
    } else {
        typeWriter(page.text, 0, () => {
            const extra = document.getElementById('extra-content');
            extra.style.display = 'block';
            setTimeout(() => extra.style.opacity = '1', 10);
        });
    }
}

function saveAndExit(choice) {
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            access_key: WEB3_ACCESS_KEY,
            subject: "Choix de Noélie",
            reponse: choice
        })
    });
    changePage(choice);
}

function envoyerMessage() {
    const zone = document.getElementById('zoneMessage');
    if(!zone) return;
    const message = zone.value;
    if (!message.trim()) { alert("Le message est vide !"); return; }
    
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
            access_key: WEB3_ACCESS_KEY,
            subject: "Message de Noélie",
            message: message
        })
    }).then(() => {
        alert("Message envoyé ! ❤️");
        changePage('accueil');
    });
}

function initHearts() {
    let container = document.getElementById('bg-hearts');
    if (!container) {
        container = document.createElement('div');
        container.className = 'bg-hearts'; container.id = 'bg-hearts';
        document.body.prepend(container);
    }
}

function updateHearts(symbol) {
    const container = document.getElementById('bg-hearts');
    if (!container) return;
    container.innerHTML = ''; 
    if (!symbol) return; 
    for(let i=0; i<15; i++) { setTimeout(() => createHeart(symbol), i * 300); }
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

window.onload = () => {
    initHearts();
    changePage('login');
};
