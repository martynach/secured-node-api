import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';

import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;

//https://mongoosejs.com/docs/connections.html
// mongoose.Promise = global.Promise; legacy

var connectionString = 'mongodb://127.0.0.1:27017/CRMdb';

mongoose.connect(connectionString).then(() => console.log('Connected to CRMdb')).catch(err => {
    console.error('Error when connecting to CRMdb', err);
    console.log('************************');
    process.exit(1);
});

//bodyparser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serving static files
app.use(express.static('public'));   // GET: http://localhost:3000/shoes.jpg
app.use(express.static('images'));   // GET: http://localhost:3000/baby.jpg

app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        try {
            const user = jwt.verify(req.headers.authorization.split(' ')[1], 'some_secret');
            req.user = user;
            return next();
        } catch (error) {
            console.log('  !!! invalid token !!!');
            req.user = undefined;
            return next();
        }
    }
    req.user = undefined;
    return next();
});

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
