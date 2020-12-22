import { createServer } from './server';

const app = createServer();

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});

// If a termination signal is send, the server will be closed
process.on('SIGTERM', () => {
    app.close();
})
