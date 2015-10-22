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
$is_ajax = 0;

if(isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])=="xmlhttprequest"){
    // ajax 请求的处理方式
    $is_ajax = 1;
}else{
    // 正常请求的处理方式
    $is_ajax = 0;
};

$sql = "INSERT INTO customMessage(name,mobile,content) VALUES('$name','$mobile','$content')";
if($pdo->exec($sql)) {
    if($is_ajax) {
        echo 0;
    }
    else {
        ?>
        <html >
        <head>
            <title>谢谢您的信任</title>
            <meta charset="utf-8">
        </head>
        <body>
            <div>
                <h2>提交成功!</h2>
            </div>
        </body>
        </html>
<?php

    }
}
else
{
    if($is_ajax) {
        echo -1;
    }
    else {
        ?>
        <html >
        <head>
            <title>有问题了!</title>
            <meta charset="utf-8">
        </head>
        </head>
        <body>
            <div>
                <h2>提交失败</h2>
            </div>
        </body>
        </html>
<?php
    }
}

