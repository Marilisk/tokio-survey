import React from "react";
import c from './QuestionList.module.css';
import { useDispatch } from "react-redux";
import QuestionRow from "./QuestionRow.jsx";
import { changeSurveyAC, setServerMessageAC } from "../../redux/app-reducer.js";

const QuestionList = ({ sortedQList, serverMessage, deleteServerMessage, surveyId, surveyTitle, isBtnDisabled, questionsList, surveys }) => {
    const dispatch = useDispatch();
    if (sortedQList.length < 1) {
        return <div className={c.loader}>Вопросы загружаются...</div>
    }

    const questionElements = sortedQList.map((elem, i) => <QuestionRow key={i}
        qListElement={elem}
        surveyId={surveyId}
        isBtnDisabled={isBtnDisabled}
        questionsList={questionsList}
    />)

    const surveyOptions = surveys.map(el => <option value={el._id} 
            label={`${el.title}, ${el.questions.length} вопросов`} key={el._id} />);

    return <>
        <div className={c.shortForm}>

            <div className={c.surveyNumber}>
                <h2>опрос </h2>
                <select id={'survey_id'}
                    name={'survey_id'}
                    value={surveyId}
                    onChange={(event) => {
                        dispatch(changeSurveyAC(event.currentTarget.value));
                    }}
                    className={c.surveySelect}
                    required={true}>
                    {surveyOptions}
                </select>

                {serverMessage && <div className={c.serverMessage} onClick={() => dispatch(setServerMessageAC(null))} >
                    {serverMessage}
                    <span className={c.serverMsgNote}>нажмите для закрытия</span>
                </div>
                }

                {deleteServerMessage && <div className={c.serverMessage} onClick={() => dispatch(setServerMessageAC(null, 'deleteQuestion'))} >
                    {deleteServerMessage}
                    <span className={c.serverMsgNote}>нажмите окно для закрытия</span>
                </div>
                }

            </div>
        </div>
        <div className={(serverMessage || deleteServerMessage) && c.nonClickable}>
            {questionElements}
        </div>
    </>
}


export default QuestionList;