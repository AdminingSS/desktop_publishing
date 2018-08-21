<?php

$msg = '';
$content = '';
$subject = 'Файлы на распознавание';                 // тема письма

if (isset($_POST['email'])) {
    $email = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
    $content .= '<b>Почта: </b>' . $email . '<br>';
}
if (isset($_POST['message'])) {
    $message = substr(htmlspecialchars(trim($_POST['message'])), 0, 100);
    $content .= '<b>Сообщение: </b>' . $message . '<br>';
}
if (isset($_POST['currency'])) {
    $currency = substr(htmlspecialchars(trim($_POST['currency'])), 0, 100);
    $content .= '<b>Валюта: </b>' . $currency . '<br>';
}
if (isset($_POST['markup'])) {
    //$markup = substr(htmlspecialchars(trim($_POST['markup'])), 0, 100);
    $content .= '<b>Сверстать.</b><br>';
}
if (isset($_POST['urgent'])) {
    //$message = substr(htmlspecialchars(trim($_POST['message'])), 0, 100);
    $content .= '<b>Срочно!</b><br>';
}

// подключаем файл класса для отправки почты
require 'class.phpmailer.php';

$mail = new PHPMailer();
$mail->AddAddress('admining@mail.ru');
//$mail->AddAddress('timofeevpv@mail.ru');        // кому - адрес
$mail->IsHTML(true);                            // выставляем формат письма HTML
$mail->CharSet = "UTF-8";                             // кодировка
$mail->From = "info@DP.ru";                           // email, с которого отправиться письмо
$mail->FromName = "DP";                               // откого письмо

$mail->Subject = $subject;

if (array_key_exists('file', $_FILES)) {

    for ($ct = 0; $ct < count($_FILES['file']['tmp_name']); $ct++) {

        $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['file']['name'][$ct]));

        $filename = $_FILES['file']['name'][$ct];

        if (move_uploaded_file($_FILES['file']['tmp_name'][$ct], $uploadfile)) {

            $mail->AddAttachment($uploadfile, $filename);

        } else {

            $msg .= 'Failed to move file to ' . $uploadfile;

        }

    }

}

$mail->Body = $content;

// отправляем письмо

if ($mail->Send()) {
    mail($email,'Ваши файлы отправлены', 'Ваши файлы отправлены на распознавание');
    header('Location: ../');
} else {
    mail('admining@mail.ru','Отправить файлы на отправку не вышло.', 'По каким-то причинам клиент '. $email . ' не смог отправить вам файлы');
    die ('Mailer Error: ' . $mail->ErrorInfo);
}
?>