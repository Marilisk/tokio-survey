import surveyAPI, { createQuestionAPI, deleteQuestionAPI, editQuestionAPI, editSurveyAPI } from "../DAL/api";
const ON_ANSWER_CHANGE = 'ON_ANSWER_CHANGE';
const ON_SUBMIT_QUESTION = 'ON_SUBMIT_QUESTION';
const SET_QLIST = 'ON_SET_QLIST';
const SET_SURVEYS = 'SET_SURVEYS';
const SET_SURVEY_CHANGES = 'SET_SURVEY_CHANGES';
const SET_SERVER_MESSAGE = 'SET_SERVER_MESSAGE';
const DELETE_QUESTION = 'DELETE_QUESTION';
const ADD_STORAGE_ANSW = 'ADD_STORAGE_ANSW';
const UPDATE_QUESTION = 'UPDATE_QUESTION';
const ADD_QUESTION = 'ADD_QUESTION';
const SWITCH_BTN_DISABLED = 'SWITCH_BTN_DISABLED';
const CHANGE_SURVEY_ID = 'CHANGE_SURVEY_ID';

let initialState = {
  qList: [
    // type - date, datetime, time, input, checkbox, select
  ],
  answers: {},
  newAnswer: [],

  surveyList: [],
  surveyId: '63f32e2111ac602ebc0464fe',
  surveyTitle: '',
  currentQuestionId: '',
  serverResponseMessage: {
    setQList: null,
    editSurvey: null,
    editQList: null,
    editQuestion: null,
    deleteQuestion: null,
    sendAnswersToServer: null,
    setSurveys: null,
  },
  isBtnDisabled: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QLIST: {
      let stateCopy = { ...state };
      stateCopy.surveyId = action.surveyId;
      stateCopy.surveyTitle = action.surveyTitle;
      stateCopy.qList = action.qList;
      stateCopy.currentQuestionId = action.start;
      return stateCopy;
    };
    case SET_SURVEYS: {
      let stateCopy = { ...state };
      stateCopy.surveyList = action.surveyList;
      return stateCopy;
    };
    case ON_ANSWER_CHANGE: {
      let stateCopy = { ...state };
      stateCopy.newAnswer = [action.questionId, action.answerBody];
      return stateCopy;
    };
    case ON_SUBMIT_QUESTION: {
      let stateCopy = { ...state };
      let newKey = stateCopy.newAnswer[0];
      let newProp = stateCopy.newAnswer[1];
      stateCopy.answers = { ...state.answers, [newKey]: newProp };
      stateCopy.newAnswer = [];
      stateCopy.currentQuestionId = action.nextQuestionId;
      return stateCopy;
    };
    case SET_SURVEY_CHANGES: {
      let stateCopy = { ...state };
      stateCopy.surveyId = action.surveyId;
      stateCopy.surveyTitle = action.title;
      stateCopy.startQuestionId = action.start;
      stateCopy.serverResponseMessage.editSurvey = `опрос изменен. 
      Заголовок опроса № ${action.surveyId} - ${action.title}, 
      стартовый вопрос - ${action.start} `;
      return stateCopy;
    }
    case SET_SERVER_MESSAGE: {
      let stateCopy = { ...state };
      if (action.part === 'editQList') {
        stateCopy.serverResponseMessage.editQList = action.text;
      } else if (action.part === 'deleteQuestion') {
        stateCopy.serverResponseMessage.deleteQuestion = action.text;
      } else if (action.part === 'editSurvey') {
        stateCopy.serverResponseMessage.editSurvey = action.text;
      } else if (action.part === 'setQList') {
        stateCopy.serverResponseMessage.setQList = action.text;
      } else if (action.part === 'setSurveys') {
          stateCopy.serverResponseMessage.setSurveys = action.text;
      } else {
        stateCopy.serverResponseMessage.editQuestion = action.text;
      }
      return stateCopy;
    }
    case DELETE_QUESTION: {
      let stateCopy = { ...state };
      let deletedId = action._id;
      stateCopy.qList = state.qList.filter(elem => elem._id !== deletedId);
      stateCopy.serverResponseMessage.deleteQuestion = `вопрос ${deletedId} успешно удалён`;
      return stateCopy;
    }
    case ADD_STORAGE_ANSW: {
      let stateCopy = { ...state };
      console.log('i m in ADD_STORAGE_ANSW');
      console.log(action.obj);
      stateCopy.answers = action.obj;
      return stateCopy;
    }
    case UPDATE_QUESTION: {
      let stateCopy = { ...state };
      stateCopy.qList = [...state.qList];
      let currentQuestion = stateCopy.qList.find( q => q._id === action._id);
      currentQuestion.type = action.newQuestion.type;
      currentQuestion.nextid = action.newQuestion.nextid;
      currentQuestion.yes = action.newQuestion.yes;
      currentQuestion.no = action.newQuestion.no;
      currentQuestion.question = action.newQuestion.question;
      currentQuestion.answers = [...action.newQuestion.answers];
      currentQuestion.validation = action.newQuestion.validation;
      currentQuestion.parent = action.newQuestion.parent;
      currentQuestion.parentIndex = action.newQuestion.parentIndex;
      stateCopy.serverResponseMessage.editQuestion = `вопрос с id ${action._id} изменён на сервере`;
      return stateCopy;
    }
    case ADD_QUESTION: {
      
      let stateCopy = { ...state };
      stateCopy.qList = [...state.qList];
      let newQuestion = action.question;
      newQuestion._id = action._id;

      console.log(newQuestion);
      stateCopy.qList.push(newQuestion);
      
      if (action._id) {
        stateCopy.serverResponseMessage.editQList = `добавлен новый вопрос с id ${action._id}`;
      } else {
        stateCopy.serverResponseMessage.editQList = `не получилось добавить новый вопрос :(`;
      }
      return stateCopy;
    }
    case SWITCH_BTN_DISABLED: {
      let stateCopy = { ...state };
      stateCopy.isBtnDisabled = action.mode;
      return stateCopy;
    };
    case CHANGE_SURVEY_ID: {
      let stateCopy = { ...state };
      stateCopy.surveyId = action.surveyId;
      return stateCopy;
    }
    default:
      return state;
  }
}

