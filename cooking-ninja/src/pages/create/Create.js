import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
import { projectFirestore } from "../../firebase/config";
import "./Create.css";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const ingredientInput = useRef();

  const navigate = useNavigate();
  const { mode } = useTheme();

  // const { postData, data } = useFetch("http://localhost:3000/recipes", "POST");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // postData({
    //   title,
    //   ingredients,
    //   method,
    //   cookingTime: cookingTime + " minutes",
    // });
    const doc = { title, cookingTime, ingredients, method };
    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prev) => [...prev, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // redirect the user when we get data response
  // useEffect(() => {
  //   if (data) {
  //     navigate("/");
  //   }
  // }, [data, navigate]);

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>
        <p>
          current ingredient:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>
        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
