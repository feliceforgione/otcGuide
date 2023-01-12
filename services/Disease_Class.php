<?php
class Disease_Class
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
        function Disease_Class() 
        { 
        	$this->methodTable = array( 
				
               		"getDiseaseClasses" => array( 
                       			"description" => "Returns disease classes",     
                       			"access" => "remote",
								"arguments" => array (),
                       			"returns" => "Recordset" 
                   	),
					"getAllDiseaseClasses" => array( 
                       			"description" => "Returns disease classes",     
                       			"access" => "remote",
								"arguments" => array (),
                       			"returns" => "Recordset" 
                   	)  
         	); 

	        // Initialize db connection
	        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
	        mysql_select_db ($this->dbname,$this->conn); 
        } 

        function getDiseaseClasses() 
        { 
            return mysql_query("SELECT * FROM disease_class a WHERE a.disease_class_show <> 'n' ORDER BY a.disease_class_order"); 
        } 
		function getAllDiseaseClasses() 
        { 
            return mysql_query("SELECT A.disease_class_id, A.disease_class_aliasname, A.disease_class_description, A.disease_class_buttonimage,
								A.disease_class_order, A.disease_class_show, A.disease_class_disable, B.disease_subclass_id, B.disease_subclass_name,B.disease_subclass_description,
								B.disease_subclass_order, B.disease_subclass_disable
								FROM forgione_plan.disease_class A
								LEFT JOIN forgione_plan.disease_subclass B USING (disease_class_id)
								WHERE A.disease_class_show = 1
								ORDER BY COALESCE(A.disease_class_order, 9999999), A.disease_class_aliasname, COALESCE(B.disease_subclass_order, 99999999), B.disease_subclass_name"); 
        } 
    } 
?>