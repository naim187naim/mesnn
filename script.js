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
        text: "Noélie, je t'aime, je t'aime, je t'aime. <br><br>Tu ne pouvais pas me rendre plus heureux que maintenant. Je te promets d'être le meilleur à tes yeux.<br><br>Je peux enfin te le dire : je t'aime, Noélie.",
        color: "#3d0a1a", 
        heart: "💖",
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    pas_relation: {
        title: "Je comprends",
        text: "Ça veut dire que ce n'est pas encore perdu. Si tu ne veux pas te mettre en couple maintenant, c'est normal, tu as tes raisons.<br><br>Et si pour toi il faut attendre... je le ferai.",
        color: "#1d0a2b", 
        heart: "💜🩹", 
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    ami: {
        title: "Ma meilleure pote",
        text: "Bon, si tel est ton choix, je dois le respecter.<br><br>Mais je serai toujours là pour toi et je ne te laisserai jamais tomber.<br><br><b>Ma meilleure pote.</b>",
        color: "#0a1a2b", 
        heart: "💙",
        buttons: [{ text: "Laisser un petit message", action: "changePage('laisser_message')" }]
    },
    laisser_message: {
        title: "Un petit mot ?",
        text: "Si tu as envie de me dire quelque chose de particulier, tu peux l'écrire ici :",
        color: "linear-gradient(135deg, #0a1f1a 0%, #1e5144 100%)", // Dégradé vert sombre et clair
        heart: "✉️",
        isMessagePage: true, // Pour afficher le champ texte
        buttons: [{ text: "Envoyer le message", action: "envoyerMessage()" }]
    }
};

function changePage(pageKey) {
    const page = pages[pageKey];
    document.body.style.background = page.color;
    if (typeof updateHearts === "function") updateHearts(page.heart);
    
    const app = document.getElementById('app');
    
    let contentHtml = `
        <div class="glass-card">
            <h1>${page.title}</h1>
            <p>${page.text}</p>`;
    
    // Si c'est la page message, on ajoute le textarea
    if (page.isMessagePage) {
        contentHtml += `
            <textarea id="zoneMessage" placeholder="Ton message ici..." style="width:100%; height:100px; border-radius:15px; padding:10px; margin-bottom:20px; border:none; background: rgba(255,255,255,0.2); color:white; font-family:inherit;"></textarea>`;
    }

    contentHtml += `
            <div class="btn-container">
                ${page.buttons.map(btn => `<button onclick="${btn.action}">${btn.text}</button>`).join('')}
            </div>
        </div>
    `;
    app.innerHTML = contentHtml;
}

function envoyerMessage() {
    const message = document.getElementById('zoneMessage').value;
    if (!message.trim()) return alert("Le message est vide !");

    const formData = new FormData();
    formData.append('message_texte', message);

    fetch('save.php', {
        method: 'POST',
        body: formData
    }).then(() => {
        alert("Message envoyé ! ❤️");
        location.reload(); // Revenir à l'accueil
    });
}

// Garde tes autres fonctions (initHearts, saveAndExit, etc.) identiques
