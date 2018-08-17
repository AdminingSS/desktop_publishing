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

$picture = "";

// Если поле выбора вложения не пустое - закачиваем его на сервер

if(isset($_FILES)) {
    $qmsg = '12345';
}

if (!empty($_FILES['file']['tmp_name']))

{

    // Закачиваем файл

    $path = $_FILES['file']['name'];

    if (move_uploaded_file($_FILES['file']['tmp_name'], $path)) $picture = $path;

}

$thm = $subject;

$msg = $content . $qmsg;

$mail_to = 'admining@mail.ru';

// Отправляем почтовое сообщение

if(empty($picture)) mail($mail_to, $thm, $msg);

else send_mail($mail_to, $thm, $msg, $picture);

// Вспомогательная функция для отправки почтового сообщения с вложением

function send_mail($to, $thm, $html, $path)

{

    $fp = fopen($path,"r");

    if (!$fp)

    {

        print "Файл $path не может быть прочитан";

        exit();

    }

    $file = fread($fp, filesize($path));

    fclose($fp);



    $boundary = "--".md5(uniqid(time())); // генерируем разделитель

    $headers .= "MIME-Version: 1.0\n";

    $headers .="Content-Type: multipart/mixed; boundary=\"$boundary\"\n";

    $multipart .= "--$boundary\n";

    $kod = 'koi8-r'; // или $kod = 'windows-1251';

    $multipart .= "Content-Type: text/html; charset=$kod\n";

    $multipart .= "Content-Transfer-Encoding: Quot-Printed\n\n";

    $multipart .= "$html\n\n";



    $message_part = "--$boundary\n";

    $message_part .= "Content-Type: application/octet-stream\n";

    $message_part .= "Content-Transfer-Encoding: base64\n";

    $message_part .= "Content-Disposition: attachment; filename = \"".$path."\"\n\n";

    $message_part .= chunk_split(base64_encode($file))."\n";

    $multipart .= $message_part."--$boundary--\n";



    if(!mail($to, $thm, $multipart, $headers))

    {

        echo "К сожалению, письмо не отправлено";

        exit();

    }

}

?>