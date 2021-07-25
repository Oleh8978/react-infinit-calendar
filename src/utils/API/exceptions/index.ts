export class Unauthorized extends Error {
  constructor(message = 'User unauthorized!') {
    super(message);
  }
}

export class BadRequest extends Error {
  constructor(message = 'Bad request!') {
    super(message);
  }
}
