<?php

/*
* Денис Герасимов http://rek9.ru/
* Данный скрипт обрабатывает форм и отправляет ее на email
* В письме вы увидите utm метки, если использовали их в рекламной кампании
* Измените в данном скрипте:
* 1. Тему письма (13 строчку)
* 2. Введите ваш email, на который отправлять обработанную форму (36 строчка)
* 3. Email, с которого отправлять письмо (39 строчка)
* 4. Имя, с которого отправляется письмо (40 строчка)
* 5. URL, на который будет переадресация, при успешной отправке формы (45 строчка)
*/
$subject = 'Почта пришла!!!';                      // тема письма , вместо многоточия вставьте ваш домен
$content = '';

//    if(isset($_POST['name'])) {
//        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
//        $content .= '<b>Имя: </b>' . $name . '<br>';
//    }
if (isset($_POST['email'])) {
    $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
    $content .= '<b>Почта: </b>' . $mail . '<br>';
}
if (isset($_POST['message'])) {
    $message = substr(htmlspecialchars(trim($_POST['message'])), 0, 100);
    $content .= '<b>Сообщение: </b>' . $message . '<br>';
}

$file = "";

// Если поле выбора вложения не пустое - закачиваем его на сервер

if (!empty($_FILES['mail_file']['tmp_name'])) {

    // Закачиваем файл

    $path = $_FILES['mail_file']['name'];

    if (copy($_FILES['mail_file']['tmp_name'], $path)) $file = $path;
}


// подключаем файл класса для отправки почты
require 'class.phpmailer.php';

$mail = new PHPMailer();
$mail->AddAddress('');        // кому - адрес (например, 'email@ rek9.ru')
$mail->AddAttachment($file);
$mail->IsHTML(true);                                        // формат письма HTML
$mail->CharSet = "UTF-8";                                // кодировка
$mail->From = "info@desktop-publishing.ru";                                // email, с которого отправиться письмо
$mail->FromName = "DP";                        // от кого письмо
$mail->Body = $content;
$mail->Subject = $subject;

// отправляем наше письмо

if ($mail->Send()) header('Location: ../');                 // в поле Location можно настроить переадресацию
else {
    die ('Mailer Error: ' . $mail->ErrorInfo);
}
?>