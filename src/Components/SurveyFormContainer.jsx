import React from "react";
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAnswerChangeAC, onSubmitQuestionAC, getQListThunkCreator, sendAnswersThunkCreator } from './../redux/app-reducer.js';
import c from './../App.module.css';
import DateInput from "./Inputs/DatePicker.jsx";

const manageStorageonFinishSurvey = () => {
  localStorage.setItem('passingSurveyDate', new Date());
  localStorage.setItem('msPassingSurveyDate', Date.now());
  localStorage.removeItem('msQuestionPassed');
  localStorage.setItem('surveyIsFinished', true);
  localStorage.removeItem('lastPassedStep');
};
const manageStorageOnQuestionChange = (step, nextQuestionId) => {
  localStorage.setItem('surveyIsFinished', false);
  localStorage.setItem('lastPassedStep', step);
  localStorage.setItem('lastPassedQuestionNextId', nextQuestionId);
  localStorage.setItem('msQuestionPassed', Date.now());
};

const Question = ({ question, inputValue, nextQuestionId }) => {

  let dispatch = useDispatch();
  const [step, nextStep] = useState(Number(localStorage.getItem('lastPassedStep')) + 1 || 1);
  const [showButtonMode, showNextButton] = useState(false);

  const onAnswerChange = (answerBody, inputType, questionId) => {
    dispatch(onAnswerChangeAC(answerBody, inputType, questionId));
  };
  const onSubmitQuestion = (nextQuestionId) => {
    dispatch(onSubmitQuestionAC(nextQuestionId));
  };

  const next = (inputValue) => {
    showNextButton(false);
    if (!Number.isFinite(nextQuestionId)) {
      nextQuestionId = (inputValue === 'да') ? nextQuestionId[0] : nextQuestionId[1];
    };
    onSubmitQuestion(nextQuestionId);
    manageStorageOnQuestionChange(step, nextQuestionId);
    nextStep(step + 1);
  };

  const onInputChange = (answerBody, type, id) => {
    console.log(answerBody);
    localStorage.setItem(`${id}`, answerBody)
    showNextButton(true);
    onAnswerChange(answerBody, type, id);
  };

  let answers = [];
  if (question.type === 'radio' || question.type === 'checkbox') {
    answers = question.answers.map((elem, index) => {
      let labelElem = elem.value;
      return <div key={`${index}`}>
        <div className={c.label}>{elem.label + ' '}
          <div>
            <input onChange={(e) => onInputChange(labelElem, e.currentTarget.type, question.id)}
              type={`${question.type}`}
              value={inputValue}
              name={`${question.questionText}`}
              id={`${question.id}`}
              key={`${question.id}${index}`}
              className={c.customRadioBtn}
            />
          </div>
        </div>
      </div>
    })
  };
  const AnswerField = ({ type }) => {
    return <div>
      {type === 'date' ?
        <DateInput onInputChange={onInputChange} questionId={question.id} inputValue={inputValue} className={c.datePicker} />
        :
        <input onChange={(e) => onInputChange(e.currentTarget.value, e.currentTarget.type, question.id)}
          type={'text'}
          id={question.id}
          autoFocus={true}
          value={inputValue}
          className={c.answerField}
        />
      }
    </div>
  };

  return <div className={c.questionWrapper}>
    <section>
      <div className={c.step}>
        Шаг {step}
      </div>
      <div className={c.question}>
        {question.question}
      </div>
      <div className={c.radioWrapper} >
        {answers.length > 0 ? answers : <AnswerField type={question.type} />}
      </div>
      <div>
        {showButtonMode && <button autoFocus={false} onClick={next} >ДАЛЕЕ </button>}
      </div>
    </section>
  </div>
}


const SurveyFormContainer = (props) => {
  let surveyId = useSelector(state => state.app.surveyId);
  let dispatch = useDispatch();
  const getQList = useCallback(() => {
    let lastPassedQuesNextId = null;
    if (localStorage.getItem('lastPassedQuestionNextId')) {
      lastPassedQuesNextId = Number(localStorage.getItem('lastPassedQuestionNextId'));
    }
    dispatch(getQListThunkCreator(lastPassedQuesNextId, surveyId));
  });

  const collectedAnswers = (useSelector(state => state.app.answers));

  const sendAnswers = useCallback((answers) => {
    manageStorageonFinishSurvey();
    let request = {
      answers: [answers],
      survey_id: 1
    };
    let json = JSON.stringify(request);
    dispatch(sendAnswersThunkCreator(json));
  })

  let inputValue = useSelector(state => state.app.newAnswer[1]);

  useEffect((surveyId) => {
    getQList(surveyId);
  }, []);


  const qList = useSelector(state => state.app.qList);
  const currentQuestionId = useSelector(state => state.app.currentQuestionId);
  const question = qList.find(e => e.id === currentQuestionId);

  // если нужно запретить повторное прохождение опроса в течение 180 дней, то вот код:
  /* let surveyIsFinished = localStorage.getItem('surveyIsFinished');
  if (surveyIsFinished &&
    (Date.now() - Number(localStorage.getItem('msPassingSurveyDate')) < 15552000000)) {
    return <div className={c.questionWrapper}>Вы уже проходили этот опрос. Спасибо за выбор нашего ресторана!</div>
  };  */

  if (qList.length < 1) {
    return <div className={c.loader}>Вопросы загружаются...</div>
  }
  
  // если больше не осталось вопросов или длина списка вопросов уже равна длине списка с ответами
  if (!question || (qList.length === Object.keys(collectedAnswers).length)) {
    if (Object.keys(collectedAnswers).length < qList.length) {
      console.log('вопросов больше чем ответов, берем из storage');
      let answersFromStorage = {};
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (Number(key)) {
          answersFromStorage[key] = localStorage.getItem(key);
        };
      };
      sendAnswers(answersFromStorage);
    } else {
      sendAnswers(collectedAnswers);
    };
    return <div className={c.questionWrapper}>Спасибо за участие в опросе и выбор нашего ресторана!</div>
  }

  const nextQuestionId = question.nextid || [question.yes, question.no];

  return <>
    <Question question={question}
      inputValue={inputValue}
      nextQuestionId={nextQuestionId}
    />
  </>
}

export default SurveyFormContainer;
