const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // create new book
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    // response
    if (!name) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            })
            .code(400);
    }
    // 2. readPage > pageCount
    if (readPage > pageCount) {
        return h
            .response({
                status: 'fail',
                message:
                    'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);
    }

    // push new book to books array
    books.push(newBook);

    // check if book successfully added
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    // console.log(newBook);

    if (isSuccess) {
        // berhasil
        return h
            .response({
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: {
                    bookId: id,
                },
            })
            .code(201);
    }
    return h
        .response({
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        })
        .code(500);
};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    const filteredBooks = books.filter((book) => {
        // Filtering berdasarkan query name (non-case sensitive)
        const nameMatch = !name || book.name.toLowerCase().includes(name.toLowerCase());

        // Filtering berdasarkan query reading
        const readingMatch = reading === undefined || book.reading === (reading === '1');

        // Filtering berdasarkan query finished
        const finishedMatch = finished === undefined || book.finished === (finished === '1');

        return nameMatch && readingMatch && finishedMatch;
    });

    return h
        .response({
            status: 'success',
            data: {
                books: filteredBooks.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        .code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    //    search book
    const findBook = books.filter((book) => book.id === bookId)[0];

    // console.log(findBook);

    if (findBook !== undefined) {
        return h.response({
            status: 'success',
            data: {
                book: findBook,
            },
        });
    }
    return h
        .response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        })
        .code(404);
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookId);

    // gagal

    if (!name) {
        return h
            .response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            })
            .code(400);
    }

    if (readPage > pageCount) {
        return h
            .response({
                status: 'fail',
                message:
                    'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            })
            .code(400);
    }

    // berhasil
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year: year || books[index].year,
            author: author || books[index].author,
            summary: summary || books[index].summary,
            publisher: publisher || books[index].publisher,
            pageCount: pageCount || books[index].pageCount,
            readPage: readPage || books[index].readPage,
            reading: reading || books[index].reading,
            updatedAt,
        };
        return h
            .response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            })
            .code(200);
    }
    return h
        .response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        // splice(index, 1) berarti menghapus 1 element dari array
        // dari index yang ditemukan

        return h
            .response({
                status: 'success',
                message: 'Buku berhasil dihapus',
            })
            .code(200);
    }

    return h
        .response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};
