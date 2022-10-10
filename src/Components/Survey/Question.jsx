import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAnswerChangeAC, onSubmitQuestionAC } from './../../redux/app-reducer.js';
import c from './../../App.module.css';
import DateInput from "./../Inputs/DatePicker.jsx";
import { manageStorageOnQuestionChange } from "./manageStorage.js";
import AppLayout from "../AppLayout/AppLayout.jsx";

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

  return <>
    <AppLayout />
    <div className={c.questionWrapper}>
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
          {showButtonMode && <button autoFocus={false} onClick={next} className={c.btn} >ДАЛЕЕ </button>}
        </div>
      </section>
    </div>
  </>
}



export default Question;
