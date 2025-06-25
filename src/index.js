const config = require('./config/config.js');
const app = require('./app.js');
const connectDB = require('./database/index.js');

const enviornment = config.enviornment.active === "production"
  ? config.enviornment.production
  : config.enviornment.development;

const {
  port: PORT,
  host: HOST
} = enviornment;


(async () => {
  await connectDB();
  app.listen(PORT, HOST, () => {
    console.log(`✔️✔️✔️ server started @: http://${HOST}:${PORT}`);
  });
})()