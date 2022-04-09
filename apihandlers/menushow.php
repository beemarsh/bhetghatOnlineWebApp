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
    if(isset($_POST['showall']) && !empty($_POST['showall']) && mysqli_real_escape_string($sql_connect,intval($_POST['showall'])==1)){//If to show all
        $empArray=[];
        $query="SELECT * FROM menu";
        $query_store=mysqli_query($sql_connect,$query);        
        while($data=mysqli_fetch_assoc($query_store)){
            $objmy=new stdClass();
            $objmy->food=$data['food'];
            $objmy->price=$data['price'];
            $objmy->know=$data['available'];
            $objmy->detail=$data['detail'];
            array_push($empArray,$objmy);
    }
    echo json_encode($empArray);
    exit();
    }
    if(isset($_POST['min']) && !empty($_POST['min'])){
            $min=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['min']));
            if(is_numeric($min)==false){
                echo 0;
                exit();
            }

        }
        
    if(isset($_POST['max']) && !empty($_POST['max'])){
        $max=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['max']));
        if(is_numeric($max)==false){
            echo 0;
            exit();
        }
    }
    if(isset($_POST['search'])){
        $search=htmlspecialchars(mysqli_real_escape_string($sql_connect,$_POST['search']));
        str_replace("'","",$search); 
    }
    if(isset($max) && isset($min) && isset($search)){
        if($search==""){
            $sql_query="SELECT * FROM menu WHERE price >= $min AND price <=$max";
            $sql_query_store=mysqli_query($sql_connect,$sql_query);
            $num_rows=mysqli_num_rows($sql_query_store);
            if($num_rows==0){
                echo 0;
                exit();
            }
            $empArray=[];
            while($data=mysqli_fetch_assoc($sql_query_store)){
                $objmy=new stdClass();
                $objmy->food=$data['food'];
                $objmy->price=$data['price'];
                $objmy->know=$data['available'];
                $objmy->detail=$data['detail'];
                array_push($empArray,$objmy);
        }
        echo json_encode($empArray);
        exit();
        }else{
            $search=stripslashes($search);
            $sql_query="SELECT * FROM menu WHERE price >= 50 AND price <=1200 AND food like '$search%' OR food like '%$search' OR food like '%$search%'";
            $sql_query_store=mysqli_query($sql_connect,$sql_query);
            $num_rows=mysqli_num_rows($sql_query_store);
            if($num_rows==0){
                echo 0;
                exit();
            }
            $empArray=[];
            while($data=mysqli_fetch_assoc($sql_query_store)){
                $objmy=new stdClass();
                $objmy->food=$data['food'];
                $objmy->price=$data['price'];
                $objmy->know=$data['available'];
                $objmy->detail=$data['detail'];
                array_push($empArray,$objmy);
        }
        echo json_encode($empArray);
        exit();
        }
    }