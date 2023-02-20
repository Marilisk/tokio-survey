import * as axios from 'axios';

const API_URL = 'http://localhost:4444/'
const instance = axios.create({
    //baseURL: 'https://survey-api.pydev.fun/v1/',
    baseURL: API_URL,
    headers: {
        //'apitoken': 'KJ38egx3eu832*G-s8733kjcV3A',
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export const editSurveyAPI = (surveyId, json) => {
    return instance.put(`survey/${surveyId}`, json);
}

export const deleteQuestionAPI = (questionId) => {
    return instance.delete(`question/${questionId}`);    
}

export const surveyAPI = {
    getQList(lastPassedQuesNextId, surveyId) {
        return instance.get(`surveys/questions/${surveyId}`);
    },
    sendAnswers(json) {
        return instance.post('answer', json);
    },
    getSurveys() {
        return instance.get('surveys');
    }
};

const instanceEdit = axios.create({
    baseURL: API_URL,
    headers: {
        /* 'apitoken': 'KJ38egx3eu832*G-s8733kjcV3A', */
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

export const editQuestionAPI = (editibleQuestionId, json) => {
    return instanceEdit.put(`question/edit/${editibleQuestionId}`, json);
}

export const createQuestionAPI = (json) => {
    return instanceEdit.post('question/create', json);
};

export default surveyAPI;