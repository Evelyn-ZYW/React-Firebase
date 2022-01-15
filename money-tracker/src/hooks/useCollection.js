import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array, and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    // set up a realtime listener to a firebase collection - using let because the reference might be updated in the future
    let ref = projectFirestore.collection(collection);
    // firestore query to fetch data for a specific user
    if (query) {
      ref = ref.where(...query);
    }
    // order the list in descending order
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    // onSnapshot function is going to fire everytime we get a snapshot back from †he firestore collection
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          // doc.data() is the function to get the data from a document. In this case, it includes uid, name, amount, createAt
          // note: the id is for each individual document; the uid is for each individual user
          results.push({ ...doc.data(), id: doc.id });
        });
        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch data");
      }
    );
    // clean up function - unsubscribe the realtime listener when the component unmounts
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
