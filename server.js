const express=require('express');
const fileUpload=require('express-fileupload')
const app = express();

app.use(fileUpload);

app.post('/upload',(req,res)=>{
    if(req.files==null){
        return res.status(400).json({mssg:'No File uploaded'});
    }
    const file=req.files.file;

    file.mv(`${__dirname}/Client/public/uploads/${file.name}`,err=>{
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
    })
})

app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})