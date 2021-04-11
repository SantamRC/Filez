const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose  = require("mongoose");
var Binary = require('mongodb').Binary;
const parser=require('body-parser')
const app = express();
const cors=require('cors')
const PORT = 5000;
require("./model")
require('dotenv').config()
const File = mongoose.model("file");
const router = express.Router();

//app.use(express.static(path.join(__dirname, "./public/")));
app.use(cors())
app.use(router);
app.use(parser.urlencoded({extended:true}))

const storage = multer.diskStorage({
   destination: "/public/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: multer.diskStorage({
     destination(req, file, cb) {
       cb(null, './files');
     },
     filename(req, file, cb) {
       cb(null, `${new Date().getTime()}_${file.originalname}`);
     }
   }),
   limits: {
     fileSize: 1000000 // max file size 1MB = 1000000 bytes
   },
   fileFilter(req, file, cb) {
     if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
       return cb(
         new Error(
           'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
         )
       );
     }
     cb(undefined, true); // continue with upload
   }
 });

const obj =(req,res) => {
   const image=req.files;
   console.log(req.files)
   if(!image){
      console.log('File upload error')
   }
   res.send('hello')
   // upload(req, res, () => {
   //    console.log("Request ---", req.body);
   //    console.log("Request file ---", req.file);//Here you get file.
   //    const file = new File();
   //    file.meta_data = req.file;
   //    file.save().then(()=>{
   //    res.send({message:"uploaded successfully"})
   //    })
   //    /*Now do where ever you want to do*/
   // });
}

//router.post("/upload", obj);

router.post(
   '/upload',
   upload.single('file'),
   async (req, res) => {
     try {
       const { title, description } = req.body;
      // const { path, mimetype } = req.file;
       const file = new File({
         title,
         description,
         file_path: 'path',
         file_mimetype: 'mimetype'
       });
       await file.save();
       res.send('file uploaded successfully.');
     } catch (error) {
       res.status(400).send('Error while uploading file. Try again later.'+ error);
     }
   },
   (error, req, res, next) => {
     if (error) {
       res.status(500).send(error.message);
     }
   }
 );
 



app.get("/",(req,res)=>{
   return res.send("<p>hello!</p>");
});

app.get('/get',(req,res)=>{
    const itemId=req.params.id;
    const item = File.find({id:itemId},(err,res)=>{
        if(err){  
            console.log(err)  
        }   
        else{  
           var path= __dirname+'/public/'+data[0].meta_data;  
           res.download(path);  
        }  
    });

})

mongoose.connect('mongodb://localhost:27017/Images',{
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
}).then(()=>{console.log("DB is connected")})

app.listen(PORT,()=>{
   console.log("App listen on port",PORT)
});