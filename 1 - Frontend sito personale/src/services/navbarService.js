import http from "../httpCommon";

class NavbarDataService {
  getAll() {
    return http.get("/navbar");
  }

  getByLanguage(lang) {
    return http.get(`/navbar/${lang}`);
  }
}

export default new NavbarDataService();
