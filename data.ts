import { randomInt, randomBytes } from 'crypto'

export type product = 'apple'|'banana'|'strawberry'|'grape'|'pineapple'

export type Transaction = {
    id : string;
    amount: number;
    product: product;
    timestamp: Date
}

const products : product[] = ['apple','banana','strawberry','grape','pineapple']

const create_id = () => {
    const buff = randomBytes(256).toString('hex')
    return buff
}

const gen_amount = () => randomInt(1, 11)

const gen_product = () => products[randomInt(0, 5)]

export const create_txn = () => {

    const id = create_id ();
    const amount = gen_amount ();
    const product = gen_product ();
    const timestamp = new Date(Date.now() - Math.random() * 30 * 60 * 1000); // Random timestamp from the last 30 minutes
    return { id, amount, product, timestamp }
}