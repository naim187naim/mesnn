<?php
// 1. Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "demande_noelie");

// Ton adresse mail de réception
$mon_mail = "naimalime.pro@gmail.com";

// 2. Récupération des données (Choix ou Message)
$choix = $_POST['choix'] ?? null;
$message_texte = $_POST['message_texte'] ?? null;

// --- CAS A : Enregistrement d'un choix (Oui, Non, Ami, etc.) ---
if ($choix) {
    $choix_clean = $conn->real_escape_string($choix);
    
    // Sauvegarde en base de données
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix_clean')");
    
    // Envoi du mail d'alerte
    $sujet = "Reponse de Noelie";
    $contenu = "Salut ! Noelie a choisi l'option : " . $choix;
    
    // Commande SSMTP
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}

// --- CAS B : Envoi d'un message libre (Page verte) ---
if ($message_texte) {
    $msg_clean = $conn->real_escape_string($message_texte);
    
    // On prépare le mail pour le message
    $sujet = "Nouveau message de Noelie";
    $contenu = "Noelie t'a laisse ce message sur le site :\n\n" . $message_texte;
    
    // Commande SSMTP
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}

// Optionnel : Retourner une réponse au JavaScript
echo json_encode(["status" => "success"]);
?>
