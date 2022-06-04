import  { useReducer, useEffect, useState } from 'react';
import { projectFirestore, timestamp } from '../firebase/config';



let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}


const firestoreReducer = (state, action) => {
    switch ( action.type ) {
        case 'IS_PENDING':
            return { document: null, success: false, error: null, isPending: true }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: action.paylaod, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, error: action.payload }
        default:
             return state
    }
};


export const useFirestore = (collection) => {  // collection parameter will be given collection name for database from the component where we use hook

    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);

    // collection ref           // here we can add '.add' to the end but we want to make it reusable, so we use parameters

    const ref = projectFirestore.collection(collection)     // we pass this collection name from transaction form as string


    // only dispatch is not cancelled
    const dispatchIfNotCancelled = (action) => {        // instead of writing it many times, we can if check the dispatch function
        if (!isCancelled) {                             // and use it with different name after we already if check it
            dispatch(action);
        }
    };



    // add document
    const addDocument = async (doc) => {  // doc represents the object that we want to add to the firebase (in this case object of name and amount)
        dispatch({ type: 'IS_PENDING' });

        try {
            const createdAt = timestamp.fromDate(new Date ());          // creates a timestamp which shows when the data added to the database

            const addedDocuments = await ref.add({ ...doc, createdAt: createdAt }) // this is going to add the doc (name and amount) to the collection (database)
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocuments })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    };


    // delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const deletedDocument = await ref.doc(id).delete();

            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', paylaod: deletedDocument })

        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', paylaod: 'Could not delete' })
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])


    return { addDocument, deleteDocument, response }
};