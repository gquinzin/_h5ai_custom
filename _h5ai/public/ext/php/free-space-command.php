<?php
//$dts = disk_free_space("C:");
$dts = disk_free_space("/home");
echo $dts;
?>