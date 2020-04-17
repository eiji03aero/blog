export default class Book {
  id: string
  title: string

  constructor(params: { id: string; title: string }) {
    this.id = params.id
    this.title = params.title
  }
}
