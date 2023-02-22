import React from "react";
import { useFormik } from "formik";
import c from './CreateSurvey.module.css';
import { useDispatch } from 'react-redux';
import { createSurveyThunkCreator, setServerMessageAC } from '../../redux/app-reducer.js';

export const CreateSurvey = ({surveyServerMessage, isBtnDisabled, surveys }) => {

    const dispatch = useDispatch();
    
    const closeServerMessage = () => {
        dispatch(setServerMessageAC(null, 'editSurvey'))
    }
    
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(createSurveyThunkCreator(values.title));
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

            <button disabled={isBtnDisabled} type={'submit'}>отправить</button>
                        
        </form>
    </div>
}

