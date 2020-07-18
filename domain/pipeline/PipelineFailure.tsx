export abstract class PipelineFailure<T> {
  constructor(public failedValue: T) {}
}

export class PipelinesNotFound extends PipelineFailure<Error> {
  static instance(error: Error) {
    return new PipelinesNotFound(error);
  }
}
