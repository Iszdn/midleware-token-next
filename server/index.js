import express, { json } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
const app = express();
app.use(fileUpload());
const port=3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const __dirname=path.resolve()

app.get('/',(req,res)=>{
  res.send('')
})




app.post('/upload', async (req, res)=> {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  const myFiles = Object.keys(req.files)
  myFiles.forEach(x=>{
    sampleFile = req.files[x];
    uploadPath = path.join(__dirname ,'src' , 'public' ,sampleFile.name)
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err); 
    });
  })
  res.send('File uploaded!');

});
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file


  // Use the mv() method to place the file somewhere on your server
 


app.listen(port, ()=>{
  console.log("server listened");
})