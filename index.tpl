<!DOCTYPE html>
<html lang="${lang.lang}">

<head>
    <meta charset="UTF-8">
    <title>FontEditor</title>
    <link rel="shortcut icon" href="dep/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="./dep/bootstrap/css/bootstrap.min.css">
</head>

<body>
    <!-- 根节点 -->
    <div id="root"></div>

    <!-- dev -->
    <!-- <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->
    <!-- prod -->
    <!-- <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script> -->
    <script src="./dep/jquery.min.js"></script>
    <script src="./dep/jqColorPicker.min.js"></script>
    <script src="./dep/bootstrap/js/bootstrap.min.js"></script>
    <script src="./dep/hidpi-canvas.js"></script>
    <script>
        window.language = '${lang.lang}';
    </script>

    <script>
        var _hmt = _hmt || [];
        /baidu.com$/.test(location.hostname) && (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?65ce30cdeda584c416e39648915689f7";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</body>

</html>