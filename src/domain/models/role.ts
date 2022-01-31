export class Role {
  id?: string;
  name: string;

  constructor(name: string, id?: string) {
    this.id = id;
    this.name = name;
  }
}
