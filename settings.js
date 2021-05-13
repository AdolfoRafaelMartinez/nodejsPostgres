require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  development: {
    db: {
      database: process.env.CLOUD_DATABASE,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      dialect: 'postgres',
    }
  },
  production: {
    db: {
    }
  }
};
