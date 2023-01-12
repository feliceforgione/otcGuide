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
								"arguments" => array ("treatment_plan_id","gender","agegroup"),
								"returns" => "Recordset" 
                	),
                	"getMedicalConditions" => array( 
                				"description" => "Returns available medical conditions pulled from UPCs",     
                				"access" => "remote", 
								"arguments" => array ("upcs"),
								"returns" => "Recordset" 
					),
                	"getMedicalConditionsFilteredUPCset" => array( 
                				"description" => "Returns UPCs not affected by Medical Conditions",     
                				"access" => "remote", 
								"arguments" => array ("upcs","selectedMedicalConditions"),
								"returns" => "Recordset" 
					),
                	"getFilterQuestions" => array( 
                				"description" => "Returns filter questions",     
                				"access" => "remote",
								"arguments" => array ("upcs","gender","agegroup"),
								"returns" => "Recordset" 
					),
                	"getFilterQuesFilteredUPCSet" => array( 
                				"description" => "Returns re-filtered UPCs affected by Filter Question selections",     
                				"access" => "remote",
								"arguments" => array ("upcs","selectedQuestions"),
								"returns" => "Recordset" 
					),
                	"getAllergies" => array( 
                				"description" => "Returns allergies",     
                				"access" => "remote",
								"arguments" => array ("upcs"),
								"returns" => "Recordset" 
					),
				   	"getAllergiesFilteredUPCset" => array( 
                				"description" => "Returns allergies",     
                				"access" => "remote",
								"arguments" => array ("upcs","selectedAllergies"),
								"returns" => "Recordset" 
					)												
				
            ); 
        // Initialize db connection
        $this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
	       // mysql_select_db ($this->dbname,$this->conn); 
        } 
		

        function getStartingSet($treatment_plan_id,$gender,$agegroup) 
        { 
            return mysql_query("SELECT DISTINCT A.upc FROM forgione_upc.upc u 
								JOIN forgione_plan.lnk_trt_plan_upc A USING (upc) 
								LEFT JOIN 
									(Select DISTINCT vmh.upc FROM forgione_upc.upc u 
									JOIN forgione_plan.lnk_trt_plan_upc A USING (upc) 									
									JOIN forgione_upc.v_upc_medicalhistory vmh USING (upc)	
									WHERE (vmh.".$gender."<0 OR vmh.".$agegroup."<0)
									AND A.treatment_plan_id = $treatment_plan_id 
									AND u.upc_demo_display = 1) B	USING (upc)
								WHERE A.treatment_plan_id = $treatment_plan_id 
								AND u.upc_demo_display = 1
								AND B.upc IS NULL
								ORDER BY upc"); 
        }  

		
      /*   function getStartingSet($treatment_plan_id) 
        { 
            return mysql_query("SELECT A.upc FROM forgione_plan.lnk_trt_plan_upc A	
			WHERE A.treatment_plan_id = $treatment_plan_id"); 
        }  */

		function getMedicalConditions($upcs) 
        { 
            return mysql_query("SELECT DISTINCT vmh.medical_condition_id id, vmh.medical_condition_layman_term as 'term'
								FROM forgione_upc.v_upc_medicalhistory vmh
								WHERE vmh.medical_condition_layman_term IS NOT NULL
								AND vmh.upc in ($upcs)
								ORDER BY 2 "); 
        } 
		function getMedicalConditionsFilteredUPCset($upcs,$selectedMedicalConditions) 
        { 
            return mysql_query("SELECT DISTINCT A.upc
								FROM forgione_upc.v_upc_medicalhistory A LEFT JOIN
								 	(SELECT distinct vmh.upc
									FROM forgione_upc.v_upc_medicalhistory vmh
									WHERE vmh.medical_condition_id IN ($selectedMedicalConditions)
									AND vmh.upc IN ($upcs)) B
								USING (upc)
								WHERE A.upc IN ($upcs)
								AND B.upc IS NULL
								ORDER BY upc"); 
        } 
		
		/* function getFilterQuestions($upcs,$gender,$agegroup) 
        { 
            return mysql_query("SELECT DISTINCT F.filter_question_id, F.question
								FROM forgione_plan.lnk_ingredient_filter_questions L, forgione_plan.filter_questions F, forgione_upc.brand_composition B
								LEFT JOIN forgione_plan.medical_history M 
								ON ( F.filter_question_id = M.foreign_key_id AND M.table_id =2 ) 
								WHERE B.ingredient_id=L.ingredient_id
								AND L.filter_question_id=F.filter_question_id
								AND B.upc IN (".$upcs.") 
								AND ((M.".$gender."=0 AND M.".$agegroup."=0 ) OR (M.medical_history_id IS NULL))");
        }  */

		function getFilterQuestions($upcs,$gender,$agegroup) 
        { 
            return mysql_query("SELECT DISTINCT F.filter_question_id, F.question
								FROM forgione_plan.lnk_ingredient_filter_questions L                                
								JOIN forgione_upc.brand_composition B 
								ON (B.ingredient_id=L.ingredient_id)
								JOIN forgione_plan.filter_questions F
								ON (L.filter_question_id=F.filter_question_id)                          
								
								LEFT JOIN forgione_plan.medical_history  M
								ON ( F.filter_question_id = M.foreign_key_id  ) 
								WHERE   M.table_id =2
								AND B.upc IN (".$upcs.") 
								AND ((M.".$gender."=0 AND M.".$agegroup."=0 ) OR (M.medical_history_id IS NULL))");
        } 

		function getFilterQuesFilteredUPCSet($upcs,$selectedQuestions) 
        { 
            return mysql_query("SELECT DISTINCT A.upc
								FROM forgione_upc.brand_composition A LEFT JOIN
									(Select distinct B.upc
									FROM forgione_plan.lnk_ingredient_filter_questions L, forgione_plan.filter_questions F, forgione_upc.brand_composition B
									WHERE B.ingredient_id=L.ingredient_id
									AND L.filter_question_id=F.filter_question_id
									AND F.filter_question_id IN (".$selectedQuestions.")
									AND B.upc in (".$upcs.") ) B
									USING (upc)
									WHERE B.upc is null
									AND A.upc in (".$upcs.")");
        } 
		function getAllergies($upcs) 
        { 
            return mysql_query("SELECT DISTINCT vmh.ingredient_type_id, vmh.ingredient_broader_name as term, vmh.ingredient_broader_name_id as id
								FROM forgione_upc.v_upc_medicalhistory vmh
								WHERE vmh.ingredient_hypoallergenic = 1
								AND vmh.upc in ($upcs)
								ORDER BY 1,2");
        } 
		function getAllergiesFilteredUPCset($upcs,$selectedAllergies) 
        { 
            return mysql_query("SELECT DISTINCT A.upc
								FROM forgione_upc.v_upc_medicalhistory A LEFT JOIN
								 	(SELECT distinct vmh.upc
									FROM forgione_upc.v_upc_medicalhistory vmh
									WHERE vmh.ingredient_broader_name_id IN ($selectedAllergies)
									AND vmh.upc IN ($upcs)) B
								USING (upc)
								WHERE A.upc IN ($upcs)
								AND B.upc IS NULL
								ORDER BY upc"); 
        } 
    } 
?>
