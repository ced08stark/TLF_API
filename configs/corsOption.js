
const whiteList = [
  "https://www.google.com",
  "https://tcp-front-omega.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "https://tcp-services-huga.onrender.com",
  "https://tcp-front-git-test-cabrelelvis187-gmailcom.vercel.app"
];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allow by CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOption;