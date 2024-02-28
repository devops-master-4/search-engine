import { axiosInstance } from './axiosApi'

export const optionsEnumTranslated: OptionsEnumTranslated = {
    auteurs: 'authors.name',
    genres: 'subjects',
    titre: 'title',
    langues: 'languages',
}

export const initialOptions: optionSelected[] = [
    {
        name: 'langues',
        selected: false,
    },
    {
        name: 'auteurs',
        selected: false,
    },
    {
        name: 'titre',
        selected: false,
    },
    {
        name: 'genres',
        selected: false,
    },
]

export const fetchBooks = async (
    url: string,
    method?: 'POST',
    data?: Object
): Promise<BookProperties[] | null> => {
    const newBooks: BookProperties[] = []
    let response: any = ''

    try {
        if (!method) {
            response = await axiosInstance.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }

        if (method) {
            response = await axiosInstance.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }

        if (response.data.status === 'success') {
            const booksData =
                response.data.data.length > 0 && response.data.data[1]
            const themeUser = response.data.data[0]

            booksData.forEach((book: any) => {
                const cover =
                    book?.formats['image/jpeg'] ||
                    'https://upittpress.org/wp-content/themes/pittspress/images/no_cover_available.png'

                let subjects: string[] = []
                if (book?.subjects) {
                    if (Array.isArray(book.subjects)) {
                        subjects = [...book.subjects]
                    } else {
                        subjects.push(book.subjects)
                    }
                }

                newBooks.push({
                    _id: book._id,
                    covers: cover,
                    authors: book.authors,
                    title: book.title,
                    theme: themeUser,
                    subjects: subjects,
                } as BookProperties)
            })
        }

        return newBooks
    } catch (error) {
        console.log(error)
        return null
    }
}
