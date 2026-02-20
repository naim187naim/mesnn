<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$mon_mail = "naimalime.pro@gmail.com";

// Enregistrement du choix
if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // Commande pour envoyer le mail
    $sujet = "Reponse de Noelie";
    $contenu = "Elle a repondu : " . $choix;
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}

// Enregistrement du message
if (isset($_POST['message_texte'])) {
    $msg = $_POST['message_texte'];
    $sujet = "Nouveau message de Noelie";
    $contenu = "Message : " . $msg;
    shell_exec("echo 'Subject: $sujet\n\n$contenu' | ssmtp $mon_mail");
}
?>
