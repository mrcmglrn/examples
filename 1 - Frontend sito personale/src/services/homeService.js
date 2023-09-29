import http from "../httpCommon";

class HomeDataService {
  getAll() {
    return http.get("/home");
  }

  getByLanguage(lang) {
    return http.get(`/home/${lang}`);
  }
}

export default new HomeDataService();
