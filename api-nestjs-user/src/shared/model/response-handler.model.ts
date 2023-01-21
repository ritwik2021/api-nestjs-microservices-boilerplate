import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

/**
 * @class ResponseHandlerModel
 * @description This class is used to handle responses for HTTP requests.
 * @author Ritwik Rohitashwa
 */
@Injectable()
export class ResponseHandlerModel {
  /**
   * @description This method is used to handle successful responses for HTTP requests. It takes in a data
   * payload and a status code, and returns an object containing the success status, status code, and data.
   * @param error  any
   * @param statusCode  number
   * @param GrpcStatusCode
   * @param data  any
   * @returns { success: boolean, statusCode: number, data: any }
   * @author Ritwik Rohitashwa
   */
  async response(error: any, statusCode: number, GrpcStatusCode, data) {
    const response = {};
    if (error) {
      Object.assign(response, {
        code: GrpcStatusCode,
        message: JSON.stringify({
          data: data,
          error: error.toString(),
          statusCode: statusCode,
          stack: error.stack
        })
      });
      throw new RpcException(response);
    }
    return data;
  }

  /**
   * @description This method is used to handle error responses for HTTP requests. It takes in an error object
   * and a status code, and throws an error containing the error message, stack trace, and status code.
   * @param error any
   * @param statusCode number
   * @throws { response, statusCode: number }
   * @author Ritwik Rohitashwa
   */
  error(error: any, statusCode: number) {
    const response = {};
    Object.assign(response, {
      success: false,
      error: typeof error == 'string' ? error : error.error,
      stack: typeof error == 'string' ? error : error.stack,
      statusCode: statusCode
    });
    throw new HttpException(response, statusCode);
  }
}
