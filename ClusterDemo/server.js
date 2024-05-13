const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;





console.log(`totalCPUs=${totalCPUs}`);
console.log(`primary worker pid=${process.pid}`);
cluster.setupPrimary({
    exec: `./index.js`
  
});

for (let i = 0; i < totalCPUs; i++) {
    console.log(`Starting a new worker`);
    cluster.fork(); // spawn a new worker
}

cluster.on('exit', (worker, code, signal) => {
    console.log(`worker pid=${worker.process.pid} died`);
    console.log(`Starting a new worker`);
    cluster.fork();
}
);

