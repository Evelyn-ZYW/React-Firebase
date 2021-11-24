import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import "./Recipe.css";
export default function Recipe() {
  const { mode } = useTheme();
  const { id } = useParams();

  // const {
  //   data: recipe,
  //   isPending,
  //   error,
  // } = useFetch(`http://localhost:3000/recipes/${id}`);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(false);
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setData(doc.data());
        } else {
          setIsPending(false);
          setError("could not find that recipe");
        }
      });
  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && (
        <>
          <h2 className="page-title">{data.title}</h2>
          <p>Takes {data.cookingTime} to cook.</p>
          <ul>
            <p>Ingredients:</p>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
}
