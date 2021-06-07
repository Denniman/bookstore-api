import pkg from 'mongoose';

const { Schema, model } = pkg

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        }
    },
    { timestamps: true}
)

export const Book = model('book', bookSchema)