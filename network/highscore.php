<?php
/////////////////////////////////////////////////
////  "connect.php" written by: Ryan Spice   ////
/////////////////////////////////////////////////

class connection
{
	public $userEmail = "";
	public $userName = "";
	public $userAccess = "";
	public $globalError = "";
	
	private $dbH = "localhost";
	private $dbD = "rspice_snow";
	private $dbU = "rspice_snow";
	private $dbP = "yahoo123";
	private $db;
	
	private $isopen = false;
	
	function __construct()	
	{
	//	session_start();
		
	}
	public function open() 
	{
		$this->db = new mysqli();
		$this->db->connect($this->dbH, $this->dbU, $this->dbP, $this->dbD);
		$this->isopen = true;
		
		
	}
	public function close()	
	{
		if ($this->isopen)
			{
			$this->isopen = false;
			$this->mysql->close();
			}
	}
	public function query($query)
	{
		if (!$this->isopen)
			$this->open();
		$results = $this->db->query($query);
		return	$results;
	}
}

$client = new connection();
function tpdb_open() {
	$server = mysql_connect("localhost","rspice","yahoo123") or die("ERROR - Could not connect to mySQL Server"); 
	mysql_select_db("rspice_snow") or die("ERROR - Could not select database");
}
function tpdb_close()	{
	mysql_close();
}
//SCORE UPLOADING vv
function sendScores($name, $score)
{
tpdb_open();
		$tpdb_table = "arcade";
		if ($result = mysql_query("INSERT INTO  arcade (name ,score) VALUES ('$name',  '$score')")) 
					{
					} 
					else 
					{

					}
tpdb_close();
}
//UPLOADING ^^
//recieveScores - reads then values from the table
function recieveScores()
{
tpdb_open();
		//$tpdb_table = "arcade";
		$result = mysql_query("SELECT * FROM  arcade ORDER BY score DESC");
				//$result = mysql_query("SELECT * FROM  projects ORDER BY pjId DESC LIMIT 1");
		$count = mysql_num_rows($result);
		if ($count == 0)
			{
			} else 
			{
				while($row = mysql_fetch_array($result))
					{
					printScores($row['id'],$row['name'],$row['score'],$row['time'],$row['a'],$row['b']);
					}
			}
tpdb_close();
}
//printScore - Echo score uniformly
function printScores($id,$name,$score,$time,$a,$b)
{
	//echo "'$id','$name',$score,$time,$a,$b";
	echo $name.",".$score.",";
}
recieveScores();
?>

