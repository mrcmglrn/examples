import http from "../httpCommon";

// Call database & retrieve data as json
class ContactDataService {
  getAll() {
    return http.get("/contact");
  }

  getByLanguage(lang) {
    return http.get(`/contact/${lang}`);
  }
}

export default new ContactDataService();
