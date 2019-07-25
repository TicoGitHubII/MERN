const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');

const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// Mongo Dbn Start

const dbRoute =
    'mongodb+srv://admin:8426.M0ng0.admin@alpha-xd73c.mongodb.net/test?retryWrites=true&w=majority';
// Connection
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// check conn
db.on('error', console.error.bind(console, 'MongoDBn connection error'));

// (optional) only made for logging  and 
// bodyParser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//Methods  start 

router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

//Update
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// Delete 

router.delete('/deleteData', (req, res) => {

    const { id } = req.body;

    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});


//Post create
router.post('/putData', (req, res) => {

    let data = new Data()
    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        })
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append  api   
app.use('/api', router);

// port launch
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
