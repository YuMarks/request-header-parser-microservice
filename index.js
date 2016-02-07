var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var requestIp = require('request-ip');
var info = {ipaddress: "", language: "", software: ""};
app.use(requestIp.mw());

app.use(function(req, res){
    var prefLang = req.headers["accept-language"];
    var userAgent = req.headers["user-agent"];
    var userAgentResult = userAgent.split("(" && ")");
    var userAgentResult1 = userAgentResult[0];
    var userAgentResult2 = userAgentResult1.split("(");
    var ip = req.clientIp;
    info.ipaddress = ip;
    info.language = prefLang.split(",")[0];
    info.software =  userAgentResult2[1];
    var html = "<p>" + JSON.stringify(info) + "</p>";
    res.end(html);
});
app.listen(port);