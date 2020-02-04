<?php
	define('MUTEX_KEY', 123456); # the key to access you unique semaphore
	sem_get( MUTEX_KEY, 1, 0666, 1 );
	
	sem_acquire( ($resource = sem_get( MUTEX_KEY )) );
	$A = $_POST['nazwa_bloga'];
	$B = $_POST['nazwa_uzytkownika'];
	$C = $_POST['haslo'];
	$D = $_POST['opis'];
	
	if(!file_exists("blogs/" . $A)){	
		mkdir ("blogs/" . $A,0755);
		$W = fopen("blogs/$A/info",'w');
		fwrite($W, $B . "\n" . md5($C) . "\n" . $D);
		fclose($W);		
		echo "Utworzono nowy blog.<br />";
		header("refresh:3;url=post.php");
	}
	else{
		echo "Blog o tej nazwie już istnieje! <br />";
		echo "Nie może istnieć więcej niż jeden blog o tej samej nazwie!";
		header("refresh:3;url=tworzenie.php");
	}
	
	sem_release( $resource );
	
?>
