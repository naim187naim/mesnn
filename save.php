<?php
// On autorise les requêtes provenant de ton site
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// 1. Récupération des données envoyées en JSON par le script.js
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    // Ton adresse mail de réception (Gmail)
    $mon_mail = "naimalime.pro@gmail.com";
    
    // On extrait le sujet et le message
    // On utilise l'opérateur ?? pour mettre une valeur par défaut si c'est vide
    $sujet = isset($data['sujet']) ? $data['sujet'] : "Notification Site Noélie";
    
    // On récupère soit la 'reponse' (bouton oui/non) soit le 'message' (zone de texte)
    $contenu = "";
    if (isset($data['reponse'])) {
        $contenu = "Choix fait par Noélie : " . $data['reponse'];
    } elseif (isset($data['message'])) {
        $contenu = "Message laissé par Noélie :\n\n" . $data['message'];
    } elseif (isset($data['nom_entre'])) {
        $contenu = "Tentative de connexion avec le nom : " . $data['nom_entre'];
    } else {
        $contenu = "Action inconnue détectée sur le site.";
    }

    // 2. Préparation de la commande SSMTP
    // On utilise escapeshellarg pour éviter les problèmes avec les caractères spéciaux
    $sujet_clean = escapeshellarg($sujet);
    $corps_mail = escapeshellarg($contenu);

    // La commande echo envoie le sujet et le corps directement à ssmtp
    $commande = "echo -e 'Subject: $sujet\\n\\n'\"$contenu\" | /usr/sbin/ssmtp $mon_mail";

    // 3. Exécution de l'envoi
    shell_exec($commande);

    // Réponse au JavaScript pour dire que tout s'est bien passé
    echo json_encode(["status" => "success", "message" => "Mail envoyé"]);
} else {
    // Si aucune donnée n'est reçue
    echo json_encode(["status" => "error", "message" => "Aucune donnée reçue"]);
}
?>
