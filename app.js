const express= require('express');
const app = express();
const bodyParser= require('body-parser');
const https = require('node:https');

const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post('/',function(req,res){
   const firstName= req.body.firstName;
   const lastName= req.body.lastName;
   const email= req.body.email;

   const data={
    members:[
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
   }
 const jsonData=JSON.stringify(data);
 const url="https://us9.api.mailchimp.com/3.0/lists/33fbbb7998"
 const options = {
    method:"POST",
    auth:"georgera:ff631273e249d1bde11fe9080ea37d2c-us9"
 }
const request =https.request(url,options,function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    });
});

 request.write(jsonData);
 request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || port,function(){
    console.log('server running on '+port);
});



//api key
// ff631273e249d1bde11fe9080ea37d2c-us9

//list id
//33fbbb7998