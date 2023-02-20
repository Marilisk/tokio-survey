import React, { useState } from "react";
import { useFormik } from "formik";
import c from './QuestionList.module.css';
import { useDispatch } from "react-redux";
import sendIcon from './../../images/disk.svg';
import deleteIcon from './../../images/trash.svg';
import editIcon from './../../images/editIcon.svg';
import { deleteQuestionThunkCreator, sendEditedQuestionThunkCreator } from "../../redux/app-reducer";


const QuestionRow = ({ qListElement, surveyId, isBtnDisabled, questionsList }) => {
    const dispatch = useDispatch();
    const deleteQuestion = () => {
        let id = qListElement._id;
        dispatch(deleteQuestionThunkCreator(id));
    };

    const formik = useFormik({
        initialValues: {
            survey_id: surveyId,
            nextid: qListElement.nextid,
            yes: qListElement.yes,
            no: qListElement.no,
            type: qListElement.type,
            question: qListElement.question,
            answers: [
                { label: 'да', value: 1 },
                { label: 'нет', value: 0 },
            ],
            validation: qListElement.validation,
        },
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            let editibleQuestionId = qListElement._id;
            let json = JSON.stringify(values);
            dispatch(sendEditedQuestionThunkCreator(editibleQuestionId, json));
            actions.resetForm({
                surveyid: surveyId,
                nextid: qListElement.nextid,
                yes: qListElement.yes,
                no: qListElement.no,
                type: qListElement.type,
                question: qListElement.question,
                answers: [
                    { label: 'да', value: 1 },
                    { label: 'нет', value: 0 },
                ],
                validation: qListElement.validation,
            });
        }
    });

    let options = questionsList.map((e, i) => <option className={c.option}
        value={e._id}
        label={`${e.question}`}
        key={i}>
        {e._id}
    </option>);

    const [editMode, changeEditMode] = useState(false);

    return <div>
        <form onSubmit={formik.handleSubmit} className={editMode ? c.form : c.shortForm} >

            <div className={editMode ? c.questionRow : c.shortQuestionRow}>

                <div className={editMode ? c.questionBlock : c.shortQuestionBlock} >
                    <div className={editMode ? c.textAreaWrap : c.shortTextAreaWrap}>
                        {editMode ? <p className={c.label}>текст вопроса:</p> : null}
                        <textarea id={'question'}
                            name={'question'}
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            className={editMode ? c.questionTextarea : c.shortTextarea}
                        />
                    </div>

                    {editMode ? <>

                        <div className={c.radioGroup}>


                            <p className={c.label}>тип ответа на вопрос:</p>
                            <label>
                                <input type={'radio'}
                                    id={'type'}
                                    name={'type'}
                                    value={'text'}
                                    onChange={formik.handleChange}
                                    className={c.customRadioBtn}
                                    checked={formik.values.type === 'text'}
                                />
                            </label>
                            <p className={c.label}>текст</p>

                            <label>
                                <input type={'radio'}
                                    id={'type'}
                                    name={'type'}
                                    value={'radio'}
                                    onChange={formik.handleChange}
                                    className={c.customRadioBtn}
                                    checked={formik.values.type === 'radio'}
                                />
                            </label>
                            <p className={c.label}>радиокнопки</p>

                            <label>
                                <input type={'radio'}
                                    id={'type'}
                                    name={'type'}
                                    value={'date'}
                                    onChange={formik.handleChange}
                                    className={c.customRadioBtn}
                                    checked={formik.values.type === 'date'}
                                />
                            </label>
                            <p className={c.label}>дата</p>

                        </div> </> : null}


                </div>

                <div className={editMode ? c.initialNumbers : c.initialNumbersToLeft}>

                    {editMode &&
                        <div className={c.numbersList}>
                            <p className={c.label}>предыдущий вопрос</p>
                            <div className={c.parent} >
                                {qListElement.parent}
                            </div>

                        </div>
                    }

                    <div className={c.numbersList}>
                        <p className={c.label}>следующий вопрос</p>

                        <select id={'nextid'}
                            name={'nextid'}
                            value={formik.values.nextid}
                            onChange={(event) => {
                                formik.values.nextid = event.currentTarget.value;
                                formik.submitForm();
                            }}
                            disabled={formik.values.yes || formik.values.no || isBtnDisabled ? true : false}>
                            {options}
                        </select>

                    </div>

                    <div className={c.numbersList}>
                        <p className={c.label}>... если ответ "Да"</p>
                        <select id={'yes'}
                            name={'yes'}
                            value={formik.values.yes}
                            onChange={(event) => {
                                formik.values.yes = event.currentTarget.value;
                                formik.submitForm();
                            }}
                            disabled={formik.values.nextid || isBtnDisabled ? true : false}>
                            {options}
                        </select>
                    </div>

                    <div className={c.numbersList}>
                        <p className={c.label}>... если ответ "Нет"</p>
                        <select id={'no'}
                            name={'no'}
                            value={formik.values.no}
                            onChange={(event) => {
                                formik.values.no = event.currentTarget.value;
                                formik.submitForm();
                            }}
                            disabled={formik.values.nextid || isBtnDisabled ? true : false}>
                            {options}
                        </select>
                    </div>

                </div>



                {editMode ? <div>{formik.values.type === 'radio' ?

                    <div className={c.answersVarieties}>
                        <p className={c.label}>варианты ответов (ярлык - значение):</p>
                        <div className={c.inputGroup}>
                            <input id={'answer1'}
                                name={'answers[0].label'}
                                placeholder={'ярлык'}
                                value={formik.values.answers[0].label}
                                onChange={formik.handleChange}
                                className={c.formInput}
                            />
                            <input id={'answer1'}
                                name={'answers[0].value'}
                                placeholder={'значение'}
                                value={formik.values.answers[0].value}
                                onChange={formik.handleChange}
                                className={c.formInput}
                            />
                        </div>
                        <div className={c.inputGroup}>
                            <input id={'answer2'}
                                name={'answers[1].label'}
                                placeholder={'ярлык'}
                                value={formik.values.answers[1].label}
                                onChange={formik.handleChange}
                                className={c.formInput}
                            />
                            <input id={'answer2'}
                                name={'answers[1].value'}
                                placeholder={'значение'}
                                value={formik.values.answers[1].value}
                                onChange={formik.handleChange}
                                className={c.formInput}
                            />
                        </div>
                    </div>
                    :
                    <div className={c.validationtextArea}>
                        <p className={c.label}>валидация</p>
                        <input id={'validation'}
                            name={'validation'}
                            value={formik.values.validation}
                            onChange={formik.handleChange}
                            className={c.questionTextarea}
                        />
                    </div>
                } </div>
                    : null}


                <div className={editMode ? c.btnsBlock : c.shortBtnsBlock} >
                    {editMode &&
                        <button disabled={isBtnDisabled} type={'submit'} className={c.sendButton} >
                            <img alt={''} key={`${qListElement._id}im`} src={sendIcon} className={c.sendIcon} />
                        </button>
                    }
                    <button disabled={isBtnDisabled} key={`${qListElement._id}delb`} type={'button'} className={c.deleteButton} onClick={() => deleteQuestion()} >
                        <img alt={''} key={`${qListElement._id}del`} src={deleteIcon} className={c.deleteIcon} />
                    </button>

                    <button disabled={isBtnDisabled} type={'button'} className={editMode ? c.brightButton : c.editButton} onClick={() => changeEditMode(!editMode)} >
                        <img alt={''} key={`${qListElement._id}ed`} src={editIcon} className={c.editIcon} />
                    </button>

                </div>
            </div>

        </form>

    </div>
}


export default QuestionRow;