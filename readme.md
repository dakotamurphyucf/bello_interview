# **Technical Coding Challenge: Data Pipeline**

In this more challenging coding challenge, you'll be tasked with building a simple real-time data pipeline simulator using TypeScript and Node.js.

### Problem Description:

You'll simulate a real-time data pipeline that consists of three main components:

1. **Data Producer**: Generates random sales transactions at a set interval.
2. **Data Buffer**: Acts as a buffer (queue) that stores the incoming transactions temporarily.
3. **Data Consumer**: Pulls transactions from the buffer, processes the data to calculate real-time metrics, and logs those metrics.

### Requirements:

### Data Producer:

1. Generates a random sales transaction every 1-3 seconds. Each transaction should have a unique `id`, `product`, and `amount`.
    1. product types are randomly 
        1. `['apple','banana','strawberry','grape','pineapple']`
    2. amounts are constraint from 1 to 10

### Data Buffer:

1. Stores incoming transactions from the Data Producer in a queue (FIFO).
2. Should have a maximum size and drop the oldest transactions if the buffer is full.

### Data Consumer:

1. Processes transactions from the Data Buffer at a set interval.
2. Calculates and logs metrics such as the total number of transactions processed, total sales, and total sales per product.

### Main Program:

1. Creates instances of the Data Producer, Data Buffer, and Data Consumer.
2. Manages the interactions between these components.
3. Logs any errors or dropped transactions.

### Constraints:

- Use native TypeScript/Node.js features and data structures. You can use `setTimeout` or `setInterval` for time-based operations.
- Make the Data Buffer size and processing intervals configurable.
- Implement proper error handling.
- Your code should be clean, modular, use classes where possible, and well-commented.

### Bonus:

1. Make the Data Producer emit transactions with random timestamps from the last 30 minutes, and have the Data Consumer calculate time-based metrics (e.g., sales in the last 5, 10, 15 minutes).
2. Implement unit tests for your components.

You can choose to implement this in a single TypeScript file or break it down into multiple files/classes/modules as you see fit. 

### Additional Questions**: Query Optimization**

How would you optimize these queries? Answer when you turn in your assignment via email

```sql
1.
SELECT t.*, b.balance
FROM transfers t
JOIN balance b ON t."toAddress" = b.walletAddress
WHERE b.balance > 1000
AND t.contractAddress = 'some_contract_address';
```

```sql
2.
SELECT DISTINCT "toAddress", contract_address
FROM transfers
WHERE contract_address IN ('address1', 'address2', 'address3');
```

### **Submission Guidelines:**

Please submit your Github link and answers to the questions to **[ellie@bello.lol](mailto:ellie@bello.lol)**. Good luck!  Feel free to ask questions or seek clarifications.