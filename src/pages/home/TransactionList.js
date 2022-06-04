import classes from './Home.module.css';

import { useFirestore } from '../../hooks/useFirestore';


const TransactionList = ({ transactions }) => {

    const { deleteDocument, response } = useFirestore('transactions');
    // we need to pass the id of the item we want to delete to the deleteDocument function

    console.log(response);

    return (
        <ul className={classes.transactions}>
            {transactions.map(transaction => (
                <li key={transaction.id}>
                    <p className={classes.name}>{transaction.name}</p>
                    <p className={classes.amount}>€{transaction.amount}</p>
                    <button onClick={() => deleteDocument(transaction.id)}>x</button>
                </li>
            ))}
        </ul>
    )
};

export default TransactionList;