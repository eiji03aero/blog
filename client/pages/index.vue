<template>
  <section>
    <table class="table">
      <tr>
        <th>ID</th>
        <th>タイトル</th>
      </tr>
      <tr v-for="book in books" :key="book.id">
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>
          <button
            type="button"
            class="button is-primary"
            @click.prevent="deleteBook(book)"
          >
            削除する
          </button>
        </td>
      </tr>
    </table>

    <section class="modal-card-body">
      <v-text-field label="本のタイトル" v-model="title" type="input" placeholder="タイトル" />
      <button
        type="button"
        class="button is-primary"
        @click.prevent="createBook()"
      >
        登録する
      </button>
    </section>

    <p v-if="error">{{ error }}</p>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Book from '~/domain/Book/Book'

@Component({
  async asyncData({ app }) {
    const books = await app.$bookRepository.listBooks()

    return {
      books
    }
  }
})
export default class extends Vue {
  private books: Book[] = [] as Book[]

  private title = ''
  private error = ''

  async createBook() {
    try {
      await this.$bookRepository.createBook(this.title)

      this.books = await this.$bookRepository.listBooks()
      this.title = ''
    } catch (e) {
      this.error = e
    }
  }

  async deleteBook(book: Book) {
    try {
      await this.$bookRepository.deleteBook(book)

      this.books = await this.$bookRepository.listBooks()
    } catch (e) {
      this.error = e
    }
  }
}
</script>
