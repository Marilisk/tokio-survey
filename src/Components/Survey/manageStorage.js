

export const manageStorageonFinishSurvey = () => {
    localStorage.setItem('passingSurveyDate', new Date());
    localStorage.setItem('msPassingSurveyDate', Date.now());
    localStorage.removeItem('msQuestionPassed');
    localStorage.setItem('surveyIsFinished', true);
    localStorage.removeItem('lastPassedStep');
};

export const manageStorageOnQuestionChange = (step, nextQuestionId) => {
    localStorage.setItem('surveyIsFinished', false);
    localStorage.setItem('lastPassedStep', step);
    localStorage.setItem('lastPassedQuestionNextId', nextQuestionId);
    localStorage.setItem('msQuestionPassed', Date.now());
};