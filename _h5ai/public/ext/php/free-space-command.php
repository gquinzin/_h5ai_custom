<?php

// $ds contains the total number of bytes available on "/"
// $ds = disk_free_space("/");

// On Windows:
$dfs = disk_free_space("C:");

echo $dfs;
?>