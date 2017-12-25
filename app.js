const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
var express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');

var app = express();


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname,'public')));
app.get('/',function(req,res){
    res.render('index');
});

app.get('/about',function(req,res){
    res.render('about');
});
app.get('/contact',function(req,res){
    res.render('contact');
});
app.post('/contact/send',function(req,res){
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'<your mail id>',
            pass:'<your password>'
        }
    });
    
    var mailOptions = {
        
        from:'<name> <your mail id>',
        to:'<Sender mail>',
        subject:'example',
        text:'name : '+req.body.name+'Email: '+req.body.email+'message :'+req.body.message,
        html:'name : '+req.body.name +'Email: '+req.body.email+ 'message :'+req.body.message,
    };
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            res.redirect('/');
        } else{
            console.log('message sent: '+info.response);
            res.redirect('/');
        }
    });
    
});

app.listen(3000);
console.log('server is up at port 3000');