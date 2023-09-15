import Footer from "../components/footer";
import Header from "../components/header";
import "../CSS.css";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const Result = ({ name, score, answeredQuestions }) => {
  useEffect(() => {
    console.log(answeredQuestions);
  }, []);

  return (
    <div>
      <Header name={name}></Header>

      <div className="result" style={{ margin: "100px" }}>
        <h1>Your score was {score}</h1>
        <h3>Thank you for playing!</h3>

        {answeredQuestions &&
          answeredQuestions.map((ques) => (
            <Card key={ques.ques} className="options" variant="outlined">
              <CardContent
                className="card-content"
                style={{
                  width: "80%",
                }}
              >
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Question:</strong>
                      </td>
                      <td>{ques.ques}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Your answer:</strong>
                      </td>
                      <td
                        className={
                          ques.ans === ques.correctAns ? "select" : "wrong"
                        }
                      >
                        {ques.ans}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Correct answer:</strong>
                      </td>
                      <td>{ques.correctAns}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Rest Answers:</strong>
                      </td>
                      <td>
                        <ul>
                          {ques.restAnswers.map((i) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Result;
