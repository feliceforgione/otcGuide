<?php
class GuidancePlan
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function GuidancePlan()   
		{ 
           	$this->methodTable = array( 
                					
					"getAdvice" => array( 
                				"description" => "Listing of nonpharm and pharm advise information",     
                				"access" => "remote",  
								"arguments" => array ("guidancePlanId"),
								"returns" => "Recordset" 
                	),
					"getProducts" => array( 
                				"description" => "Listing of products",     
                				"access" => "remote",  
								"arguments" => array ("upcs","guidancePlanId"),
								"returns" => "Recordset" 
                	)					 
            ); 


        // Initialize db connection
       	$this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        mysql_select_db ($this->dbname);
 
     	} 



     	function getAdvice($guidancePlanId)
        { 
            return mysql_query("SELECT A.title, A.text, A.list, P.tabs_num, P.tab3_label, P.tab4_label, P.tab5_label, 
								L.advice_type, L.advice_order
								FROM forgione_plan.treatment_advice A, forgione_plan.lnk_trt_plan_advice L, forgione_plan.treatment_plan P
								WHERE P.treatment_plan_id=L.treatment_plan_id
								AND L.advice_id=A.advice_id
								AND P.treatment_plan_id=".$guidancePlanId." 
								ORDER BY advice_type, advice_order"); 
        }
		function getProducts($upcs,$guidancePlanId)
        { 
            return mysql_query("SELECT TPU.treatment_line, TPU.upc_order ordering,
								U.item_name, 
								UL.*
								FROM forgione_upc.upc U
								JOIN forgione_plan.lnk_trt_plan_upc TPU USING (upc)
								JOIN forgione_upc.upc_label UL USING (upc)
								WHERE treatment_plan_id = $guidancePlanId
								AND U.upc IN ($upcs)
								Order by COALESCE(TPU.upc_order, 99999999), item_name"); 
        }  
    } 
?>