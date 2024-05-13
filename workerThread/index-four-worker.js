
const express = require('express');
const { Worker } = require('worker_threads');
const app = express();
const port = 3000;
const THREAD_COUNT = 4;



app.get('/non-block', (req, res) => {
    res.send('Hello World!');
}
);

async function createWorker() {

    return new Promise((resolve, reject) => {
        const worker = new Worker('./four-worker.js', { workerData: { thread_count: THREAD_COUNT } });
        worker.on('message', (message) => {
            resolve(message.count);


        }
        );
        worker.on('error', (error) => {
            reject(error);

        }
        );
    }
    );
}
app.get('/block', async (req, res) => {

    const workerPromises = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());



    }
    const results = await Promise.all(workerPromises);
    const total = results[0] + results[1] + results[2] + results[3];
    res.send(`TotalCount: ${total}`);

}

);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);
