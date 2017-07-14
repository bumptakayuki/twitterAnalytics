<?php
require_once('./twitterAnalyse.php');

header('Content-Type: application/json');

$query = $_GET;
$data = [];
$keyword = $query['keyword'];

$twitterAnalyse = new twitterAnalyse();
$data = $twitterAnalyse->exec($keyword);

echo $_GET['callback'] . '('.json_encode($data,JSON_FORCE_OBJECT).')';

