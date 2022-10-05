import React, { useCallback } from "react";
import { useFormik } from "formik";
import c from './EditSurvey.module.css';
import { useDispatch } from 'react-redux';
import { changeSurveyAC, editSurveyThunkCreator, setServerMessageAC } from './../../redux/app-reducer.js';

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
            surveyId: surveyId,
            title: surveyTitle,
            start: firstQuestion,
        },
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            values.start = Number(values.start);
            values.surveyId = Number(values.surveyId);
            let json = JSON.stringify({ title: values.title, start: values.start });
            sendSurveyChanges(values.surveyId, json);
            actions.resetForm({
                surveyId: surveyId,
                title: surveyTitle,
                start: firstQuestion,
            });
        }
    });

    if (surveys.length < 1) {
        return <div className={c.loader}>Опросы загружаются...</div>
    }
    
    const surveyOptions = surveys.map( el => <option value={el.id} label={el.id} key={el.id} />);

    return <div>
        {surveyServerMessage && 
            <div className={c.serverMessage} onClick={ () => closeServerMessage() }>
                {surveyServerMessage}
                <span className={c.serverMsgNote}>кликните окно для закрытия</span>
            </div> 
        }

        <form onSubmit={formik.handleSubmit} className={surveyServerMessage ? `${c.form} ${c.nonClickable}` : c.form}>

            <div className={c.inputGroup}>
                <p className={c.label}>номер опроса</p>
                {/* <input id={'surveyId'}
                    name={'surveyId'}
                    value={formik.values.surveyId}
                    onChange={formik.handleChange}
                    
                /> */}
                <select id={'surveyId'}
                    name={'surveyId'}
                    value={formik.values.surveyId}
                    onChange={(event) => {
                        formik.values.surveyId = event.currentTarget.value;
                        dispatch(changeSurveyAC(event.currentTarget.value));
                    }}
                    className={c.surveySelect}
                    required={true}>
                    {surveyOptions}
                </select>
            </div>

            <div className={c.inputGroup}>
                <p className={c.label}>название опроса</p>
                <input id={'title'}
                    name={'title'}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    
                />
            </div>

            <div className={c.inputGroup}>
                <p className={c.label}>номер первого вопроса в опросе</p>
                <input id={'start'}
                    name={'start'}
                    value={formik.values.start}
                    onChange={formik.handleChange}
                    
                />
            </div>

            <button disabled={isBtnDisabled} type={'submit'}>отправить</button>
                        
        </form>
    </div>
}

export default EditSurvey;