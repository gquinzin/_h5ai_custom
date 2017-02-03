<?php
    if(isset($_POST['target']) && isset($_POST['fileName']) && isset($_POST['newValue']))
    {

        $target = urldecode ($_POST['target']);
        $fileName = urldecode ($_POST['fileName']);
        $newValue = urldecode ($_POST['newValue']);

        $rename = new Rename();
        $rename->rename_file("C:/wamp/www/gilles-quinzin", $target, $fileName, $newValue);
        //$rename->rename_file("/home/downloader", $target, $fileName, $newValue);

        echo "{\"renamed\": true}";
    } 
    else 
    {
        echo "{\"renamed\": false}";
    }

    class Rename {
        public function __construct() { }

        public function rename_file($basePath, $target, $fileName, $newValue) {
            $pos = strrpos($target, $fileName);

            if($pos !== false)
            {
                $newTarget = substr_replace($target, $newValue, $pos, strlen($fileName));
                rename ("{$basePath}{$target}" , "{$basePath}{$newTarget}");
            }
        }
    }
?>

