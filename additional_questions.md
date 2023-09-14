### How would you optimize these queries? 
1.
    SELECT t.*, b.balance
    FROM transfers t
    JOIN balance b ON t."toAddress" = b.walletAddress
    WHERE b.balance > 1000
    AND t.contractAddress = 'some_contract_address';
2.
    SELECT DISTINCT "toAddress", contract_address
    FROM transfers
    WHERE contract_address IN ('address1', 'address2', 'address3');

### 1
For the first query, you can optimize it by creating indexes on the columns used in the JOIN and WHERE clauses. This will speed up the search process. Also, if you don't need all columns from the transfers table, specify only the ones you need instead of using "*". Here's how you can do it:

```sql
CREATE INDEX idx_transfers_toAddress ON transfers(toAddress);
CREATE INDEX idx_balance_walletAddress ON balance(walletAddress);
CREATE INDEX idx_balance_balance ON balance(balance);
CREATE INDEX idx_transfers_contractAddress ON transfers(contractAddress);

SELECT t.column1, t.column2, ..., b.balance
FROM transfers t
JOIN balance b ON t."toAddress" = b.walletAddress
WHERE b.balance > 1000
AND t.contractAddress = 'some_contract_address';
```

Also for the first query, if the balance table is significantly larger than the transfers table, you might want to filter it down before the join:

```sql
SELECT t.column1, t.column2, ..., b.balance
FROM transfers t
JOIN (
    SELECT * 
    FROM balance 
    WHERE balance > 1000
) b ON t."toAddress" = b.walletAddress
WHERE t.contractAddress = 'some_contract_address';
```

### 2
For the second query, you can create an index on the contract_address column to speed up the search process. Also, using UNION can be faster than IN for larger datasets. Here's how you can do it:

```sql
CREATE INDEX idx_transfers_contract_address ON transfers(contract_address);

SELECT DISTINCT "toAddress", contract_address
FROM transfers
WHERE contract_address = 'address1'
UNION
SELECT DISTINCT "toAddress", contract_address
FROM transfers
WHERE contract_address = 'address2'
UNION
SELECT DISTINCT "toAddress", contract_address
FROM transfers
WHERE contract_address = 'address3';
```
note while indexes can speed up queries, they also slow down write operations and take up disk space.

Also, if the number of distinct contract addresses is small compared to the size of the transfers table, you might want to filter the transfers table first and then apply DISTINCT:

```sql
SELECT DISTINCT "toAddress", contract_address
FROM (
    SELECT *
    FROM transfers
    WHERE contract_address IN ('address1', 'address2', 'address3')
) t;
```