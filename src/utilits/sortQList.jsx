
const sortQList = /* React.useMemo( */ (qList, start) => {

    if (qList.find(el => el.id === start)) {
        let qListStartQuesIndex = qList.indexOf(qList.find(q => q.id === start));
        let firstQuestionObj = { ...qList[qListStartQuesIndex] };
        qList.splice(qListStartQuesIndex, 1);
        qList.unshift(firstQuestionObj);
    }

    let questionsList = [{id: 0, question: 'нет'}];
    for (let i = 0; i < qList.length; i++) {
        questionsList.push({id: qList[i].id, question: qList[i].question});
        qList[i].parent = '';
        qList[i].number = '';
    }

    for (let i = 0; i < qList.length; i++) {
        if (qList[i].nextid) {
            let nextQ = qList.find(e => e.id === qList[i].nextid);
            if (nextQ) {
                nextQ.parentIndex = i;
                nextQ.parent += ` ${qList[i].question}`;
            }
        } else if (qList[i].yes && qList[i].no) {
            let nextQYes = qList.find(e => e.id === qList[i].yes);
            if (nextQYes) {
                nextQYes.parentIndex = i;
                nextQYes.parent = qList[i].question;
            }
            let nextQNo = qList.find(e => e.id === qList[i].no);
            if (nextQNo) {
                nextQNo.parentIndex = i;
                nextQNo.parent = qList[i].question;
            }
        }
    }

    for (let i = 0; i < qList.length; i++) {
        if (qList[i].nextid) {
            let nextQ = qList.find(e => e.id === qList[i].nextid);
            if (nextQ) {
                nextQ.number = i;
            }
        } else if (qList[i].yes && qList[i].no) {
            let nextQYes = qList.find(e => e.id === qList[i].yes);
            if (nextQYes) {
                nextQYes.number = Number(`${i}.${1}`);
                
            }
            let nextQNo = qList.find(e => e.id === qList[i].no);
            if (nextQNo) {
                nextQNo.number = Number(`${i}.${2}`);

            }
        }
    }

    qList.sort((a, b) => a.number - b.number);
    console.log('sorted qList');
    console.log(qList);

    return { resultList: qList, questionsList: questionsList };
}/* , [start] ); */



export default sortQList;