<?php
$conn = new mysqli("localhost", "root", "", "demande_noelie");
$mon_mail = "naimalime.pro@gmail.com";

if (isset($_POST['choix'])) {
    $choix = $conn->real_escape_string($_POST['choix']);
    $conn->query("INSERT INTO reponses (choix) VALUES ('$choix')");
    
    // Cette ligne envoie le mail du choix
    shell_exec("echo 'Subject: Reponse de Noelie\n\nElle a choisi : $choix' | ssmtp $mon_mail");
}

if (isset($_POST['message_texte'])) {
    $msg = $_POST['message_texte'];
    // Cette ligne envoie le message écrit
    shell_exec("echo 'Subject: Message de Noelie\n\nContenu : $msg' | ssmtp $mon_mail");
}
?>
