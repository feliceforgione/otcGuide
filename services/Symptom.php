<?php
class Symptom
    { 
        var $dbhost = "localhost:3306"; 
        var $dbname = "forgione_plan"; 
        var $dbuser = "root"; 
        var $dbpass = ""; 
         
         
        function Symptom()   { 

                	$this->methodTable = array( 
                					"getSymptoms" => array( 
                							"description" => "Listing of all symptoms for a particular symptom set",     
                							"access" => "remote", // available values are private, public, remote 
                							"returntype" => "recordSet",
											"arguments" => array ("arg1")
 
                							) 
            						); 


        		// Initialize db connection
        	   	$this->conn = mysql_pconnect($this->dbhost, $this->dbuser, $this->dbpass); 
        		mysql_select_db ($this->dbname);
 
        		} 



        function getSymptoms()
        { 
            return mysql_query("SELECT * 
								FROM forgione_plan.symptom_sets SS, forgione_plan.lnk_sets_symptoms L, forgione_plan.symptoms S
								WHERE SS.symptom_set_id = L.symptom_set_id
								AND L.symptom_id = S.symptom_id
								AND SS.symptom_set_id =1"); 
        } 
    } 
?>