import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import ContactRouter from './routes/contact';
import FileRouter from './routes/file';
import path from 'path';

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

main()
  .then((data: any) => {
    app.listen( port, () => {
      console.log( `server started at http://localhost:${ port }` );
    } );
  })
  .catch(err => console.log(err));