export const onAnswerChangeAC = (answerBody, inputType, questionId) => ({ type: ON_ANSWER_CHANGE, answerBody: answerBody, inputType: inputType, questionId: questionId });
export const onSubmitQuestionAC = (nextQuestionId) => ({ type: ON_SUBMIT_QUESTION, nextQuestionId: nextQuestionId });
export const setQListAC = (qList, start, surveyId, surveyTitle) => ({ type: SET_QLIST, qList: qList, start: start, surveyId: surveyId, surveyTitle: surveyTitle });
export const setSurveysAC = (surveyList) => ({ type: SET_SURVEYS, surveyList: surveyList, });
export const surveyChangesAC = (surveyId, title, start) => ({ type: SET_SURVEY_CHANGES, surveyId: surveyId, title: title, start: start });
export const setServerMessageAC = (text, part ) => ({ type: SET_SERVER_MESSAGE, text: text, part: part});
export const deleteQuestionAC = (_id) => ({ type: DELETE_QUESTION, _id });
export const addStorageAnswersAC = (obj) => ({type: ADD_STORAGE_ANSW, obj: obj});
export const updateQuestionAC = (_id, newQuestion) => ({type: UPDATE_QUESTION, _id, newQuestion: newQuestion });
export const addQuestionAC = (_id, question) => ({type: ADD_QUESTION, _id, question: question });
export const switchBtnDisabilityAC = (mode) => ({type: SWITCH_BTN_DISABLED, mode: mode });
export const changeSurveyAC = (surveyId) => ({type: CHANGE_SURVEY_ID, surveyId: surveyId });


