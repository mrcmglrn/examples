import http from "../httpCommon";

class SkillsDataService {
  getAll() {
    return http.get("/skills");
  }

  getByLanguage(lang) {
    return http.get(`/skills/${lang}`);
  }
}

export default new SkillsDataService();
