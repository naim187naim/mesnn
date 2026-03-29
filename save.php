<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data) {
    $mon_mail = "naimalime.pro@gmail.com";
    $sujet = isset($data['sujet']) ? $data['sujet'] : "Notification Site Noélie";
    
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

    // Commande SSMTP avec protection des caractères spéciaux
    $commande = "echo -e 'Subject: $sujet\\n\\n'\"$contenu\" | /usr/sbin/ssmtp $mon_mail";
    shell_exec($commande);

    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
