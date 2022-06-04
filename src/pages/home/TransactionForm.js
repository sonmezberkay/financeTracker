import { useState } from 'react';

import { useFirestore } from '../../hooks/useFirestore';


const TransactionForm = ({uid}) => {     // we get the uid from home page from useAuthContext, which is a different ID for every user

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const { addDocument, response } = useFirestore('transactions'); // this string will replace the collection parameter in the useFirestore hook

    const submitHandler = (e) => {
        e.preventDefault();

        addDocument({ uid: uid, name, amount })        // this object will replace the 'doc' parameter in the useFirestore hook
        if (response.success) {                                   // 'uid' is for displaying different content on the page for every different user 
        setName('');
        setAmount('');
    }};                                            
        

    return (
        <div>
            <h3>Add an Expense</h3>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Transaction name:</span>
                    <input type='text' required onChange={e => setName(e.target.value)} value={name} />
                </label>
                <label>
                    <span>Amount (€):</span>
                    <input type='number' required onChange={e => setAmount(e.target.value)} value={amount} />
                </label>
                <button className='btn'>Add Transaction</button>
            </form>
        </div>
    )
};

export default TransactionForm;