import { Router } from 'express'
import app from "../server";


app.get("/", async (req, res) => {
    
  res.render("./index.twig")

})
app.get('/card', async (req, res) => {
  try {
    res.render('card.twig');
  
 
  } catch (error) {
    res.send(error);
  }
});