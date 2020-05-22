const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect("-------------")  //<--add your mongo db connect link
	.then(() => {	 //promise
		console.log('mongodb connected');
	})
	 .catch(() => {	 //handle errors if it have any(connection falire)
		console.log('connection failer');
	});

let posts= [
  {id:'awdawdawd',un:'kasun',faculty:'IT'},
  {id:'aefgsaefk',un:'tharindu',faculty:'Eng'},
  {id:'awdfgsaefk',un:'sithum',faculty:'Eng'},
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false})); //extra line

app.use((req,res,next)=> { 		//use metod needed,bcz need set headers to every request send by client
  res.setHeader("Access-Control-Allow-Origin","*");  //understood by browser,* give access to any req
  res.setHeader("Access-Control-Allow-Headers",
    "Origin,x-Requested-With,Content-Type,Accept"); //these headers may not needed
  res.setHeader("Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS" );
  next();
});

app.post("/api/posts" ,(req,res,next) =>{
  // const post = { id:"adwwadwad" , ...req.body};
  // console.log(post);


  const post = new Post(req.body);
  console.log(post);
  post.save();
  // posts.push(post);

  res.status(201).json({
    message: 'post added successfully'
  });
});

app.get("/api/posts", (req,res,next)=>{

  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message:'server working!',
      posts: documents
    });
  });

})

module.exports = app;
