export class User {
  id: string;
  name: string | null;
  emailAddress: string | null;
  photoUrl: string | null;
  constructor(
    id: string,
    name: string | null,
    emailAddress: string | null,
    photoUrl: string | null
  ) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
    this.photoUrl = photoUrl;
  }
}
