import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { signIn, signUp } from './controllers/auth.js';
import { connection } from './db/config.js';
import { env } from './utils/env.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', signIn);
app.post('/signup', signUp);

connection
	.sync()
	.then(() => {
		console.log('Database successfully connected');
	})
	.catch((err) => {
		console.log('Error', err);
	});

app.listen(env.PORT, () => {
	console.log(`Server started on port ${env.PORT}`);
});
