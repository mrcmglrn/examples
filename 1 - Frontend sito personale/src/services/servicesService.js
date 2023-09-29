import http from "../httpCommon";

class ServicesDataService {
  getAll() {
    return http.get("/services");
  }

  getByLanguage(lang) {
    return http.get(`/services/${lang}`);
  }
}

export default new ServicesDataService();
