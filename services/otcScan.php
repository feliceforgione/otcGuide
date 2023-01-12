<?php
class otcScan
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function otcScan() 
        { 
        	$this->methodTable = array( 
				
               		"getCheckUPC" => array( 
                       			"description" => "Check if scanned UPC is in database",     
                       			"access" => "remote",
								"arguments" => array ("upc"),
                       			"returns" => "Recordset" 
                   	),
                	"getScanFilterQuestions" => array( 
                				"description" => "Returns filter questions",     
                				"access" => "remote",
								"arguments" => array ("upcs","gender","agegroup"),
								"returns" => "Recordset" 
					),
                	"getScanProductInfo" => array( 
                				"description" => "Returns filter questions",     
                				"access" => "remote",
								"arguments" => array ("upcs"),
								"returns" => "Recordset" 
					)  
         	); 

	        // Initialize db connection
	        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
	        mysql_select_db ($this->dbname,$this->conn); 
        } 

        function getCheckUPC($upc) 
        { 
            return mysql_query("SELECT U.item_name, vmh.* FROM forgione_upc.v_upc_medicalhistory vmh
								 JOIN forgione_upc.upc U using (upc)
			                     WHERE vmh.upc = '".$upc."'"); 
        } 
		function getScanFilterQuestions($upcs,$gender,$agegroup) 
        { 
            return mysql_query("SELECT DISTINCT F.filter_question_id, F.question
								FROM forgione_upc.brand_composition B
								JOIN forgione_plan.lnk_ingredient_filter_questions L USING (ingredient_id)
								JOIN forgione_plan.filter_questions F ON (L.filter_question_id=F.filter_question_id)
								LEFT JOIN forgione_plan.medical_history M ON ( F.filter_question_id = M.foreign_key_id AND M.table_id =2) 
								WHERE  B.upc=".$upcs."
								AND ((M.".$gender."=0 AND M.".$agegroup."=0 ) OR (M.medical_history_id IS NULL))");
        } 
		function getScanProductInfo($upcs)
        { 
            return mysql_query("SELECT U.item_name, UL.*
								FROM forgione_upc.upc U
								JOIN forgione_upc.upc_label UL USING (upc)
								WHERE U.upc=$upcs"); 
        } 
    } 
?>