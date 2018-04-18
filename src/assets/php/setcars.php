<?php
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");
$connection = new mysqli("localhost", "root", "", "cars");

$output = ["status" => 0];
if (!($connection->connect_errno)) {
    $_POST = json_decode(file_get_contents("php://input"), true);
    $id = $connection->real_escape_string($_POST["id"]);
    if (isset($_POST['mode']) && ($_POST['mode'] == 'delete')) {
        $query = $connection->query("DELETE FROM cars WHERE id = " . $id);
    } else {
        $brand = $connection->real_escape_string($_POST["brand"]);
        $model = $connection->real_escape_string($_POST["model"]);
        $year = $connection->real_escape_string($_POST["year"]);
        if ($id == 0) {
            $query = $connection->query("INSERT INTO cars (brand, model, year) VALUES ('" . $brand . "', '" . $model . "', " . $year . ")");
        } else {
            $query = $connection->query("UPDATE cars SET brand = '" . $brand . "', model = '" . $model . "', year = " . $year . " WHERE id = " . $id);
        }
    }
    $output["status"] = ($query) ? 1 : 0;
    $connection->close();
}
echo json_encode($output, JSON_UNESCAPED_UNICODE);
