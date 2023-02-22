import React from "react";
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQListThunkCreator } from '../../redux/app-reducer.js';
import c from './../../App.module.css';
import Question from "./Question.jsx";
import { manageStorageonFinishSurvey } from "./manageStorage.js";
import AppLayout from "../AppLayout/AppLayout.jsx";
import surveyAPI from "../../DAL/api.js";


const SurveyFormContainer = () => {
  let surveyId = useSelector(state => state.app.surveyId);
  let dispatch = useDispatch();

  const getQList = useCallback((surveyId) => {
    let lastPassedQuesNextId = null;
    if (localStorage.getItem('lastPassedQuestionNextId')) {
      lastPassedQuesNextId = localStorage.getItem('lastPassedQuestionNextId');
    }
    dispatch(getQListThunkCreator(lastPassedQuesNextId, surveyId));
  }, [dispatch]);

  const collectedAnswers = (useSelector(state => state.app.answers));

  const sendAnswers = (answers) => {
    manageStorageonFinishSurvey();
    let request = {
      answers,
      survey_id: 1
    };
    surveyAPI.sendAnswers(request)
  }

  let inputValue = useSelector(state => state.app.newAnswer[1]);

  useEffect(() => {
    getQList(surveyId);
  }, [surveyId, getQList]);


  const qList = useSelector(state => state.app.qList);
  const currentQuestionId = useSelector(state => state.app.currentQuestionId);
  const question = qList.find(e => e._id === currentQuestionId);

  // если нужно отменить запрет повторного прохождения опроса в течение 180 дней, то вот код:
  let surveyIsFinished = localStorage.getItem('surveyIsFinished');
  if (surveyIsFinished &&
    (Date.now() - Number(localStorage.getItem('msPassingSurveyDate')) < 15552000000)) {
    return <>
      <AppLayout />
      <div className={c.questionWrapper}>Вы уже проходили этот опрос. Спасибо за выбор нашего ресторана!</div>
    </>
  };

  if (qList.length < 1) {
    return <div className={c.loader}>Вопросы загружаются...</div>
  }

  if (!question || (qList.length === Object.keys(collectedAnswers).length)) {
    if (Object.keys(collectedAnswers).length < qList.length) {
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
    return <>
      <AppLayout />
      <div className={c.questionWrapper}>Спасибо за участие в опросе и выбор нашего ресторана!</div>
    </>
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
