var express = require('express')
var path = require('path');
var app = express()
var httpProxy = require('http-proxy')
var cors = require('cors')
var proxy = httpProxy.createProxyServer()
 
var IDENTITY_SERVER_URL = 'https://indoauthuat.lolc.com';
var MIDDLEWARE_BASE_URL = 'https://apiuatindo.lolc.com';
 
app.use(cors());
 
app.disable('x-powered-by');
 
app.use(function (req, res, next) {
    res.setHeader("content-security-policy", "upgrade-insecure-requests; frame-ancestors 'self' https://apiuatindo.lolc.com/indo-digital-loan");
    res.setHeader("strict-transport-security", "max-age=31536000");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("x-frame-options", "SAMEORIGIN");
    res.setHeader("x-xss-protection", "1; mode=block");
    return next();
});
 
app.use(express.static(path.join(__dirname, 'dist')));
 
app.use('/indo-digital-loan/robots.txt', function (req, res, next) {
    res.redirect(`${MIDDLEWARE_BASE_URL}/indo-digital-loan`);
});
 
app.all("/indo-digital-loan/token", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;
 
    proxy.web(req, res, { target: MIDDLEWARE_BASE_URL, secure: false, changeOrigin: true })
});
 
app.all("/indo-digital-loan/mobixCamsCommon*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;
 
    proxy.web(req, res, { target: MIDDLEWARE_BASE_URL, secure: false, changeOrigin: true })
});
 
app.all("/indo-digital-loan/oauth2*", function (req, res) {
    var url = req.url;
    url = url.slice(21);
    req.url = url;
 
    proxy.web(req, res, { target: IDENTITY_SERVER_URL, secure: false, changeOrigin: true })
});
 
app.get('/indo-digital-loan/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
 
app.get('/indo-digital-loan/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
 
app.listen(3000);
