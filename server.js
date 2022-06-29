import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import 'express-async-errors';
import morgan from 'morgan';
import xss from 'xss-clean';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

// db and authenticateUser
import mongoConnect from './db/connect.js';

// routes
import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';

// midleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';
import auth from './middleware/auth.js';

// When deploy
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
}));
app.use(mongoSanitize());
app.use(xss());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// when deploy
let __dirname = dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.resolve(__dirname, './client/build')))

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/products', auth, productsRoutes)

app.use(notFoundMiddleware);
app.use(errorHandler);

// only when ready to deploy
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

const port = process.env.PORT || 5000;

mongoConnect(process.env.MONGO_URL)
    .then(result => {
        app.listen(port, () => {
            console.log('Server listening on port ' + port)
        })
    })
    .catch(err => console.log(err))