<?php
class Exclusion
    { 
		var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function Exclusion()   
		{ 
		   	$this->methodTable = array( 
                
					"getExclusionQuestions" => array( 
                				"description" => "Listing of all exclusion questions for a particular subclass",     
                				"access" => "remote",
								"arguments" => array ("disease_subclass_id","gender","agegroup"),
								"returns" => "Recordset" 
            		) 
            ); 


        	// Initialize db connection
        	$this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        	mysql_select_db ($this->dbname);
 
        } 



        function getExclusionQuestions($disease_subclass_id, $gender, $agegroup)
        { 
            return mysql_query("SELECT * FROM forgione_plan.exclusion_questions E LEFT JOIN forgione_plan.medical_history M
								ON (E.question_id=M.foreign_key_id AND M.table_id=3)
								WHERE E.disease_subclass_id = ".$disease_subclass_id." 
								AND ((M.".$gender."=0 AND M.".$agegroup."=0) OR (M.medical_history_id IS NULL))"); 
        } 
    } 
?>