import {Producer} from './data_producer'
import {Consumer} from './data_consumer'
import {SocketServer, DataBuffer} from './data_buffer'


const server = new SocketServer (3000, new DataBuffer (10))
server.start (() => {
    new Consumer ("localhost", 3000, 5000, 1000)

    new Producer("localhost", 3000)

})
