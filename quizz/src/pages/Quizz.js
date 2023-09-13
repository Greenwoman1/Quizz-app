import { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Ques from "../components/quesstion";
import { useNavigate } from "react-router-dom";

const Quizz = ({name , questions, score, setScore, setQuestions, answeredQuestions, setAnsweredQuestions }) => {
    const [allAns, setAllAns] = useState();
    const [currQues, setCurrQues] = useState(0);

    const navigate = useNavigate();
    useEffect(()=>{
        setAllAns ( questions && handleShuffle([
            questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers,
          ]))

    }, [currQues, questions])

    const handleShuffle = (opt) => {
        return opt.sort(() =>  Math.random()-0.5);
    };


    
    const [timer, setTimer] = useState('00:00:00');
    const Ref = useRef();
 
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        
        return {
            total, minutes, seconds
        };
    }
 
    const startTimer = (e) => {
        let { total, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
 
       
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        else {
            clearTimer(getDeadTime());
            navigate("/result");
        }
    }
 
    const clearTimer = (e) => {
 
        setTimer('02:00');
 
  
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
 
    const getDeadTime = () => {
        let deadline = new Date();
 
  
        deadline.setSeconds(deadline.getSeconds() + 120);
        return deadline;
    }
 

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
 


    return (
        <div>

            <Header name = { name }></Header>
        

            {questions ? 
            
                (<div className="quiz">
                <div className="info">
                <span className="spanInfo">{questions[currQues].category}</span>
                <span className="timer">{timer}</span>
                <span className="spanInfo">score: {score}</span>
                </div>

                <Ques currQues={currQues}
                    setCurrQues={setCurrQues}
                    questions={questions}
                    allAns={allAns}
                    correct={questions[currQues]?.correct_answer}
                    score={score}
                    setScore={setScore}
                    setQuestions={setQuestions}
                    resetTimer = {onClickReset}
                    answeredQuestions = {answeredQuestions}
                    setAnsweredQuestions = {setAnsweredQuestions}>
                
                </Ques>
            </div>
                
) : (<h1>loading</h1>)}

            <Footer></Footer>
        </div>

    )
    
};

export default Quizz;