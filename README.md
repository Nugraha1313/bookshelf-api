# bookshelf-api

## Feature

**1. Menyimpan Buku**

- Method : POST
- URL : /books
- Body Request :

  ```json
  {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
  }
  ```

  ```json
  {
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
  }
  ```

  - id : nilai id haruslah unik. Untuk membuat nilai unik, Anda bisa memanfaatkan nanoid. Untuk Anda yang menggunakan CommonJS untuk sistem modularisasi, pastikan memasang nanoid versi 3 melalui perintah: npm install nanoid@3.
  - finished : merupakan properti boolean yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi pageCount === readPage.
  - insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku. Anda bisa gunakan new Date().toISOString() untuk menghasilkan nilainya.
  - updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, berikan nilai properti ini sama dengan insertedAt.

- Response :

  1.  Berhasil

      - Status Code : 201
      - Response Body :

        ```json
        {
          "status": "success",
          "message": "Buku berhasil ditambahkan",
          "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
          }
        }
        ```

  1.  Gagal

      1.  Client tidak melampirkan properti name pada request body
          - Status Code : 400
          - Response :
            ```json
            {
              "status": "fail",
              "message": "Gagal menambahkan buku. Mohon isi nama buku"
            }
            ```
      2.  Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.
          - Status Code : 400
          - Response :
            ```json
            {
              "status": "fail",
              "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }
            ```

**2. Menampilkan Seluruh Buku**

- Method : GET
- URL : /books
- Response :

  - Berhasil

    - Status Code : 200
    - Response Body :

      ```json
      {
        "status": "success",
        "data": {
          "books": []
        }
      }
      ```

      ```json
      {
        "status": "success",
        "data": {
          "books": [
            {
              "id": "Qbax5Oy7L8WKf74l",
              "name": "Buku A",
              "publisher": "Dicoding Indonesia"
            },
            {
              "id": "1L7ZtDUFeGs7VlEt",
              "name": "Buku B",
              "publisher": "Dicoding Indonesia"
            },
            {
              "id": "K8DZbfI-t3LrY7lD",
              "name": "Buku C",
              "publisher": "Dicoding Indonesia"
            }
          ]
        }
      }
      ```

**3. Menampilkan Detail Buku**

- Method : GET
- URL : /books/{bookId}
- Response :

  - Id Ditemukan

    - Status Code : 200
    - Response Body :

      ```json
      {
        "status": "success",
        "data": {
          "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
          }
        }
      }
      ```

  - Id tidak ditemukan

    - Status Code : 400
    - Response Body :
      ```json
      {
        "status": "fail",
        "message": "Buku tidak ditemukan"
      }
      ```

**4. Mengubah Buku**

- Method : PUT
- URL : /books/{bookId}
- Body Request :
  ```json
  {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
  }
  ```
- Response :

  - Berhasil diperbarui

    - Status Code : 200
    - Response Body :

      ```json
      {
        "status": "success",
        "message": "Buku berhasil diperbarui"
      }
      ```

  - Client tidak melampirkan properti name pada request body

    - Status Code : 400
    - Response Body :
      ```json
      {
        "status": "fail",
        "message": "Gagal memperbarui buku. Mohon isi nama buku"
      }
      ```

  - Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount.

    - Status Code : 400
    - Response Body :

      ```json
      {
        "status": "fail",
        "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
      }
      ```

  - Id yang dilampirkan oleh client tidak ditemukkan oleh server.

    - Status Code : 404
    - Response Body :

      ```json
      {
        "status": "fail",
        "message": "Gagal memperbarui buku. Id tidak ditemukan"
      }
      ```

**5. Menghapus Buku**

- Method : DELETE
- URL : /books/{bookId}
- Body Request :
- Response :

  - Id ditemukan

    - Status Code : 200
    - Response Body :

      ```json
      {
        "status": "success",
        "message": "Buku berhasil dihapus"
      }
      ```

  - Id tidak ditemukan

            - Status Code : 404
            - Response Body :

              ```json
              {
                "status": "fail",
                "message": "Buku gagal dihapus. Id tidak ditemukan"
              }
              ```

    **5. Fitur Opsional**

- Tambahkan fitur query parameters pada route GET /books (Mendapatkan seluruh buku)
  - ?name : Tampilkan seluruh buku yang mengandung nama berdasarkan nilai yang diberikan pada query ini. Contoh /books?name=”dicoding”, maka akan menampilkan daftar buku yang mengandung nama “dicoding” secara non-case sensitive (tidak peduli besar dan kecil huruf).
  - ?reading : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sedang tidak dibaca (reading: false). Bila 1, maka tampilkan buku yang sedang dibaca (reading: true). Selain itu, tampilkan buku baik sedang dibaca atau tidak.
  - ?finished : Bernilai 0 atau 1. Bila 0, maka tampilkan buku yang sudah belum selesai dibaca (finished: false). Bila 1, maka tampilkan buku yang sudah selesai dibaca (finished: true). Selain itu, tampilkan buku baik yang sudah selesai atau belum dibaca.
- Menggunakan ESLint dan salah satu style guide agar gaya penulisan kode JavaScript lebih konsisten. Serta ketika dijalankan perintah npx eslint . tidak terdapat error yang muncul.
