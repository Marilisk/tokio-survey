import React from "react";
import { useFormik } from "formik";
import c from './EditSurvey.module.css';
import { useDispatch } from 'react-redux';
import { editSurveyThunkCreator, setServerMessageAC } from './../../redux/app-reducer.js';

const EditSurvey = ({surveyId, surveyTitle, firstQuestion, surveyServerMessage, isBtnDisabled, surveys }) => {

    const dispatch = useDispatch();
    const sendSurveyChanges = (surveyId, json) => {
        dispatch(editSurveyThunkCreator(surveyId, json));
    };
    const closeServerMessage = () => {
        dispatch(setServerMessageAC(null, 'editSurvey'))
    }
    
    const formik = useFormik({
        initialValues: {
            surveyId,
            title: surveyTitle,
            start: firstQuestion,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            let json = JSON.stringify({ title: values.title, start: values.start });
            sendSurveyChanges(values.surveyId, json);
        }
    });

    if (surveys.length < 1) {
        return <div className={c.loader}>Опросы загружаются...</div>
    }
    
    
    return <div>
        {surveyServerMessage && 
            <div className={c.serverMessage} onClick={ () => closeServerMessage() }>
                {surveyServerMessage}
                <span className={c.serverMsgNote}>кликните окно для закрытия</span>
            </div> 
        }

        <form onSubmit={formik.handleSubmit} className={surveyServerMessage ? `${c.form} ${c.nonClickable}` : c.form}>

        
            <div className={c.inputGroup}>
                <p className={c.label}>название опроса</p>
                <input id={'title'}
                    name={'title'}
                    value={formik.values.title}
                    onChange={formik.handleChange} />
            </div>

            <div className={c.inputGroup}>
                <p className={c.label}>номер первого вопроса в опросе</p>
                <input id={'start'}
                    name={'start'}
                    value={formik.values.start}
                    onChange={formik.handleChange} />
            </div>

            <button disabled={isBtnDisabled} type={'submit'}>отправить</button>
                        
        </form>
    </div>
}

export default EditSurvey;