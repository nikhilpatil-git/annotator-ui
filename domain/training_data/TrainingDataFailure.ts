export class TrainingDataError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export abstract class TrainingDataFailure<T> {
  constructor(public failedValue: T) {}
}

export class ULabelledDataSaveFailed extends TrainingDataFailure<
  TrainingDataError
> {
  static instance(error: TrainingDataError) {
    return new ULabelledDataSaveFailed(error);
  }
}

export class ULabelledDataNotFound extends TrainingDataFailure<Error> {
  static instance(error: Error) {
    return new ULabelledDataNotFound(error);
  }
}

export class ULabelledDataFromCatcheNotFound extends TrainingDataFailure<
  TrainingDataError
> {
  static instance() {
    return new ULabelledDataNotFound(
      new TrainingDataError("Cache data not found, please fetch from server")
    );
  }
}
