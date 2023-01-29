const app = require('./app');
const connectDatabase = require('./database')

//config
const dotenv = require('dotenv');
dotenv.config({ path: "backend/config/config.env" });

// Uncaught Rejection
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Rejection`);
    process.exit(1);
})


// Connecting to DataBase
connectDatabase();



const server = app.listen(process.env.PORT, () => {
    console.log(`This server is currently working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejections`);

    server.close(() => {
        process.exit(1);
    })
})
