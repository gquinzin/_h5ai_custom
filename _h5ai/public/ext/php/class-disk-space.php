<?php

    $diskSpace = new DiskSpace();
    $free = $diskSpace->get_free_space("/home");
    $total = $diskSpace->get_total_space("/home");

    echo "{\"free\": ". $free .", \"total\": ". $total ."}";

    class DiskSpace {
        public function __construct() { }

        public function get_free_space($path) {
            return disk_free_space($path);
        }

        public function get_total_space($path) {
            return disk_total_space($path);
        }
    }
?>