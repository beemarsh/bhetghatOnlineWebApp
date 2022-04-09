<?php
if(!isset($_SERVER['HTTP_REFERER'])){
        http_response_code(404);
        include('errper.php');
        exit();
    }
    define('apicheck',TRUE);
    include('apicheck.php');
    session_start();
    if (!empty($_POST['token'])) {
        if (hash_equals(hash('sha256',$_SESSION['token']), $_POST['token'])){
            
        } else {
             echo 0;
             exit();
        }
    }
    define('sqlconnection_check',true);
    include('sqlconnection.php');
    if(check_empty($_POST['name']) || check_empty($_POST['phone']) || check_empty($_POST['email']) || check_empty($_POST['address']) || check_empty($_POST['food'])){
        echo 2;
        exit();
    }
    if(!preg_match("/^[a-zA-Z ]*$/",$_POST['name']) || strlen($_POST['name'])>30){
        echo 3;
        exit();
    }
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        echo 4;
        exit();
    }
    if(!ctype_digit($_POST['phone']) || mb_strlen($_POST['phone'])>14 || mb_strlen($_POST['phone'])<6){
        echo 5;
        exit();
    }
    if(!preg_match('/^[a-zA-Z0-9]+/', $_POST['address']) || mb_strlen($_POST['address'])>40 || mb_strlen($_POST['address'])<8){
        echo 6;
        exit();
    }
    $name=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['name']));
    $phone=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['phone']));
    $email=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['email']));
    $address=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['address']));

    $sql="INSERT INTO con_tact (`name`,`phone`,`address`,`email`,`food_jsn`) VALUES (?,?,?,?,?)";
    $stmt=mysqli_stmt_init($sql_connect);
    if(!mysqli_stmt_prepare($stmt,$sql)){
        echo 0;
        exit();
    }else{
        mysqli_stmt_bind_param($stmt,"sisss",$name,$phone,$address,$email,$_POST['food']);
        mysqli_stmt_execute($stmt);
        echo 7;
        exit();
    }
function check_empty($post_var){
    if(!isset($post_var) || empty($post_var)){
        return true;
    }else{
        return false;
    }
}