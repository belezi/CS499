<?php
    include 'config.php';

    header('Content-type: application/json');

    // Create connection
    $conn = new mysqli($host, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        echo json_encode("Connection failed: " . $conn->connect_error);
        die("Connection failed: " . $conn->connect_error);
        return;
    } 
    
    $sql = "SELECT Languages.label as LangLabel, Languages.value as LangValue,
        LanguageToLabel.value as _Value,
        Labels.labelName as LabelName
    FROM Languages
    LEFT JOIN LanguageToLabel on LanguageToLabel.languageId = Languages.id
    LEFT JOIN Labels on Labels.id = LanguageToLabel.labelId";

    $result = mysqli_query($conn, $sql);
    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
    if($data){
        $return['code'] = 200;
        foreach($data as $row){
            $return['langLabels'][$row['LangValue']][$row['LabelName']] = $row['_Value'];
        }
    }else{
        $return['code'] = 400;
        $return['message'] = "Could not retrieve data from the database";
    }
    
    echo json_encode($return) . "\n";

    $conn->close();
?>
