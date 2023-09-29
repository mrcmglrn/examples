import http from "../httpCommon";

class CurriculumDataService {
  getAll() {
    return http.get("/curriculum");
  }

  getByLanguage(lang) {
    return http.get(`/curriculum/${lang}`);
  }
}

export default new CurriculumDataService();
