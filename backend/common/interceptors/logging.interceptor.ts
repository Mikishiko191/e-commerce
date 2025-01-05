import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * LoggingInterceptor intercepts incoming HTTP requests and logs pertinent details such as
 * the request method, URL, and the time taken to process the request.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Intercept method that handles the logging of each request.
   *
   * @param context - ExecutionContext provides methods to access the details about the current request.
   * @param next - CallHandler allows the interceptor to control the flow of request handling.
   * @returns Observable<any> - The stream of events after processing the request.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const userAgent = request.headers['user-agent'] || '';
    const ip =
      request.headers['x-forwarded-for'] || request.connection.remoteAddress;

    this.logger.log(
      `Incoming Request: Method=${method} URL=${url} IP=${ip} User-Agent=${userAgent}`,
    );

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Outgoing Response: Method=${method} URL=${url} - ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
