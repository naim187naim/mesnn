<?php
// Connexion à la base de données
$conn = new mysqli("localhost", "root", "", "demande_noelie");

// Ton adresse mail où tu veux recevoir les notifications
$mon_mail = "naimalime.pro@gmail.com";

// --- CAS 1 : Enregistrement du choix (Oui, Non, Ami, etc.) ---
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    
    // On insère dans la base de données
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // On prépare l'email
    $sujet = "Reponse de Noelie";
    $message = "Salut ! Noélie vient de répondre à ton site.\n\nChoix : " . $choix;
    
    // Envoi du mail via le serveur (ssmtp doit être configuré)
    shell_exec("echo 'Subject: $sujet\n\n$message' | ssmtp $mon_mail");
}

// --- CAS 2 : Envoi du message libre ---
if (isset($_POST['message_texte'])) {
    $msg = $conn->real_escape_string($_POST['message_texte']);
    
    $sujet = "Nouveau message de Noelie";
    $message = "Noélie t'a laissé un petit mot :\n\n" . $msg;
    
    // Envoi du mail
    shell_exec("echo 'Subject: $sujet\n\n$message' | ssmtp $mon_mail");
}
?>
