export const Constants = {
  USER: 'user',
  ADMIN: 'admin',
  CLIENT: 'client'
};

export const JWT_SETTINGS = {
  JWT_SECRET_KEY: 'secret_key',
  JWT_ALGORITHM: 'HS512',
  JWT_TOKEN_VALIDITY: '24h',
  JWT_REFRESH_TOKEN_VALIDITY: '30d'
};

export const REDIS_SETTINGS = {
  host: 'localhost',
  port: 6379,
  key: 'nestjs_example'
};
