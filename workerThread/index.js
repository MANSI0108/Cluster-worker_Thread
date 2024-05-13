
const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const port = 4000;

app.get('/non-block', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/block', (req, res) => {


    const worker = new Worker('./worker.js');

    worker.on('message', (message) => {
        res.send(`Count: ${message.count}`);
    }
    );

    worker.on('error', (error) => {
        console.error(error);

    }
    );
}
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
