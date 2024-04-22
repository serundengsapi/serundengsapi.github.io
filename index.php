<?php

if ($_SERVER['REQUEST_METHOD'] == 'HEAD') {
    header("Content-Type: image/png");
    exit;
}

header("Location: https://sudistark.github.io/evilsvgfile.svg");

?>
