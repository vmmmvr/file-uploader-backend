import pino from 'pino';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enable colorful output
      translateTime: 'SYS:standard', // Display timestamps in standard format
      ignore: 'pid,hostname', // Optional: ignore unnecessary fields
    },
  },
});

export default logger;
