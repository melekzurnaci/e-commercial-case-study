export class BaseErrorException extends Error {
  public readonly statusCode: number;
  public readonly data?: {};
  constructor(message: string, statusCode: number, name: string, data?: {}) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.data = data;
  }
}
