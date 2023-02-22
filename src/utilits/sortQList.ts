interface IQuestion {
    _id: string
    surveyId: string
    nextid: string
    yes: string
    no: string
    type: string
    question: string
    answers: any[]
    validation: string

}


export const sortQuestions = (qList:IQuestion[], start:string) => {
    
    let idsList:string[] = []

    const recursiveFunc = (nextId:string) => {
        const question = qList.find(q => q._id === nextId )
        if (question) {
            idsList.push(question._id)
            
            if (question.nextid) {
                recursiveFunc(question.nextid)
            } else if (question.yes || question.no) {
                recursiveFunc(question.yes)
                recursiveFunc(question.no)
                
            }        
        }
    } 

    recursiveFunc(start)

    if(idsList.length < qList.length) {
        for (let question of qList) {
            if ( ! idsList.includes(question._id)) {
                idsList.push(question._id)
            }
        }
    }

    let resultList:IQuestion[] = []
    idsList.forEach(el => {
        const question = qList.find(q => q._id === el )
        if (question) {
            resultList.push(question)
        }
        
    })
    return resultList

}