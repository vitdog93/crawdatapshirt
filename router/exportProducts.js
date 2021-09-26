import  express  from "express";
import bodyParser from "body-parser";
import { getProducts } from "../productdetail.js";
import path from "path"; 

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const routerExport = express.Router();

routerExport.get('/', (req, res) => {
    res.render('index');
});

routerExport.post('/',urlencodedParser, async(req, res , next) => {
    try{
        // const productsUrls = req.body.productUrls;
        // console.log(productsUrls);
        // const filename = await getProducts(productsUrls);
        const filename = await getProducts(["https://piaceshirt.com/3d-shirt-n94-1"]);
        // "https://piaceshirt.com/3d-shirt-n94-1"
        res.json({status: true, filename: filename});
        // const __dirname = path.resolve();
        // const file = `${__dirname}/${filename}`;
        // res.download(file); // Set disposition and send it.
    }catch(error){
        return next(error);
    }
});

routerExport.get('/download/:name',(req, res) => { 
    const filename = req.params.name ;
    const __dirname = path.resolve();
    const file = `${__dirname}/${filename}`;
    res.download(file); // Set disposition and send it.
    // res.send('ok');
});

export default routerExport;