const express = require("express");

//Database
const database = require("./database");

//Initialise express
const booky = express();

/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
});

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` });
    }

    return res.json({ book: getSpecificBook });
});


/*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/

booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )

    if (getSpecificBook.length === 0) {
        return res.json({ error: `No book found for the category of ${req.params.category}` })
    }

    return res.json({ book: getSpecificBook });
});

/*
Route            /l
Description      Get specific language
Access           PUBLIC
Parameter        language
Methods          GET
*/

booky.get("/l/:language", (req, res) => {
    const getSpecificLanguage = database.books.filter(
        (book) => book.language.includes(req.params.language)
    )

    if (getSpecificLanguage.length === 0) {
        return res.json({ error: `No language found ${req.params.language}` })
    }

    return res.json({ book: getSpecificLanguage });
});
/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/author", (req, res) => {
    return res.json({ authors: database.author });
});

/*
Route            /author/book
Description      Get all authors based on books
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        });
    }
    return res.json({ authors: getSpecificAuthor });
});

/*
Route            /i
Description      To get a specific author based on id
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/i/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter((author) =>
        author.id == req.params.id);

    if (getSpecificAuthor.length === 0) {
        return res.json({ error: `No author found for the id ${req.params.id}` });
    }
    return res.json({ author: getSpecificAuthor });

});


/*
Route            /publications
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
*/

booky.get("/publications", (req, res) => {
    return res.json({ publications: database.publication });
})

/*
Route            /p
Description      To get a specific publication
Access           PUBLIC
Parameter        id
Methods          GET
*/

booky.get("/p/:id", (req, res) => {
    const getSpecificPub = database.publication.filter((publication) =>
        publication.id == req.params.id);

    if (getSpecificPub.length === 0) {
        return res.json({ error: `No publication found for the id ${req.params.id}` });
    }
    return res.json({ author: getSpecificPub });

});

/*
Route            /publication/book
Description      To get a list of publications based on a book
Access           PUBLIC
Parameter        isbn
Methods          GET
*/

booky.get("/publication/book/:isbn", (req, res) => {
    const getListOfPublications = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getListOfPublications.length === 0) {
        return res.json({
            error: `No list of publications  found for the book of ${req.params.isbn}`
        });
    }
    return res.json({ publication: getListOfPublications });
});

booky.listen(3000, () => {
    console.log("Server is up and running");
});