export const getQListThunkCreator = (lastPassedQuesNextId, surveyId) => {
  return async function getQlistThunk(dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    let response = await surveyAPI.getQList(lastPassedQuesNextId, surveyId);
    let qList = response.data.questions;
    let start = lastPassedQuesNextId || response.data.start;
    let surveyTitle = response.data.title;
    if (response.statusText === 'OK') {
      dispatch(setQListAC(qList, start, surveyId, surveyTitle));
      dispatch(switchBtnDisabilityAC(false));
    } else {
      dispatch(setServerMessageAC('ошибка загрузки опроса с сервера', 'setQList'));
      dispatch(switchBtnDisabilityAC(false));
    }
  }
}
export const getSurveysListThunkCreator = () => {
  return async function getSurveysListThunk(dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    let response = await surveyAPI.getSurveys();
    let surveyList = response.data;
    if (response.statusText === 'OK') {
      dispatch(setSurveysAC(surveyList));
      dispatch(switchBtnDisabilityAC(false));
    } else {
      dispatch(setServerMessageAC('ошибка загрузки списка опросов с сервера', 'setSurveys'));
      dispatch(switchBtnDisabilityAC(false));
    }
  }
}

export const sendAnswersThunkCreator = (json) => {
  return function sendAnswersThunk(dispatch) {
    surveyAPI.sendAnswers(json)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

export const sendEditedQuestionThunkCreator = (editibleQuestionId, json) => {
  return async function sendEditedQuestionThunk(dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    try {
      let response =  await editQuestionAPI(editibleQuestionId, json);
      if (response.statusText === 'OK') {
        let newQuestion = JSON.parse(json);
        dispatch(updateQuestionAC(editibleQuestionId, newQuestion));
        dispatch(switchBtnDisabilityAC(false));
      }
    } catch(err) {
      console.log(err)
      dispatch(setServerMessageAC(`не получилось внести изменения в вопрос с id ${editibleQuestionId}`, ''));
      dispatch(switchBtnDisabilityAC(false));
    }
  }
};


export const addQuestionThunkCreator = (json) => {
  return async function addQuestionThunk(dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    let response = await createQuestionAPI(json);
    if (response.statusText === 'OK') {
      
      let question = JSON.parse(json);
      delete question.survey_id;
      let id = response.data;
      console.log(response);
      dispatch(addQuestionAC(id, question ));
      dispatch(switchBtnDisabilityAC(false));
    } else {
      console.log(response);
      dispatch(addQuestionAC(null));
      setServerMessageAC('ошибка добавления вопроса', 'editQList');
      dispatch(switchBtnDisabilityAC(true));
    }
  }
}

export const deleteQuestionThunkCreator = (questionId) => {
  return async function deleteQuestionThunk (dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    try {
      let response = await deleteQuestionAPI(questionId);
      if (response.statusText === 'OK') {
        dispatch(deleteQuestionAC(questionId));
        dispatch(switchBtnDisabilityAC(false));
      }
    } catch(err) {
      console.log(err);
      dispatch(setServerMessageAC(`не получилось удалить вопрос с id ${questionId}`, 'deleteQuestion'));
      dispatch(switchBtnDisabilityAC(false));
    }
  }
}

export const editSurveyThunkCreator = (surveyId, json) => {
  return async function editSurveyThunk (dispatch) {
    dispatch(switchBtnDisabilityAC(true));
    let response = await editSurveyAPI(surveyId, json);
    if (response.statusText === 'OK') {
      let title = JSON.parse(json).title;
      let start = JSON.parse(json).start;
      dispatch(surveyChangesAC(surveyId, title, start));
      dispatch(switchBtnDisabilityAC(false));
    } else {
      console.log(response);
      setServerMessageAC('ошибка запроса', 'editSurvey');
    }
  }
}


export default appReducer;