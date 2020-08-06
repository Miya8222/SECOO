<?php
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Method:POST,GET');
include "connname.php";
//检测用户名和密码是否都已经传入
if(isset($_POST['username']) && isset($_POST['password'])){
    $name = $_POST['username'];
    $pass = $_POST['password'];
    $result = $connname->query("select * from taobaousers where username = '$name' and password ='$pass'");
    echo json_encode($result->fetch_assoc());
    echo $name;
    echo $pass;
    // if($result->fetch_assoc()){//匹配成功
    //     echo true;
    //     header("Location: http://localhost/www/SECOO/src/mainpage.html");
    // }else{//匹配不成功
    //     echo false;
    // }
}
?>