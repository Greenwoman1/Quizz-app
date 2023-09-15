import ErrorMessage from "./errormessage";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../CSS.css";
const Ques = ({
  currQues,
  setCurrQues,
  questions,
  allAns,
  correct,
  setScore,
  score,
  setQuestions,
  resetTimer,
  answeredQuestions,
  setAnsweredQuestions,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const [saveAns, setSaveAns] = useState({
    ques: questions[currQues].question,
    correctAns: questions[currQues].correct_answer,
    ans: "",
    restAnswers: [...questions[currQues].incorrect_answers],
  });

  useEffect(() => {
    setSaveAns({
      ques: questions[currQues].question,
      correctAns: questions[currQues].correct_answer,
      ans: "",
      restAnswers: [...questions[currQues].incorrect_answers],
    });
  }, [currQues]);

  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (ans) => {
    setSelected(ans);
    if (ans === correct) {
      setScore(score + 1);
    }

    setSaveAns((prevSaveAns) => ({
      ...prevSaveAns,
      ans: ans,
    }));
    setError(false);
  };

  const handleNext = () => {
    setAnsweredQuestions((ques) => [...ques, saveAns]);
    setSaveAns({
      ques: "",
      correctAns: "",
      ans: "",
      restAnswers: [],
    });
    if (currQues > 8) {
      resetTimer();
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    resetTimer();
    setCurrQues(0);
    setQuestions();
  };

  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => {
        setError(null);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  const time = true;

  return (
    <div className="question">
      <h1>Question {currQues + 1} :</h1>

      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && time && <ErrorMessage error={error}></ErrorMessage>}
          {allAns &&
            allAns.map((i) => (
              <button
                className={`singleOption  ${selected && handleSelect(i)}`}
                key={i}
                onClick={() => handleCheck(i)}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Ques;
