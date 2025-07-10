import "dotenv/config"
import express, { Response } from 'express';
import userRoute from "./routes/user.route"
import authRoute from "./routes/auth.route"
import middleWares from './middlewares/test';

const port = process.env.PORT;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(middleWares.logger)

app.use('/api/v1', userRoute);
app.use('/api/v1', authRoute)

app.listen(port, () => {
  const url = `http://localhost:${port}/api/v1`;
    console.log('Server is running at:');
    console.log(`\x1b[34m${url}\x1b[0m`); // Blue color for the URL
    console.log('Click the URL above to open in your browser');
})