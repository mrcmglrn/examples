import http from "../httpCommon";

class FooterDataService {
  getAll() {
    return http.get("/footer");
  }

  getByLanguage(lang) {
    return http.get(`/footer/${lang}`);
  }
}

export default new FooterDataService();
