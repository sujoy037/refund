const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

const db=require('./dbConfig');
require('dotenv').config();



//imnport routes
const authRoute=require('./routes/auth')
const userRoute=require('./routes/user')
const chargeRoute=require('./routes/circleChargeMastar')
const jurisdictionRoute=require('./routes/userjurisdiction')

// app
const app = express();




// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//app.use(useRoute)
app.use('/api',authRoute)
app.use('/api',userRoute)
app.use('/api',chargeRoute)
app.use('/api',jurisdictionRoute)



//routes
// app.get('/',(req,res)=>{
//     res.send('hii');
// })

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});