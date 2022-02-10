import ContactRouter from './routes/contact';
import FileRouter from './routes/file';
import AuthRouter from './routes/auth';
import path from 'path';


const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = 8080;

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin123@cluster0.a6vrg.mongodb.net/study-database');
}

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/contacts', ContactRouter);
app.use('/api/file', FileRouter);
app.use('/api/auth', AuthRouter);

main()
  .then((data: any) => {
    app.listen(process.env.PORT || port, () => {
      console.log( `server started at http://localhost:${ port }` );
    } );
  })
  .catch(err => console.log(err));