import { useEffect } from 'react';
import c from './EditLayout.module.css';
import { Routes, Route } from 'react-router-dom';
import logo from './../../images/logo.png';
import CreateQuestion from '../createQuestion/createQuestion.jsx';
import EditNavigation from '../Navigation/EditNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import EditSurvey from './../EditSurvey/EditSurvey.jsx';
import QuestionList from '../QuestionList/QuestionList.jsx';
import { getQListThunkCreator, getSurveysListThunkCreator } from './../../redux/app-reducer.js';
import sortQList from '../../utilits/sortQList';
import TESTQuestionRow from '../QuestionList/TESTQuestionRow';

function EditLayout() {
    let dispatch = useDispatch();
    const surveyId = useSelector(state => state.app.surveyId) ;
    const getQList = useCallback(() => {
        dispatch(getQListThunkCreator(null, surveyId));
    });
    const getSurveysList = useCallback( () => {
        dispatch (getSurveysListThunkCreator());
    })
    const surveyTitle = useSelector(state => state.app.surveyTitle);
    useEffect(() => { 
        getQList();
        getSurveysList();
    }, [surveyId, surveyTitle]);
    const qList = useSelector(state => state.app.qList);
    const surveys = useSelector(state => state.app.surveyList);
    const firstQuestion = useSelector( state => state.app.currentQuestionId);
    const serverMessage = useSelector(state => state.app.serverResponseMessage.editQuestion);
    const deleteServerMessage = useSelector(state => state.app.serverResponseMessage.deleteQuestion);
    const surveyServerMessage = useSelector(state => state.app.serverResponseMessage.editSurvey);
    const createServerMessage = useSelector(state => state.app.serverResponseMessage.editQList);
    const isBtnDisabled = useSelector(state => state.app.isBtnDisabled);
    let sorted = sortQList(qList, firstQuestion);
    let sortedQList = sorted.resultList;
    
    return <div>
        <div className={c.header}>
            <img src={logo} alt='' />
        </div>
        <EditNavigation />
        <div className={c.surveyWrapper}>
            <Routes>
                <Route path='' element={<QuestionList 
                                            sortedQList={sortedQList} 
                                            serverMessage={serverMessage} 
                                            deleteServerMessage={deleteServerMessage}
                                            surveyId={surveyId} 
                                            surveyTitle={surveyTitle} 
                                            isBtnDisabled={isBtnDisabled}
                                            questionsList={sorted.questionsList}
                                            surveys={surveys} />} 
                />
                <Route path='questionslist' element={<QuestionList 
                                                    sortedQList={sortedQList} 
                                                    serverMessage={serverMessage} 
                                                    deleteServerMessage={deleteServerMessage}
                                                    surveyId={surveyId} 
                                                    surveyTitle={surveyTitle} 
                                                    isBtnDisabled={isBtnDisabled}
                                                    questionsList={sorted.questionsList}
                                                    surveys={surveys} />} 
                />
                <Route path='createquestion' element={<CreateQuestion 
                                                        surveys={surveys}
                                                        isBtnDisabled={isBtnDisabled}
                                                        createServerMessage={createServerMessage}
                                                        surveyId= {surveyId}
                                                        />}
                />
                <Route path='editsurvey' element={<EditSurvey 
                                                    surveyId={surveyId} 
                                                    surveyTitle={surveyTitle} 
                                                    firstQuestion={firstQuestion} 
                                                    surveyServerMessage={surveyServerMessage}
                                                    isBtnDisabled={isBtnDisabled}
                                                    surveys={surveys} />} 
                />
                <Route path='test' element={<TESTQuestionRow sortedQList={sortedQList} 
                                                serverMessage={serverMessage} 
                                                deleteServerMessage={deleteServerMessage}
                                            surveyId={surveyId} 
                                            surveyTitle={surveyTitle} 
                                            isBtnDisabled={isBtnDisabled}
                                            idList={sorted.idList}
                                            surveys={surveys} />} 
                />
                
            </Routes>
        </div>
    </div>
}

export default EditLayout;



