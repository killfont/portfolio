import express from 'express';
import mongoose from 'mongoose';
import UserModel from "./models/user.js";
import ProjectModel from "./models/projets.js";
import session from 'express-session';
import "dotenv/config";
import multer from 'multer';
import { createTestAccount, createTransport, getTestMessageUrl } from "nodemailer";


const app = express()
const db = process.env.BDD_URL

const storage = multer.diskStorage({
  // destination pour le fichier
  destination:function(req,file,callback){
    callback(null,'./assets/uploads/images' )
  },
  //ajouter le retour de l'extension
  filename:function (req,file,callback) {
    callback(null,Date.now() + file.originalname)
  },
})
const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
})

app.use(session({ secret: process.env.SECRET_KEY, saveUninitialized: true, resave: true }))
app.use(express.static('./assets'))
app.use(express.urlencoded({ extended: true }))

app.post('/home', async (req, res) => {
  console.log(req.body);

  const transporter = createTransport({
      service: 'gmail',
      auth: {
          user: 'fonsat.nodemailer@gmail.com',
          pass: 'dlclhbrybfcawlgi'
      }
  })

  const mailOptions = {
      from: req.body.mail,
      to: 'Kaizell@outlook.fr',
      subject: req.body.message,
  }

  transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
          console.log(error);
          res.send('error')
      }else{
          console.log('Email sent: '+info.res);
          res.redirect('/home')
      }
  })

 });  
app.listen(process.env.PORT, function (err) {
  if (err) {
      console.log(err);
  } else {
      console.log(`connected to ${process.env.APP_URL}`);
  }
})


mongoose.connect(db, (err) => {
  if (err) {
      console.log(err);
  } else {
      console.log("connected to database mongodb (c'est dur....)");
  }
})


app.get( '/', async (req, res) => {
    
  res.render('intro.twig')

})
app.get('/home', async (req, res) => {
  let user = await UserModel.findOne({_id: req.session.user})

    try {
      res.render('index.twig',{
        user:user
      });
    
   
    } catch (error) {
      res.send(error);
    }
  });

  app.get('/card', async (req, res) => {
    console.log("ejdqjodjo");
    let projects = await ProjectModel.find()
    console.log(projects);
    try {
      res.render('card.twig',{
        projects:projects
      });
    
   
    } catch (error) {
      res.send(error);
    }
  });
  app.get('/login', async (req, res) => {
    try {
      res.render('login.twig');
    
   
    } catch (error) {
      res.send(error);
    }
  });
  app.get('/addProject', async (req, res) => {
    try {
      res.render('project.twig');
    
   
    } catch (error) {
      res.send(error);
    }
  });

  app.post('/login', async (req, res)=> {
    let user = UserModel.findOne({password: req.body.password}, (err,user)=>{
        if (user) {
          req.session.user = user._id
          res.redirect('/home')
        }
    })
  })

  app.get('/logout', function(req, res) {
    req.session.destroy()
   res.redirect('/home');
  });
  app.post('/addProject',upload.single('image'), async (req, res) => {
    try {
      req.body.image = req.file.filename;
      const newUser = new ProjectModel(req.body)
      await newUser.save()
      res.redirect('/card')
    } catch (error) {
      console.log(error);
    }
  });