import * as path from 'path';
import * as winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

/**
 * Retrieve a logger function that formats the log messages neatly.
 *
 * The logger accepts a file name as a parameter to determine which file is
 * producing the messages. Log level is also read from the LOG_LEVEL environment
 * variable upon initialising the logger object.
 * @param {string} filePath For ease of use, designed to take in the full path
 *    to the file, that can be easily retrieved with the built-in "__filename"
 *    variable. Can be any path sort of a path to a file.
 * @returns A logger object using the formatting defined below.
 */
function getLogger(filePath: string): winston.Logger {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'error',
    format: winston.format.simple(),
    defaultMeta: { file: path.basename(filePath) },
    transports: [
      new winston.transports.File({filename: process.env.LOG_File}),
      process.env.NODE_ENV === 'dev' ? new winston.transports.Console():
      new WinstonCloudwatch({
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
        awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
        awsRegion: process.env.AWS_REGION
      })
    ],
  });
}

export { getLogger };
