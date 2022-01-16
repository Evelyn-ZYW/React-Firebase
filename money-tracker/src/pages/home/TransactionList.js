import React from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import styles from "./Home.module.css";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");
  return (
    <ul className={styles.transactions}>
      <h3>My Transactions</h3>
      {transactions.length ? transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={() => deleteDocument(transaction.id)}>X</button>
        </li>
      )):<p className={styles.nothing}>😯Empty...try add a transaction!</p>}
    </ul>
  );
}
