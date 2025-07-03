import { api } from '@/api'
export const useSetPaper = () => {
    const http = api()
    const createSetPaper = (data) => http.post('set-paper', data);
    const getPapers = (data) => http.get(`set-paper?page=${data.page}`);
    const getTemplateList = (data) => http.get(`set-paper/template?page=${data.page}`);
    const createPaperFromTemplate = (id) => http.post(`set-paper/create-paper-from-template/${id}`,null,{
       responseType: 'blob'
    });
    const getPaper = (id) => http.get(`set-paper/${id}`);
    // const updateSurvey = (id,data) => http.put(`survey/${id}`,data);
    // const deleteSurvey = (id) => http.delete(`survey/${id}`);

    // const getSurveyForUser = (slug) => http.get(`test/${slug}`);
    // const submitSurveyAnswer = (id,data) => http.post(`submit-survey/${id}`,data)
    // const getDashBoardData = () => http.get(`dashboard/index`)
    return {
        createSetPaper,
        getPapers, 
        getTemplateList,
        createPaperFromTemplate,
        getPaper
        // getSurveies,
        // getSurvey,
        // updateSurvey,
        // deleteSurvey,
        // getSurveyForUser,
        // submitSurveyAnswer,
        // getDashBoardData
    }
}