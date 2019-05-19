const mongoose = require ('mongoose');

const home = require('./routes/home');
const genres = require('./routes/genres');
const customers  = require('./routes/customers');
const movies = require('./routes/movies');

const express = require ('express');
const app = express();


mongoose.connect('mongodb://localhost:27017/movieDB', {  useNewUrlParser: true })
    .then(() => console.log('is Connenct to MongoDB...'))
    .catch((err) => console.log('cpuld not to connect to mongoDB...', err))



app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listen on port ${ port }...`));