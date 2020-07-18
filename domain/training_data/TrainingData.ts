export class Text {
  raw: string;
  sentences: Sentences[];

  constructor(raw: string, sentences: Sentences[]) {
    this.raw = raw;
    this.sentences = sentences;
  }
}
export class Sentences {
  tokens: Tokens[];
  constructor(tokens: Tokens[]) {
    this.tokens = tokens;
  }
}
export class Tokens {
  id: number;
  dep: string;
  head: number;
  tag: string;
  orth: string;
  ner: string;

  constructor(
    id: number,
    dep: string,
    head: number,
    tag: string,
    orth: string,
    ner: string
  ) {
    this.id = id;
    this.dep = dep;
    this.head = head;
    this.tag = tag;
    this.orth = orth;
    this.ner = ner;
  }
}

export class TrainingData {
  documentId: string;
  state: string;
  category: string;
  sentiment: string;
  text: Text;

  constructor(
    documentId: string,
    state: string,
    category: string,
    sentiment: string,
    text: Text
  ) {
    this.documentId = documentId;
    this.state = state;
    this.category = category;
    this.sentiment = sentiment;
    this.text = text;
  }
}
