import { Router } from 'express'
import app from "../server";
import ProjectModel from "../models/projets";


app.get("/", async (req, res) => {
    
  res.render("./index.twig")

})
