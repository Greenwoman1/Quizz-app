import { Button, TextField, MenuItem } from "@mui/material";
import Footer from "../components/footer";
import Header from "../components/header";
import ErrorMessage from "../components/errormessage";

import { useState } from "react";
import Categories from "../Data/Categories";
import "../../src/CSS.css";
import { useNavigate } from "react-router-dom";

const Home = ({ name, fetchQuestions, setName }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div>
      <Header name={name}></Header>

      <div className="content">
        <div className="settings">
          <span style={{ fontSize: 30 }}>Please choose quiz settings !</span>
          <div className="settings__select">
            {error && (
              <ErrorMessage error={"Please Fill all the feilds"}></ErrorMessage>
            )}
            <TextField
              style={{ marginBottom: 25 }}
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              select
              label="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
