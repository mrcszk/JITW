<?php
$blogname = $_GET["nazwa"];
$postfilename = $_GET["postfilename"]; 
$comment_dir = "blogs/" . $blogname . "/" . $postfilename . ".k";
$comment_path = "";
$l = fopen("y", "r+");
if (flock($l, LOCK_EX))
{
	if (is_dir('blogs/'.$blogname) && file_exists('blogs/'.$blogname.'/'.$postfilename)) {
		if (!is_dir($comment_dir)) {
			mkdir($comment_dir);
		}

		for ($i = 0; ; $i++) {
			$comment_path = $comment_dir . "/" . strval($i);
			if (!file_exists($comment_path)) {
				break;
			}
		}

		$commentfilehandle = fopen($comment_path, "w");
		fwrite($commentfilehandle, $_GET["reakcja"]."\n");
		fwrite($commentfilehandle, date('Y-m-d H:i:s')."\n");
		fwrite($commentfilehandle, $_GET["nick"]."\n");
		fwrite($commentfilehandle, $_GET["komentarz"]."\n");
		fclose($commentfilehandle);
	}
    flock($l, LOCK_UN);
}
else{
    echo "Race condition error";
    exit(-1);
}
header('Location: blog.php?nazwa=' . $_GET["nazwa"] );
?>