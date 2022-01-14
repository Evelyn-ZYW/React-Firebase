import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // set up a realtime listener to a firebase collection - using let because the reference might be updated in the future
    let ref = projectFirestore.collection(collection);

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
  }, [collection]);

  return { documents, error };
};
