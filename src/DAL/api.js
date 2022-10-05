import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://survey-api.pydev.fun/v1/',
    headers: {
        'apitoken': 'KJ38egx3eu832*G-s8733kjcV3A',
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
        return instance.get(`survey/${surveyId}`);
    },
    sendAnswers(json) {
        return instance.post('answer/', json);
    },
    getSurveys() {
        return instance.get('surveys');
    }
};

const instanceEdit = axios.create({
    baseURL: 'https://survey-api.pydev.fun/v1/question/',
    headers: {
        'apitoken': 'KJ38egx3eu832*G-s8733kjcV3A',
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
});

export const editQuestionAPI = (editibleQuestionId, json) => {
    return instanceEdit.put(`${editibleQuestionId}`, json);
}

/* const instance = axios.create({
    baseURL: 'https://survey-api.pydev.fun/v1/question/',
    headers: {
        'apitoken': 'KJ38egx3eu832*G-s8733kjcV3A',
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
}); */

export const editAPI = (json) => {
    return instanceEdit.post('', json);
};

export default surveyAPI;