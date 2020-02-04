<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pl" lang="pl">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<!-- <script type="text/javascript" src="chat.js"></script>	 -->
	<?php	include 'style.php'; ?>
	<title>Chat</title>
</head>
<body onload="wyswietlListeStyli(); sprawdzCookies()">
<div id="Tytuł">
		<h1> Mrcszk_Blogs </h1>
</div>
  <?php include 'menu.php'; ?>
  
  <div id="czacik">
	<br/>
      <input type="checkbox" id="aktywny">
	  <b>Aktywuj chat</b><br/>
      <textarea id="czat" disabled></textarea>
    <form id="formularz">
		<br /><b>Nick:</b><br/>
        <input id="nick" name="nick" type="text" disabled>
		<br/><b>Wiadomość:</b><br/>
        <textarea id="wiadomosc" cols = 60 rows = 5 name="wiadomosc" disabled></textarea>
        <br/><button role="submit" id="wyslij" disabled>Wyślij</button>
		<br/>
		<br/>
    </form>
  </div>

  <script src="./chat.js"></script>
</body>
</html>



