import React from "react";
import { useFormik } from "formik";
import c from './createQuestion.module.css';
import { useDispatch } from "react-redux";
import { addQuestionThunkCreator, changeSurveyAC, setServerMessageAC } from "../../redux/app-reducer.js";

const CreateQuestion = /* React.memo( */ ({surveys, isBtnDisabled, createServerMessage, surveyId}) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            surveyId,
            nextid: '',
            yes: '',
            no: '',
            type: '',
            question: '',
            answers: [
                { label: 'да', value: 1 },
                { label: 'нет', value: 0 },
            ],
            validation: '',
        },
        // validate, 
        onSubmit: (values, actions) => {
            let json = JSON.stringify(values);
            console.log(json);
            dispatch(addQuestionThunkCreator(json));
            actions.resetForm({
                surveyid: surveyId,
                nextid: '',
                yes: '',
                no: '',
                type: '',
                question: '',
                answers: [
                    { label: 'да', value: 1 },
                    { label: 'нет', value: 0 },
                ],
                validation: '',
            });
        }
    });

    const surveyOptions = surveys.map( el => <option value={el._id} label={`${el.title}, id ${el._id}`} key={el._id} />);

    return <div >
        {createServerMessage &&
            <div className={c.serverMessage} onClick={() => dispatch(setServerMessageAC(null, 'editQList'))}>
                {createServerMessage}
                <span className={c.serverMsgNote}>кликните окно для закрытия</span>
            </div>}

        <form onSubmit={formik.handleSubmit} className={createServerMessage ? `${c.form} ${c.nonClickable}` : c.form} >

            <div className={c.surveyNumber}>
                <p className={c.label}>опросник: </p>
                <select id={'survey_id'}
                    name={'survey_id'}
                    value={formik.values.survey_id}
                    onChange={(event) => {
                        formik.values.survey_id = event.currentTarget.value;
                        //console.log(event.currentTarget.value);
                        dispatch(changeSurveyAC(event.currentTarget.value));
                    }}
                    className={c.surveySelect}
                    required={true}>
                    {surveyOptions}
                </select>
            </div>

            <div className={c.inputGroup}>
                <div className={c.text}>
                    <p className={c.label}>текст вопроса</p>
                    <textarea id={'question'}
                        name={'question'}
                        value={formik.values.question}
                        onChange={formik.handleChange}
                        className={c.textarea}
                    />
                </div>

                <div className={c.numbers}>
                    <div className={c.column}>
                        <p className={c.label}>номер следующего вопроса</p>
                        <input id={'nextid'}
                            name={'nextid'}
                            value={formik.values.nextid}
                            onChange={formik.handleChange}
                            className={c.formInput}
                            readOnly={formik.values.yes || formik.values.no ? true : false}
                        />
                    </div>
                    <div className={c.column}>
                        <p className={c.label}>если ответ "Да"</p>
                        <input id={'yes'}
                            name={'yes'}
                            value={formik.values.yes}
                            onChange={formik.handleChange}
                            className={c.formInput}
                            readOnly={formik.values.nextid ? true : false}
                        />
                    </div>
                    <div className={c.column}>
                        <p className={c.label}>если ответ "Нет"</p>
                        <input id={'no'}
                            name={'no'}
                            value={formik.values.no}
                            onChange={formik.handleChange}
                            className={c.formInput}
                            readOnly={formik.values.nextid ? true : false}
                        />
                    </div>
                </div>

            </div>


            <div className={c.inputGroup}>

                <div className={c.radioGroup}>
                    <p className={c.label}>тип ответа на вопрос:</p>
                    <div>
                        <label>
                            <input type={'radio'}
                                id={'type'}
                                name={'type'}
                                value={'text'}
                                onChange={formik.handleChange}
                                className={c.customRadioBtn}
                                checked={formik.values.type === 'text' ? true : false}
                            />
                            <p className={c.labelRadio}>текст</p>
                        </label>

                        <label className={c.radioLabel}>
                            <input type={'radio'}
                                id={'type'}
                                name={'type'}
                                value={'radio'}
                                onChange={formik.handleChange}
                                className={c.customRadioBtn}
                                checked={formik.values.type === 'radio' ? true : false} 
                            />
                            <p className={c.labelRadio}>радиокнопки</p>
                        </label>

                        <label>
                            <input type={'radio'}
                                id={'type'}
                                name={'type'}
                                value={'date'}
                                onChange={formik.handleChange}
                                className={c.customRadioBtn}
                                checked={formik.values.type === 'date' ? true : false}
                            />
                            <p className={c.labelRadio}>дата</p>
                        </label>
                    </div>

                </div>

                <div className={c.conditional}>
                {formik.values.type === 'radio' ?
                    <div>
                        <p className={c.label}>варианты ответов (ярлык - значение):</p>
                        <div className={c.answersVarieties}>
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
                        <div className={c.answersVarieties}>
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

                    <div className={c.validation}>
                        <p className={c.label}>регулярка для валидации</p>
                        <textarea id={'validation'}
                            name={'validation'}
                            value={formik.values.validation}
                            onChange={formik.handleChange}
                            className={c.textarea}
                        />
                    </div>
                }
            </div>
              
            </div>

            <button disabled={isBtnDisabled} type={'submit'}>отправить</button>
        </form>

    </div>
}/* ) */;

export default CreateQuestion;