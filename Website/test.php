<?php

//     date_default_timezone_set('America/Halifax');
//
// $script_tz = date_default_timezone_get();
// var_dump($script_tz);
$timezone = new DateTimezone('America/Halifax');
$date = new DateTime('now', $timezone);


var_dump($date);

echo $date->format('Y-m-d H:i:s');
 ?>
