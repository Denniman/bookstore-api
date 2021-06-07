import { Book } from '../model/book.js';


export const addBook = async (req, res) => {
    const { title, author, publishedYear } = req.body

    try {
        const newBook = new Book({
            title,
            author,
            publishedYear
        })

        const dbResponse = await newBook.save()

        if(dbResponse) {
            return res.status(200).json({
                status: 'Success', 
                message: 'Book saved!',
                data: dbResponse 
            })
        } else {
            return res.status(500).json({
                status: 'fail', 
                message: 'Opps!! something went wrong'
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const getBooksController = async (req, res) => {
    
    try {
        const getBooks = await Book.find()

        if(getBooks) {
            return res.status(200).json({
                status: 'Success', 
                data: getBooks
            })
        } 

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'Opps! something went wrong',
            err
        })
    }
}

export const updateBookController = async(req, res) => {
        const { bookId } = req.params
        const {title, author, publishedYear} = req.body
        const updatedBook = {
            title,
            author,
            publishedYear
        }
    try {
        const updateDb = await Book.findByIdAndUpdate(bookId, {$set: updatedBook})
        if(updateDb) {
            return res.status(200).json({
                status: 'Updated successfully'
            })
        } 
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'Failed', 
            message: 'Something went wrong',
            err
        })
    }
}

export const deleteBook = async(req, res) => {
    const { bookId } = req.params

    try {
        const removeBook = await Book.findByIdAndRemove(bookId)
        if(removeBook) {
            return res.status(200).json({
            status: 'Success', 
            message: 'Deleted successfuly'})
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({status: 'Failed',
        message: 'An error occured',
        err
        })
    }
}
