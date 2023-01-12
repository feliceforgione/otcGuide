<?php
class Tutorials
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function Tutorials() 
        { 
        	$this->methodTable = array( 
				
               		"getTutorialClassesI" => array( 
                       			"description" => "Returns tutorial classes",     
                       			"access" => "remote",
								"arguments" => array (),
                       			"returns" => "Recordset" 
                   	),
               		"getTutorialClassesII" => array( 
                       			"description" => "Returns tutorial classes",     
                       			"access" => "remote",
								"arguments" => array ("tutorialclassiID"),
                       			"returns" => "Recordset" 
                   	),
               		"getTutorials" => array( 
                       			"description" => "Returns tutorial classes",     
                       			"access" => "remote",
								"arguments" => array ("wherestatement"),
                       			"returns" => "Recordset" 
                   	),
               		"getPlanTutorials" => array( 
                       			"description" => "Returns tutorials associated with a guidance plan",     
                       			"access" => "remote",
								"arguments" => array ("guidancePlanId"),
                       			"returns" => "Recordset" 
                   	)									 
         	); 

	        // Initialize db connection
	        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
	        mysql_select_db ($this->dbname,$this->conn); 
        } 

        function getTutorialClassesI() 
        { 
            return mysql_query("SELECT * 
								FROM `tutorialclassi` 
								WHERE tutorialclassi_disable = false"); 
        } 
        function getTutorialClassesII($tutorialclassiID) 
        { 
            return mysql_query("SELECT * 
								FROM `tutorialclassii` 
								WHERE tutorialclassi_id = $tutorialclassiID
								AND tutorialclassii_disable = false"); 
        } 		
        function getTutorials($wherestatement) 
        { 
            return mysql_query("SELECT * 
								FROM `tutorials` 
								WHERE $wherestatement"); 
        } 	
        function getPlanTutorials($guidancePlanId) 
        { 
            return mysql_query("Select T.*
								From forgione_plan.lnk_trt_plan_tutorial A
								JOIN forgione_plan.tutorials T USING (tutorial_id)
								WHERE A.treatment_plan_id = $guidancePlanId"); 
        } 	
    } 
?>