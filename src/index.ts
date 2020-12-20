import { createServer } from './server';

const app = createServer();

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});

process.on('SIGTERM', () => {
    app.close();
})
