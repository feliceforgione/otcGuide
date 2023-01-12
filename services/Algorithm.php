<?php
class Algorithm
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
        function Algorithm() 
     	{ 
          	$this->methodTable = array( 
				
                	"getStartingPoint" => array(
                				"description" => "Returns starting algorithm id question based on MH",     
                				"access" => "remote",
								"arguments" => array ("disease_subclass"),
                       			"returns" => "Recordset" 
                
                	),
                	"getNextAlgorithm" => array(
                				"description" => "Returns algorithm id of next alorithm question",     
                				"access" => "remote",
								"arguments" => array ("algorithmQuesID"),
								"returns" => "Recordset"
					),
					"getSymptoms" => array(
                				"description" => "Returns symptoms associated with a algorithm question",     
                				"access" => "remote",
								"arguments" => array ("algorithmQuesID"),
								"returns" => "Recordset"
					),
					"getSymptomComboAlgorithmQues" => array(
                				"description" => "Returns next algorithm question based on symptom combination",     
                				"access" => "remote",
								"arguments" => array ("algorithmQuesID","selectedRecords"),
								"returns" => "Recordset"
					)
				
            ); 
	        // Initialize db connection
    	    $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        	mysql_select_db ($this->dbname); 
        } 
		
        function getStartingPoint($disease_subclass) 
        { 
            return mysql_query("SELECT * FROM forgione_plan.lnk_mh_algorithm_ques a WHERE a.disease_subclass_id = $disease_subclass"); 
        } 
		
		function getNextAlgorithm($algorithmQuesID) 
        { 
            return mysql_query("SELECT * FROM forgione_plan.algorithm_questions a WHERE a.algorithm_question_id = $algorithmQuesID"); 
        } 
		
		function getSymptoms($algorithmQuesID) 
        { 
            return mysql_query("SELECT s.symptom_name, ass.symptom_type_id
								FROM forgione_plan.algorithm_symptom_set ass
								JOIN forgione_plan.symptoms s using (symptom_id)
								WHERE ass.algorithm_question_id = $algorithmQuesID"); 
        } 
		
		function getSymptomComboAlgorithmQues($algorithmQuesID,$selectedRecords) 
        { 
            return mysql_query("SELECT a.jumpto_algorithm_question_id
								FROM forgione_plan.algorithm_symptom_combos a
								WHERE a.algorithm_question_id = $algorithmQuesID
								AND a.combination = '$selectedRecords'"); 
        } 
    } 
?>
