

const cluster        = require('cluster');
const available_cpus = require('os').cpus().length;
const server          = require('./server');

const app_init = () => {
    
    if ( ! cluster.isMaster) {
        server.start();
        return false;
    }

    console.log(`Master ${process.pid} is running`);
    console.log(`=================================`);

    // Fork workers.
    for (let i = 0; i < available_cpus; i++) {
        cluster.fork();
    }

    // In case unexpected error happens - notify in console
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}

app_init();