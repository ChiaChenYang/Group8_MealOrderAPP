const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config({ path: './.env' });

const envSchema = z.object({
//   PORT: z.string().default('4001'),
//   MYSQL_URL: z.string().url(),
  JWT_SECRET: z.string(),
//   JWT_EXPIRES_IN: z.string(),
//   DB_USERNAME: z.string(),
//   DB_PASSWORD: z.string(),
//   DB_NAME: z.string(),
//   DB_HOST: z.string(),
});

const env = envSchema.parse({
//   PORT: process.env.PORT || '4001',
//   MYSQL_URL: process.env.MYSQL_URL,
  JWT_SECRET: process.env.JWT_SECRET,
//   JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
//   DB_USERNAME: process.env.DB_USERNAME,
//   DB_PASSWORD: process.env.DB_PASSWORD,
//   DB_NAME: process.env.DB_NAME,
//   DB_HOST: process.env.DB_HOST,
});

module.exports = { env };