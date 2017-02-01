<?php
    if(isset($_POST['target']) && isset($_POST['fileName']) && isset($_POST['newValue'])){

        $target = urldecode ($_POST['target']);
        $fileName = urldecode ($_POST['fileName']);
        $newValue = urldecode ($_POST['newValue']);

        $rename = new Rename();
        $rename->rename_file("C:/wamp/www/gilles-quinzin", $target, $fileName, $newValue);
        //$rename->rename_file("/home/downloader", $target, $fileName, $newValue);

        echo "{\"renamed\": true}";
    }

    class Rename {
        public function __construct() { }

        public function rename_file($basePath, $target, $fileName, $newValue) {

            
            //$newTarget = str_replace($fileName, $newValue, $target)
            //rename ($target , $target)
        }
    }
?>