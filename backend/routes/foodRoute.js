import express from 'express';
import { addFood,listFood ,removeFood} from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//image storage Engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
       return cb(null,Date.now()+file.originalname);
    }})
    const upload = multer({storage:storage});

foodRouter.post('/add',upload.single("image"), addFood);
foodRouter.get('/list', listFood)
foodRouter.delete('/remove', removeFood); // This is the correct way to define a DELETE route












export default foodRouter;