import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quizz from "./pages/Quizz";
import Result from "./pages/Result";

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    console.log(data.results);
    setQuestions(data.results);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              ></Home>
            }
          ></Route>
          <Route
            path="/quiz"
            element={
              <Quizz
                name={name}
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                answeredQuestions={answeredQuestions}
                setAnsweredQuestions={setAnsweredQuestions}
              ></Quizz>
            }
          ></Route>
          <Route
            path="/result"
            element={
              <Result
                name={name}
                score={score}
                answeredQuestions={answeredQuestions}
              ></Result>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
