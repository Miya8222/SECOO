<?php
    header('content-type:text/html;charset=utf-8');
    define('HOST','localhost');//主机名
    define('USERNAME','root');//用户名
    define('PASSWORD','');//密码
    define('DBNAME','js2004');//数据库的名称

    $connname = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);
    if($connname->connect_error){//如果上面的数据库连接出错，显示下面的错误。
        die('数据库连接失败'.$connname->connect_error);
    };
    // else{
    //     echo '连接数据库成功';
    // }
?>