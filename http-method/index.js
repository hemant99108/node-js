const http=require('http');
const fs=require('fs');
const url=require('url');
const express=require('express');


const app=express();

app.get("/",(req,res)=>{
    return res.send("hlw from Homepage");
})

app.get("/about",(req,res)=>{
    res.send("about page refred");
})

function myHandler(req,res){

    if(req.url==='/favicon.ico') return res.end();

    const log=`${Date.now()} :${req.method} ${req.url} New req recieved \n`;

    const myUrl=url.parse('req.url',true);
    console.log(myUrl);

    fs.appendFile("log.txt",log,(err,data)=>{
        switch(myUrl.pathname){
            case '/': if(req.method==='GET') res.end("Homepage");
                break
            case '/about':
                res.end("welcome to my profile");
                const username=myUrl.query.myname;
                res.end(`HI ${username}`);
                break
            case '/search':
                const  search=myUrl.query.search_query;
                res.end("hi there your results for"+search);
            case '/signup':
                if(req.method==='GET') res.end("this is signup form");
                else if(req.method==='POST') {
                    //db query
                    res.end("post request is made");
                }
            default: 
                res.end("404 not found");
        }
    })

    console.log(req.headers);

    res.end("hello from server");

}



// const myServer=http.createServer(myHandler);
// const myServer=http.createServer(app);


// myServer.listen(8000,()=>console.log('server started'));


app.listen(8000,()=>console.log("server started successfully"));