import {Socket} from 'net'
import { Transaction, product } from './data'

export class Consumer {
    private client: Socket;
    private transactions: Transaction[];
   
    constructor(host: string, port: number, proccess_interval: number, poll_interval: number) {
        this.client = new Socket();
        this.transactions = [];
       
        this.client.connect(port, host, () => {
            console.log('Connected to the server');
            this.client.write('consumer', err => { if (err) console.error (err) });
        });

        this.client.on('data', (data) => {
            const transaction: Transaction = JSON.parse(data.toString());
            this.transactions.push(transaction);
        });

        // Process transactions at a set interval
        setInterval(() => {
            this.processTransactions();
        }, proccess_interval); // Adjust the interval as needed


        // Poll transactions at a set interval
        setInterval(() => {
            this.requestData();
        }, poll_interval); // Adjust the interval as needed
    }

    requestData() {
        this.client.write('request', err => { if (err) console.error (err) });
    }

    processTransactions() {
        const now = Date.now();
        const salesPerProduct: { [productId: string]: number } = {}
        const metrics = { totalTransactions: 0, totalSales: 0, salesPerProduct, salesLast5Min: 0, salesLast10Min: 0, salesLast15Min: 0 };

        while (this.transactions.length > 0) {
            const transaction = this.transactions.shift();
            if (transaction) {
                metrics.totalTransactions++;
                metrics.totalSales += transaction.amount;
                if (metrics.salesPerProduct[transaction.product]) {
                    metrics.salesPerProduct[transaction.product] += transaction.amount;
                } else {
                    metrics.salesPerProduct[transaction.product] = transaction.amount;
                }

                const minutesAgo = (now - new Date(transaction.timestamp).getTime()) / 1000 / 60;
                if (minutesAgo <= 5) {
                    metrics.salesLast5Min += transaction.amount;
                }
                if (minutesAgo <= 10) {
                    metrics.salesLast10Min += transaction.amount;
                }
                if (minutesAgo <= 15) {
                    metrics.salesLast15Min += transaction.amount;
                }
            }
        }

        console.log('Metrics:', metrics);
    }
}

