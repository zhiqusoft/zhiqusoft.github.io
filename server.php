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
            <style>
                .message-box {
                    width: 400px;
                    height: 200px;
                    position: relative;
                    margin-top: 40px;
                    left: 50%;
                    margin-left: -200px;;
                    border: 1px solid lightblue;
                    box-sizing: border-box;
                    font-family: "Microsoft YaHei";
                    font-weight: 200;
                    text-align: center;
                    padding: 20px;
                }
                .message-box h2 {
                    text-align: center;
                    height: 30px;
                    display: inline-block;
                    width: 100px;
                    font-size: 16px;
                    line-height: 30px;
                }
                .message-box p {
                    font-size: 12px;
                    color: grey;
                }
            </style>
        </head>
        <body id="body">
            <div class="message-box">
                <h2>提交成功!</h2>
                <img src="./img/success.png" width="100" />
                <p>浏览器稍后将会返回首页</p>
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
            <style>
                .message-box {
                    width: 400px;
                    height: 200px;
                    position: relative;
                    margin-top: 40px;
                    left: 50%;
                    margin-left: -200px;;
                    border: 1px solid lightblue;
                    box-sizing: border-box;
                    font-family: "Microsoft YaHei";
                    font-weight: 200;
                    text-align: center;
                    padding: 20px;
                }
                .message-box h2 {
                    text-align: center;
                    height: 30px;
                    display: inline-block;
                    width: 100px;
                    font-size: 16px;
                    line-height: 30px;
                }
                .message-box p {
                    font-size: 12px;
                    color: grey;
                }
            </style>
        </head>
        </head>
        <body>
            <div class="message-box">
                <h2>提交失败</h2>
                <img src="./img/error.png" width="100" />
                <p></p>
            </div>
        </body>
        </html>
<?php
    }
}

