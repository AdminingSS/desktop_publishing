<?php

//use PHPMailer\PHPMailer\PHPMailer;

//require 'PHPMailer.php';

$msg ='';
$content = '';
$subject = 'Почта пришла!!!';                      // тема письма , вместо многоточия вставьте ваш домен

if (isset($_POST['email'])) {
    $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
    $content .= '<b>Почта: </b>' . $mail . '<br>';
}
if (isset($_POST['message'])) {
    $message = substr(htmlspecialchars(trim($_POST['message'])), 0, 100);
    $content .= '<b>Сообщение: </b>' . $message . '<br>';
}

// подключаем файл класса для отправки почты

require 'class.phpmailer.php';
$mail = new PHPMailer();
$mail->AddAddress('admining@mail.ru');        // кому - адрес, Имя (например, 'email@ rek9.ru','Денис Герасимов')
$mail->IsHTML(true);                                        // выставляем формат письма HTML
$mail->CharSet = "UTF-8";                                // кодировка
$mail->From = "info@chistu.ru";                                // email, с которого отправиться письмо
$mail->FromName = "DP";                        // откого письмо

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
$content .= '<b>Сообщение ошибки: </b>' . $msg . '<br>';
$content .= '<b>Имя файла: </b>' . $filename . '<br>';

$mail->Body = $content;

// отправляем наше письмо

if ($mail->Send()) header('Location: ../');                 // в поле Location можно настроить переадресацию
else {
    die ('Mailer Error: ' . $mail->ErrorInfo);
}
?>