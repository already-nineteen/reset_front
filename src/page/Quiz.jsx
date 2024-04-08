import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import quizData from "../mocks/quizData.json";
import CopyToClipboard from "react-copy-to-clipboard";

const link = "http://localhost:3000/quiz";

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  // 체크박스 상태를 관리하기 위한 상태 추가
  const [checkedState, setCheckedState] = useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    // 체크박스 상태 초기화
    setCheckedState(false);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Layout>
      <div className="h-full flex flex-col items-center text-gray-800">
        {!quizStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex space-x-8 mb-8 bg-blue-800 ">
              <p className="text-2xl font-semibold mb-4 b-4 bg-yellow-800">
                QUIZ!
              </p>
              <div className="flex flex-col space-y-8 mb-8 bg-blue-800 ">
                <span className="text-lg font-semibold">
                  #화재_시_대처법 #소화기_사용법 #돌발_상황
                </span>
                <span className="text-lg font-semibold">
                  일상에서 꼭 필요한 소방 안전 지식! 얼마나 알고 있는지 퀴즈를
                  풀어 봐요.
                </span>
              </div>
            </div>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setQuizStarted(true)}
            >
              퀴즈 풀러가기
            </button>
          </div>
        ) : showScore ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="score-section text-lg font-semibold">
              점수는요..
              <p className="text-7xl">
                <span className="text-green-500">{score}</span>점
              </p>
            </div>
            <CopyToClipboard
              text={link}
              onCopy={() => alert("링크가 클립보드에 복사되었습니다!")}
            >
              <button className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                공유하기
              </button>
            </CopyToClipboard>
          </div>
        ) : (
          <div className="question-section pt-40 px-4 mb-8 w-96 flex flex-col gap-8">
            <div className="question-count mb-2">
              <span className="text-xl font-bold">
                문항 {currentQuestion + 1}
              </span>
              /{quizData.length}
            </div>
            <div className="question-text text-lg font-medium">
              {quizData[currentQuestion].question}
            </div>
            <div className="answer-section">
              {quizData[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500 checked:border-transparent focus:outline-none"
                    checked={checkedState}
                    onChange={() =>
                      handleAnswerOptionClick(
                        option === quizData[currentQuestion].answer
                      )
                    }
                  />
                  <label className="ml-2 text-md font-medium">{option}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;
