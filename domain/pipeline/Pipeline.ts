export class Pipeline {
  name: string;
  description: string;
  values: Map<string, string>;

  constructor(name: string, description: string, values: Map<string, string>) {
    this.name = name;
    this.description = description;
    this.values = values;
  }
}
