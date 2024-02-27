import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId: "581642748233-bpedg11mhe71kl350lcjb5kltjkqp8dj.apps.googleusercontent.com",
  apiKey: "AIzaSyDZ2ZLW2g83bry8U-B79vnKNIEurgdu1lI",
  scope: "https://www.googleapis.com/auth/calendar",
  client_email: 'nativex@nativex-415022.iam.gserviceaccount.com',
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],

};

export const apiCalendar = new ApiCalendar(config);