<?php
    $host = "localhost";
    $username = "belezi";
    $password = "Intely@1515";
    $dbname = "weather";

    header("Access-Control-Allow-Origin: *");
    header('Content-type: application/json');

    // Create connection
    $dbh = new PDO("mysql:host=" . $host . ";dbname=" . $dbname, $username,$password);

   try{
        $q = $dbh->prepare("SELECT Languages.label as LangLabel, Languages.value as LangValue,
        LanguageToLabel.value as _Value,
        Labels.labelName as LabelName
        FROM Languages
        LEFT JOIN LanguageToLabel on LanguageToLabel.languageId = Languages.id
        LEFT JOIN Labels on Labels.id = LanguageToLabel.labelId");

        $q->execute([]);
    }catch(Exception $e){
        echo $e->getMessage();
    }
    $result = $q->fetchAll(PDO::FETCH_ASSOC);

    if($result){
        $return_1['code'] = 200;
        foreach($result as $row){
            $return_1['langLabels'][$row['LangValue']][$row['LabelName']] = $row['_Value'];
            $return_1['langLabels'][$row['LangValue']]['languageLabel'] = $row['LangLabel'];
         }
    }

    try{ 
        $q = $dbh->prepare("SELECT label, value 
        FROM Units");

        $q->execute([]);
    }catch(Exception $e){
        echo $e->getMessage();
    }
    $result_2 = $q->fetchAll(PDO::FETCH_ASSOC);

    if($result_2){
        foreach($result_2 as $row){
            $return_1['unitLabels'][$row['label']] = $row['value'];
        }
    }

    try{ 
        $q = $dbh->prepare("SELECT label, value 
        FROM Times");

        $q->execute([]);
    }catch(Exception $e){
        echo $e->getMessage();
    }

    $result_3 = $q->fetchAll(PDO::FETCH_ASSOC);

    if($result_3){
        foreach($result_3 as $row){
            $return_1['hourLabels'][$row['label']] = $row['value'];
        }
    }


    if($return_1 && ($return_1['langLabels'] || $return_1['unitLabels'] || $return_1['timeLabels'])){
        $return_1['code'] = 200;
    }else{
        $return_1['code'] = 400;
        $return_1['message'] = "Could not retrieve data from the database";
    }
 
  echo json_encode($return_1);

  ?>