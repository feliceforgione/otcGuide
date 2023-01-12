<?php
class ProductListing
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function ProductListing()   
		{ 
           	$this->methodTable = array( 
			
            		"getProducts" => array( 
                				"description" => "Pulls in all product information",     
                				"access" => "remote",
								"arguments" => array ("upcs","treatmentPlanId"),
								"returns" => "Recordset" 
					) 
            ); 


        // Initialize db connection
       	$this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
		mysql_select_db ($this->dbname);
   		} 



        function getProducts($upcs,$treatmentPlanId)
        { 
            return mysql_query("SELECT L.treatment_line, U.*
								FROM forgione_upc.upc U
								JOIN forgione_plan.lnk_trt_plan_upc L USING (upc)
								WHERE treatment_plan_id = ".$treatmentPlanId."
								AND U.upc IN (".$upcs.")"); 
        } 
    } 
?>
