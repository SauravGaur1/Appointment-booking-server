require("dotenv").config();

module.exports = {
  enviornment: {
    active: process.env.NODE_ENV || "development",
    development: {
      port: process.env.PORT,
      host: process.env.HOST,
    },
    production: {
      port: 80,
      host: "0.0.0.0",
    },
  },
  encryption: {
    salt: Number(process.env.BCRYPT_SALT),
  },
  db: {
    development: {
      connectionStr: process.env.MONGODB_URI
    },
  },
  jsonWebToken: {
    secretKey: process.env.JWT_SECRET,
    tokenMaxAge: 24 * 60 * 60 * 1000,
  },
  roleMap: {
    USER: 0,
    ADMIN: 1,
    SUPER_ADMIN: 2,
  }
};