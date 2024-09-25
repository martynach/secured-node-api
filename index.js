import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

//https://mongoosejs.com/docs/connections.html
// mongoose.Promise = global.Promise; legacy

var connectionString = 'mongodb://127.0.0.1:27017/CRMdb';
mongoose.connect(connectionString);

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serving static files
app.use(express.static('public'));   // GET: http://localhost:3000/shoes.jpg
app.use(express.static('images'));   // GET: http://localhost:3000/baby.jpg

routes(app);

    app.get("/", (req, res, next) => {

        // middleware
        console.log(`Request from ${req.originalUrl}`);
        console.log(`Request type ${req.method}`);
        next();
    }, (req, res, next) => {
        res.send(`Node and express server listening on ${PORT}`);

    })



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
