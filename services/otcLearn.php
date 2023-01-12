<?php
class otcLearn
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function otcLearn() 
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
                   	),
					"getAllTutorials" => array( 
                       			"description" => "Returns all tutorials",     
                       			"access" => "remote",
								"arguments" => array (),
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
		function getAllTutorials() 
        { 
            return mysql_query("SELECT I.tutorialclassi_id, I.tutorialclassi_displayname,I.tutorialclassi_description, I.tutorialclassi_disable,I.tutorialclassi_buttonimage,
								I.tutorialclassi_order, II.tutorialclassii_id, II.tutorialclassii_displayname, II.tutorialclassii_description, II.tutorialclassii_disable, II.tutorialclassii_order,
								T.tutorial_id, T.tutorial_title, T.tutorial_name, T.tutorial_description, T.tutorial_width, T.tutorial_height,
								T.tutorial_link, T.tutorial_image_link, T.tutorial_disable, T.tutorial_order
								FROM forgione_plan.tutorialclassi I
								JOIN forgione_plan.tutorialclassii II ON (I.tutorialclassi_id = II.tutorialclassi_id)
								LEFT JOIN forgione_plan.tutorials T  ON (II.tutorialclassii_id = T.tutorialclassii_id)
								ORDER BY I.tutorialclassi_order, II.tutorialclassii_order, COALESCE(T.tutorial_order, 99999999), T.tutorial_title"); 
        }		
		
    } 
?>