import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

export interface file {
  filename;
  level;
}
const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const timestamp = format.timestamp;
const label = format.label;

@Injectable()
export class LoggerService {
  private _infoLogger;
  private _warnLogger;
  private _errorLogger;

  constructor() {
    this._infoLogger = this._loggerCreate('info', 'user-service', {
      filename: 'logs/info.log',
      level: 'info',
    });
    this._warnLogger = this._loggerCreate('warn', 'user-service', {
      filename: 'logs/warn.log',
      level: 'warn',
    });
    this._errorLogger = this._loggerCreate('error', 'user-service');
  }
  protected _loggerCreate(level: string, service: string, file?: file) {
    const transport = [
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ];
    if (file)
      transport.push(
        new transports.File({ filename: file.filename, level: file.level }),
      );
    return createLogger({
      level: level,
      format: format.combine(
        label({ label: 'app-user' }),
        timestamp(),
        myFormat,
      ),
      defaultMeta: { service: service },
      transports: transport,
    });
  }
  infoLog(message) {
    this._infoLogger.log('info', message);
  }
  warnLog(message) {
    this._warnLogger.log('warn', message);
  }
  errorLog(message) {
    this._errorLogger.log('error', message);
  }
}
