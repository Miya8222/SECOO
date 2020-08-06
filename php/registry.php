<?php
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Method:POST,GET');

include "connname.php";
//检测用户名是否重名

// echo $_POST['name'];
if(isset($_POST['name'])){
    $username = $_POST['name'];//获取前端失去焦点传入的用户名的值。
    // echo $_POST;
    $result=$connname->query("select * from taobaousers where username='$username'");//和数据库进行匹配
    echo json_encode($result->fetch_assoc());
    // if($result->fetch_assoc()){//返回数组，用户名存在
    //     echo 1;//1
    // }else{//用户名不存在
    //     echo false;//空
    // }
}
//判断是否点击submit
if(isset($_POST['submit'])){
    // print_r($_POST);
    $user = $_POST['username'];
    $pass =sha1($_POST['password']);
    $passagain = sha1($_POST['passagain']);
    $connname->query("insert taobaousers values(null,'$user','$pass','$passagain')");
    //php页面跳转
    header("Location: http://localhost/www/SECOO/src/mainpage.html");
}
?>