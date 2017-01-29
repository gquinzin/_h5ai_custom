<?php

// $ds contains the total number of bytes available on "/"
// $ds = disk_total_space("/");

// On Windows:
$dts = disk_total_space("C:");

echo $dts;
?>