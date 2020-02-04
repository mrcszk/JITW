<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
 
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Dodaj nowy post</title>
	<?php include('style.php');?>
	<script type="text/javascript" src="walidacja.js"></script>

</head>
<body onload="init(); wyswietlListeStyli(); sprawdzCookies()">
	<div id="Tytuł">
		<h1> Mrcszk_Blogs </h1>
	</div>	
	
	<?php include 'menu.php'; ?>
	<div id="Spis_treści">
	<form action='wpis.php' method='POST' enctype="multipart/form-data">
	
	<b>Nazwa użytkownika:</b><br />
	<input type='text' id ='nazwa_uzytkownika' name='nazwa_uzytkownika' placeholder = 'Podaj nazwę użytkownika.' required="required"> <br />	
	<b>Hasło:</b><br />
	<input type='password' name='haslo' placeholder = 'Podaj hasło.' required="required"> <br />	
	<b>Treść posta:</b> <br />
	<textarea name='post' cols = 60 rows = 5 placeholder = 'Podaj treść posta.' required="required"></textarea> <br />
	<b>Data:</b> <br />
	<input type='text' name='date' onblur="sprawdzPoprawnoscData()" required="required"  /> <br />
	<b>Godzina: </b><br />
	<input type="text" name="time" onblur="sprawdzPoprawnoscGodzina()" required="required" /> <br /><br />
	<b>Możesz dodać załączniki:</b></br> 
	<div id="zalaczniki"> 
	</div>
	<input type="button" value="Dodaj nowy załącznik" onclick="dodajKolejnyZalacznik('zalaczniki')"  /><br /><br />
	<input type='submit'value="Wyślij">
	<input type='button' value="Wyczyść" onclick="resecik('zalaczniki')"/> <br />
	</form>
	</div>
</body>
</html>
