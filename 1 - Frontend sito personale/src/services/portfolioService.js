import http from "../httpCommon";

class PortfolioDataService {
  getAll() {
    return http.get("/portfolio");
  }

  getByLanguage(lang) {
    return http.get(`/portfolio/${lang}`);
  }
}

export default new PortfolioDataService();
