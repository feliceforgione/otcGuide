<?php
class Disease_Subclass
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
        function Disease_Subclass() 
            { 
                $this->methodTable = array( 
                "getsubClasses" => array( //selects all available Titles 
                				"description" => "Returns avaible subclasses",     
                				"access" => "remote", // available values are private, public, remote 
                				"returntype" => "recordSet" 
                ),
                "getsubClassInfo" => array( //selects all available Titles 
                				"description" => "Returns specific subClass information",     
                				"access" => "remote", // available values are private, public, remote 
								"arguments" => array ("arg1")
				) 
            ); 
        // Initialize db connection

 
        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        mysql_select_db ($this->dbname); 
        } 
        function getsubClasses($Class) 
        { 
            return mysql_query("SELECT * FROM disease_subclass b WHERE b.disease_class_id = ".$Class." ORDER BY b.disease_subclass_name"); 
        }
		
		function getsubClassInfo($subClass) 
        { 
            return mysql_query("SELECT * FROM forgione_plan.disease_subclass b WHERE b.disease_subclass_id = $subClass"); 
        }  
    } 
?>