import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv';
dotenv.config();

import { requestRouter } from './routers/request/index.js';

// Swagger UI
import expressJSDocSwagger from 'express-jsdoc-swagger';
import swaggerOptions from './swagger.js'




const app = express();


expressJSDocSwagger(app)(swaggerOptions);

app.use(bodyParser.json({ limit: '4mb' }))

app.use(cors({
    origin: 'https://sccon.ssi.eecc.de'
}));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }));


app.use('/api/request', requestRouter);

const port = process.env.BACKEND_PORT ? Number.parseInt(process.env.BACKEND_PORT) : 3000

app.listen(port, async () => {
    console.log(`Started API Server on port ${port}`);
});
