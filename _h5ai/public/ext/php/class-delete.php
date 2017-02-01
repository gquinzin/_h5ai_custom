<?php
    if(isset($_POST['target'])){
        $filePath = urldecode ($_POST['target']);

        $delete = new Delete();
        $delete->delete_files("C:/wamp/www/gilles-quinzin" . $filePath );
        //$delete->delete_files("/home/downloader" . $filePath );

        echo "{\"deleted\": true}";
    }

    class Delete {
        public function __construct() { }

        public function delete_files($target) {
            if(is_dir($target)){
                $files = glob( $target . '*', GLOB_MARK ); //GLOB_MARK adds a slash to directories returned
                
                foreach( $files as $file )
                {
                    $this->delete_files( $file );      
                }
              
                rmdir( $target );
            } elseif(is_file($target)) {
                unlink( $target );  
            }
        }
    }
?>