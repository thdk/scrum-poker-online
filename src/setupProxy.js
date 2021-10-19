// Source: https://peterhrynkow.com/firebase/2018/08/01/firebase-with-create-react-app.html
// Extra for CRA 2+: https://stackoverflow.com/a/52620241

const proxy = require('http-proxy-middleware');

module.exports = function proxyFn(app) {
  app.use(proxy('/__',
    { target: 'http://localhost:5000/' }));
};
