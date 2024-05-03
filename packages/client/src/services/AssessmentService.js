import Axios from '../utils/http.config';

export class AssessmentService {
  static async submit(assessment) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return await Axios.post(`/assessment`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
      } else if (err.request) {
        // The request was made but no response was received
        throw new Error(`No response was received from the server.`);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`An error occurred while setting up the request.`);
      }
    }
  }

  static async getList() {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      return await Axios.get(`/assessment`, {
        params: {
          data: `assessment`,
        },
      })
        .then(response => response.data.data.assessments);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
