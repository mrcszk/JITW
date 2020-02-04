<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$username = $_POST['nick'];
$message = $_POST['wiadomosc'];

if (empty($username) || empty($message)) {
  echo 'Nie podano nazwy użytkownika lub wiadomości!';
  return;
}
$filename = "messages.txt";
if (!file_exists($filename)) {	
	mkdir ($filename,0755);
	$file = fopen($filename, "w");
	fwrite($file, "Rozpoczynamy czat!\n");
	fclose($file);
}
$file_path = realpath('./messages.txt');
$pointer = fopen($file_path, 'r+');

// Ilość komunikatów przechowywana na serwerze
$max_messages = 25;

if (flock($pointer, LOCK_SH)) {
  // Wczytujemy wszystkie wiadomości do tablicy (każda wiadomość jest w jednej linii)
  $messages = explode(PHP_EOL, fread($pointer, filesize($file_path)));
  $messages[] = $username . ': ' . remove_new_lines($message);
  $messages = array_filter($messages, 'strlen');
  // Sprawdzamy czy nowa liczba wiadomości nie przekracza limitu
  $messages_count = count($messages);

  // Jeżeli przekracza limit to usuwamy wiadomości z początku tablicy
  if ($messages_count > $max_messages) {
    $messages = array_slice($messages, $messages_count - $max_messages);
  }
  // Przywrócenie wskaźnika na sam początek
  rewind($pointer);
  // Usuwamy wszystko z pliku
  ftruncate($pointer, 0);
  
  // Zapisujemy każdą wiadomość w nowej linii
  foreach ($messages as $message) {
    fwrite($pointer, $message . PHP_EOL);
  }

  flock($pointer, LOCK_UN);
}

fclose($pointer);

echo 'OK';

function remove_new_lines($text) {
  return str_replace(["\r\n","\r","\n"], ' ', $text);
}

?>