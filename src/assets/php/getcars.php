<?php
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
$connection = new mysqli("localhost", "root", "", "cars");

$output = [];

if (!($connection->connect_errno)) {
    if(isset($_GET["id"])) {
        $id = $connection->real_escape_string($_GET["id"]);
        $query = $connection->query("SELECT * FROM cars WHERE id = ". $id);
        if ($row = $query->fetch_assoc()){
            $output = ["id" => $row["id"], "brand"=>$row["brand"], "model"=>$row["model"], "year"=>$row["year"]];
        }
    }else{
        $query = $connection->query("SELECT * FROM cars ORDER BY id");
        while ($row = $query->fetch_assoc()) {
            $output[] = ["id" => $row["id"], "brand" => $row["brand"], "model" => $row["model"], "year" => $row["year"]];
        }

    }
}

$query->close();
$connection->close();

echo json_encode($output, JSON_UNESCAPED_UNICODE);
