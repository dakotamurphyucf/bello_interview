
import { createServer, Server, Socket } from 'net'
import { Transaction } from './data'


export class DataBuffer {
    private queue: Transaction[];
    private maxSize: number;

    constructor(maxSize: number) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    addTransaction(Transaction: Transaction) {
        if (this.queue.length >= this.maxSize) {
            console.log("transaction dropped: ", this.queue.shift()); // Remove the oldest transaction
        }
        this.queue.push(Transaction);
    }

    getTransaction(): Transaction | undefined {
        return this.queue.shift(); // Get the oldest transaction
    }
}

export class SocketServer {
    private server: Server;
    private port: number
    private dataBuffer: DataBuffer;
    private clients: { [id: string]: 'producer' | 'consumer' } = {};

    constructor(port: number, dataBuffer: DataBuffer) {
        this.server = createServer((socket) => {
            const id = `${socket.remoteAddress}:${socket.remotePort}`;

            socket.on('data', (data) => {
                const message = data.toString();
                if (message === 'producer' || message === 'consumer') {
                    this.clients[id] = message;
                } else if (this.clients[id] === 'producer') {
                    // Parse the incoming transaction
                    const transaction: Transaction = JSON.parse(message);
                    this.dataBuffer.addTransaction(transaction);
                } else if (this.clients[id] === 'consumer') {

                    const transaction = this.dataBuffer.getTransaction();
                    if (transaction) {
                        socket.write(JSON.stringify(transaction), err => { if (err) console.error(err) });
                    }
                }
            });

            socket.on('end', () => {
                delete this.clients[id];
            });
        });

        this.port = port
        this.dataBuffer = dataBuffer;
    }

    start(cb: () => void | null) {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
            if (cb) cb();
        });

    }
}

