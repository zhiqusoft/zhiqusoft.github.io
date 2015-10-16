<?php
/**
 * Created by PhpStorm.
 * User: JiangYulin
 * Date: 2015/10/16
 * Time: 15:27
 * $param name
 * $param mobile
 * $param content
 */
require_once("db_config.php");
$pdo = new PDO("mysql:host=".$DB["server"].";dbname=".$DB["dbn"],$DB["user"],$DB['password']);

$name       = $_POST["name"];
$mobile     = $_POST["mobile"];
$content    = $_POST["content"];

$sql = "INSERT INTO customMessage(name,mobile,content) VALUES('$name','$mobile','$content')";
if($pdo->exec($sql)) {
    echo 0;
}
else
{
    echo -1;
    var_dump($pdo->errorInfo());
}

