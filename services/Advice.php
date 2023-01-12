<?php
class Advice
    { 
        var $dbhost = "localhost:22"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "otcplan"; 
        var $dbpass = "admin"; 
         
        function Advice()   { 

                	$this->methodTable = array( 
                					"getAdvice" => array( 
                							"description" => "Listing of all exclusion questions for a particular subclass",     
                							"access" => "remote", // available values are private, public, remote 
                							"returntype" => "recordSet",
											"arguments" => array ("arg1")
 
                							) 
            						); 


        		// Initialize db connection
        	   	$this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        		mysql_select_db ($this->dbname);
 
        		} 



        function getAdvice($treatmentPlanId)
        { 
            return mysql_query("SELECT A.title, A.text, A.list, P.tabs_num, P.tab3_label, P.tab4_label, P.tab5_label, 
								L.advice_type, L.advice_order
								FROM forgione_plan.treatment_advice A, forgione_plan.lnk_trt_plan_advice L, forgione_plan.treatment_plan P
								WHERE P.treatment_plan_id=L.treatment_plan_id
								AND L.advice_id=A.advice_id
								AND P.treatment_plan_id=".$treatmentPlanId." 
								ORDER BY advice_type, advice_order");  
        } 
    } 
?>