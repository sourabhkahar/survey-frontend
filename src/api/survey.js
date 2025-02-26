import { api } from '@/api'
export const useSurvey = () => {
    const http = api()
    const createSurvey = (data) => http.post('survey', data);
    const getSurveies = (data) => http.get(`survey?page=${data.page}`);
    const getSurvey = (id) => http.get(`survey/${id}`);
    const updateSurvey = (id,data) => http.put(`survey/${id}`,data);
    const deleteSurvey = (id) => http.delete(`survey/${id}`);
    return {
        createSurvey,
        getSurveies,
        getSurvey,
        updateSurvey,
        deleteSurvey
    }
}