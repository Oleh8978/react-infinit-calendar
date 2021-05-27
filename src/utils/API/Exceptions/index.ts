export class Unauthorized extends Error {
  constructor(message: string = "User unauthorized!") {
    super(message);
  }
}

export class BadRequest extends Error {
  constructor(message: string = "Bad request!") {
    super(message);
  }
}
