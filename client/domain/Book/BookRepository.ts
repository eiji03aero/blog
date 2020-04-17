import _ from 'lodash'
import { AxiosInstance } from 'axios'
import Book from '~/domain/Book/Book'

export default class BookRepository {
  private axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  public async listBooks(): Promise<Book[]> {
    const response = await this.axios.get('/api/book/')
    return _.map(response.data, (bookData: any) => new Book(bookData))
  }

  public async createBook(title: string): Promise<Book> {
    const response = await this.axios.post('/api/book/create', {
      title
    })
    return new Book(response.data)
  }

  public async deleteBook(book: Book) {
    await this.axios.delete(`/api/book/delete/${book.id}`)
  }
}
