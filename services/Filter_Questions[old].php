<?php
class Filter_Questions
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function Filter_Questions() 
        { 
        	$this->methodTable = array( 
			
                	"getStartingSet" => array( 
                				"description" => "Returns starting set of upcs listed for a particular treatment plan",     
                				"access" => "remote",
								"arguments" => array ("treatment_plan_id"),
								"returns" => "Recordset" 
                	),
					"getSetTest" => array( 
                				"description" => "test",     
                				"access" => "remote", 
								"arguments" => array ("treatment_plan_id","mhSQL"),
								"returns" => "Recordset" 
					),
                	"getMHSet" => array( 
                				"description" => "Returns UPCs affected by Medical History",     
                				"access" => "remote", 
								"arguments" => array ("upcs","mhSQL"),
								"returns" => "Recordset" 
					),
                	"getFilterQuestions" => array( 
                				"description" => "Returns filter questions",     
                				"access" => "remote",
								"arguments" => array ("upcs","mhSQL"),
								"returns" => "Recordset" 
					),
                	"getFilterQuesSet" => array( 
                				"description" => "Returns re-filtered UPCs affected by Filter Question selections",     
                				"access" => "remote",
								"arguments" => array ("upcs","QuesIds"),
								"returns" => "Recordset" 
					)							
				
            ); 
        // Initialize db connection
        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        mysql_select_db ($this->dbname); 
        } 
		
		function getSetTest($treatment_plan_id,$mhSQL) 
        { 
            return mysql_query("SELECT A.upc FROM forgione_plan.lnk_trt_plan_upc A	LEFT JOIN 
									(SELECT distinct B.upc
									FROM forgione_plan.lnk_trt_plan_upc A, forgione_upc.brand_composition B, forgione_plan.medical_history M
									WHERE B.ingredient_id = M.foreign_key_id
									AND A.upc = B.upc
									AND M.table_id=1
									AND A.treatment_plan_id = $treatment_plan_id
									$mhSQL) E 
								USING (upc)
								WHERE A.treatment_plan_id = $treatment_plan_id
								AND E.upc is null"); 
        } 
        function getStartingSet($treatment_plan_id) 
        { 
            return mysql_query("SELECT upc FROM forgione_plan.lnk_trt_plan_upc A WHERE A.treatment_plan_id = $treatment_plan_id"); 
        } 
		
		function getMHSet($upcs,$mhSQL) 
        { 
            return mysql_query("SELECT distinct B.upc
								FROM forgione_upc.brand_composition B, forgione_plan.medical_history M
								WHERE B.ingredient_id = M.foreign_key_id
								AND M.table_id=1
								AND B.upc IN (".$upcs.") $mhSQL"); 
        } 
		
		function getFilterQuestions($upcs,$mhSQL) 
        { 
            return mysql_query("Select distinct F.filter_question_id, F.question
								FROM forgione_plan.lnk_ingredient_filter_questions L, forgione_plan.filter_questions F, forgione_upc.brand_composition B
								LEFT JOIN forgione_plan.medical_history M 
								ON ( F.filter_question_id = M.foreign_key_id AND M.table_id =2 ) 
								WHERE B.ingredient_id=L.ingredient_id
								AND L.filter_question_id=F.filter_question_id
								AND B.upc IN (".$upcs.") $mhSQL");
        } 
		function getFilterQuesSet($upcs,$QuesIds) 
        { 
            return mysql_query("Select distinct B.upc
								FROM forgione_plan.lnk_ingredient_filter_questions L, forgione_plan.filter_questions F, forgione_upc.brand_composition B
								WHERE B.ingredient_id=L.ingredient_id
								AND L.filter_question_id=F.filter_question_id
								AND F.filter_question_id IN (".$QuesIds.")
								AND B.upc IN (".$upcs.")");
        } 
    } 
?>
