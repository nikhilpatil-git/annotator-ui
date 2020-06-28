export abstract class AuthFailure<T> {
  constructor(public failedValue: T) {}
}

export class CancelledByUser extends AuthFailure<Error> {
  static instance(error: Error) {
    return new CancelledByUser(error);
  }
}

export class ServerError extends AuthFailure<Error> {
  static instance(error: Error) {
    return new ServerError(error);
  }
}

export class NoUserError extends AuthFailure<Error> {
  static instance(error: Error) {
    return new NoUserError(error);
  }
}
