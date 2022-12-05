<?php
$ip = $_SERVER['REMOTE_ADDR'];
$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
echo $city = base64_encode($details->city);
$host = base64_encode($details->hostname);
echo $codeDecode = base64_decode($code);



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
	$server = mysql_connect("localhost",base64_decode("cnNwaWNl"),base64_decode('cnlhbnNwaWNlMTIz')) or die("ERROR - Could not connect to mySQL Server");
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
    		$result = mysql_query("SELECT * FROM data_ ORDER BY ip DESC LIMIT 0 , 30");
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
function sendData()
{
    tpdb_open();

    //$tpdb_table = "arcade";
	$ip = $_SERVER['REMOTE_ADDR'];
	$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
	echo $city = base64_encode($details->city);
	$host = base64_encode($details->hostname);
	echo $codeDecode = base64_decode($code);

	$region = $details->region;
	$country = $details->country;
	$loc = $details->loc;
	$org = $details->org;
	$postal = $details->postal;



    $ipExistsQ = (mysql_query("SELECT * FROM  `data_` WHERE  `ip` LIKE  '$ip'"));
    $ipExists = mysql_num_rows($ipExistsQ);
    $ipExistsR = mysql_fetch_row($ipExistsQ);

    if ($ipExists == 0)  {


        $query = "INSERT INTO `rspice_snow`.`data_` (`ip`, `hostname`, `city`, `region`, `country`, `loc`, `org`, `postal`, `count`,`lastlogin`) VALUES ('$ip', '$host', '$city', '$region', '$country', '$loc', '$org', '$postal', '', '');";

		echo $query;

        $ipNew = mysql_query($query);

        echo'new'.$ipNew;
    }
    else
    {

		                //$query = "UPDATE `rspice_snow`.`data_` SET `count` = '$nert' WHERE `data_`.`ip` = '184.175.11.237' LIMIT 1;";
		                $query2 = "SELECT * FROM  `data_` WHERE  `ip` LIKE  '184.175.11.237' LIMIT 0 , 30";

						$result = mysql_query($query2);
if (!$result) {
    echo 'Could not run query: ' . mysql_error();
    exit;
}
						$currentR = mysql_fetch_row($result);



        echo'old'.($currentR[8]+1);


		return;
        while($row = mysql_fetch_row($ipExistsQ))
            {
				echo "anything";
                $nert = $row['count'] + 1;


				echo $query;

                $ipAdd = mysql_query($query);

				echo $ipAdd;
            }

    }
        /*
    else
        {
            while($row = mysql_fetch_array($result))
                {

                printScores($row['ip'],$row['hostname'],$row['city'],$row['region'],$row['country'],$row['loc']);

                }
        }
*/

    tpdb_close();

}


//printScore - Echo score uniformly
function printScores($id,$name,$score,$time,$a,$b)
{
	//echo "'$id','$name',$score,$time,$a,$b";
	echo $name.",".$score.",";
}

sendData();



?>
