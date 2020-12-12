import * as express from 'express';

const app = express();

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});
