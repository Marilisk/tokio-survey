import * as axios from 'axios';

//const DEV_API_URL = 'http://localhost:4444/';
const API_URL = 'https://survey-backend-marilisk.vercel.app/';
const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

export const editSurveyAPI = (surveyId, json) => {
    return instance.put(`survey/${surveyId}`, json);
}

export const createSurveyAPI = (title) => {
    return instance.post(`createsurvey`, title);
}



export const deleteQuestionAPI = (questionId) => {
    return instance.delete(`question/${questionId}`);    
}

export const surveyAPI = {
    getQList(json) {
        return instance.get(`surveys/questions/${json}`);
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