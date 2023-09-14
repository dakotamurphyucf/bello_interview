import { randomInt } from 'crypto'
import { setTimeout } from 'timers';
import {Socket} from 'net'
import {  create_txn } from './data'

export class Producer {
    private client: Socket;

    constructor(host: string, port: number) {
        this.client = new Socket();
        this.client.connect(port, host, () => {
            console.log('Connected to the server');
            this.client.write('producer', (err) => {
                if (err) {
                    return console.error(err)
                }
                this.start()
            });
        });
    }
    start () {
        setTimeout(() => {
            this.sendTransaction(() => this.start ())
        }, randomInt(1, 4) * 1000)
    }


    sendTransaction(cb: () => void) {
        const transaction = create_txn()
        this.client.write(JSON.stringify(transaction), (err) => {
            if (err) {
                return console.error(err)
            }
            cb()
        });
    }
}

