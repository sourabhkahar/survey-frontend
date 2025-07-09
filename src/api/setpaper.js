import { api } from '@/api'
export const useSetPaper = () => {
    const http = api()
    const createSetPaper = (data) => http.post('paper', data);
    const getPapers = (data) => http.get(`paper?page=${data.page}`);
    const getTemplateList = (data) => http.get(`paper/template?page=${data.page}`);
    const createPaperFromTemplate = (id) => http.post(`paper/create-paper-from-template/${id}`,null,{
       responseType: 'blob'
    });
    const getPaper = (id) => http.get(`paper/${id}`);
    const updatePaper = (id,data) => http.put(`paper/${id}`,data);
    // const deleteSurvey = (id) => http.delete(`survey/${id}`);

    // const getSurveyForUser = (slug) => http.get(`test/${slug}`);
    // const submitSurveyAnswer = (id,data) => http.post(`submit-survey/${id}`,data)
    // const getDashBoardData = () => http.get(`dashboard/index`)
    return {
        createSetPaper,
        getPapers, 
        getTemplateList,
        createPaperFromTemplate,
        getPaper,
        updatePaper,
        // getSurveies,
        // getSurvey,
        // deleteSurvey,
        // getSurveyForUser,
        // submitSurveyAnswer,
        // getDashBoardData
    }
}