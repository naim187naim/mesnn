<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$mon_mail = "naimalime.pro@gmail.com";

// 1. Sauvegarde du choix Oui/Non
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // Notification mail du choix
    $sujet = "Reponse de Noelie";
    $contenu = "Elle a repondu : " . $choix;
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}

// 2. Envoi du message libre
if (isset($_POST['message_texte'])) {
    $msg = $_POST['message_texte'];
    $sujet = "Nouveau message de Noelie";
    $contenu = "Noelie t'a laisse un message :\n\n" . $msg;
    
    // Envoi via SSMTP
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}
?>
