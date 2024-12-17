<?php
    // DEFAULT ANSWER
    $answer = array(
        "code"=>404,
        "videos"=>[]
    );

    if( !isset($_GET["id"]) ) {

        $data = file_get_contents("../data/kinder_serien.json");
        $allVideos = json_decode($data);

        for ($i=0; $i < count($allVideos->series); $i++) { 
            $answer["code"] = 200;
            array_push($answer["videos"], $allVideos->series[$i]);
        }
    }

    if( isset($_GET["id"]) && filter_var($_GET["id"], FILTER_VALIDATE_INT) !== false && $_GET["id"] > 0 ) {
        $id = $_GET["id"];

        $data = file_get_contents("../data/kinder_serien.json");
        $allVideos = json_decode($data);

        if($id <= count($allVideos->series)){
            $answer["code"] = 200;
            array_push($answer["videos"], $allVideos->series[$id - 1]);
        }
        
    }
    
    // SEND JSON
    echo json_encode($answer);
?>