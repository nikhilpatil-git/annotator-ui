export abstract class TrainingDataFailure<T> {
  constructor(public failedValue: T) {}
}

export class ULabelledDataNotFound extends TrainingDataFailure<Error> {
  static instance(error: Error) {
    return new ULabelledDataNotFound(error);
  }
}
