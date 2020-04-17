import BookRepository from '~/domain/Book/BookRepository'

export default (context: any, inject: any) => {
  const bookRepository = new BookRepository(context.$axios)

  inject('bookRepository', bookRepository)
}
