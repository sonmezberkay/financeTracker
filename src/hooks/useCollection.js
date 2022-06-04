import { useEffect, useState, useRef } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    const query = useRef(_query).current; // we put the '_query' array in a useRef and make it equal to a constant, so it won't be recreated every time
    // so it won't cause an infinite loop

    const orderBy = useRef(_orderBy).current;

    useEffect(() => {
        let ref = projectFirestore.collection(collection)   // if we add a new collection, onSnapshot fires a function and displays that new one too

        if (query) {
            ref = ref.where(...query);   // we use a 'where' prop to use 'uid' as query to only display where the user's uid and document's uid are equal
        }                   // with spread operator, we pass 3 string from Home component in this 'where'

        if (orderBy) {
            ref = ref.orderBy(...orderBy)       // this will order the added documents by the info in this array that we passed in
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {  // onSnapshot fires a function for us every time we get a snapshot from firestore collection
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })            // data is a function and property of doc, it contains {name, amound, uid}
            })                                 // 'doc.id' is not the same thing as 'uid', it is just the id of every document

            // update documents
            setDocuments(results);
            setError(null);

        }, (error) => {         // when we use onSnapshot we don't use catch block, instead it takes second argument which is error function here
            console.log(error)
            setError('could not fetch the data')
        })                                
        
        
        return () => unsubscribe();         // if we move away from the page, this stops updating the page

    }, [collection, query, orderBy])


    return { documents, error }
};