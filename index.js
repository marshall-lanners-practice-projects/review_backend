require('dotenv').config()

const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

const userRoutes = require('./Routes/usersRoutes')

server.use('/users', userRoutes)

const port = process.env.PORT

server.listen(port, () => console.log(`server running on port ${port}`));