<?php





$ip = $_SERVER['REMOTE_ADDR'];
$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));



echo $details;

echo $code = base64_encode($details);


echo $code = base64_encode($details->city);
echo $codeDecode = base64_decode($code);




 ?>
