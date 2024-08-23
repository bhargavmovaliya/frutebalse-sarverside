1. Produce name and cities of all customers with the same rating as Hoffman.

            SELECT CNAME, CITY FROM customer WHERE RATING = (SELECT RATING FROM customer WHERE CNAME = 'Hoffman');

2.  Produce the names and rating of all customers who have above average orders.
        SELECT orders.ONUM, customer.CNAME, customer.RATING
        FROM customer
        INNER JOIN orders
        ON orders.CNUM = customer.CNUM WHERE orders.AMT > (
  SELECT AVG(AMT)FROM orders);

3. All orders that are greater than the average for Oct. 4
SELECT * FROM orders WHERE amt > (
  SELECT AVG(amt) FROM orders WHERE odate = '1994-03-10'
);
4. Find all customers whose cnum is 1000 above the snum of serres.

  SELECT *
  FROM customer 
WHERE cnum > (SELECT snum + 1000 FROM salespeople WHERE sname = 'Serres');

5. Count the customers with rating above San Jose’s average.

  SELECT * FROM customer WHERE rating > (SELECT AVG(rating) FROM customer WHERE city =
    'San Jose');

6. Find name and number of salespeople who have more than or a customer.

SELECT sname, snum
FROM salespeople
WHERE snum IN(
  SELECT snum
  FROM customer
  GROUP BY snum
  HAVING COUNT(cnum) > 1
);
7. Find total amount in orders for each salesperson for whom this total is greater than the amount of the largest order in the order table.

SELECT s.SNAME, SUM(o.AMT) AS total_amount
FROM salespeople s
JOIN orders o ON s.SNUM = o.SNUM
GROUP BY s.SNAME
HAVING SUM(o.AMT) > (SELECT MAX(AMT) FROM orders);

8. All orders credited to the same salesperson who services Hoffman.   

SELECT * FROM orders WHERE SNUM  IN  (
  SELECT SNUM FROM customer WHERE CNAME='Hoffman' 
  )                        
9. Find the sums of the amounts from order table grouped by date, eliminating all those dates where the sum was not at least 2000 above the maximum amount.
SELECT ODATE,
SUM(AMT) AS total 
FROM orders 
GROUP BY ODATE
HAVING SUM(AMT)>(
    SELECT MAX(AMT)+2000 FROM orders
);
10. Find salespeople number, name, and city who have multiple customers. 
               