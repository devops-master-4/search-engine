type BookProperties = {
    id: number
    bookCover: string // url of image covers
    title: string
    authors: string[]
    subjects: string[] // theme du livre
    bookshelves: string[] //genre
    languages: string[]
}
type optionSelected = {
    name: string
    selected: boolean
}

type OptionsEnum =
    | 'authors'
    | 'subjects'
    | 'bookshelves'
    | 'title'
    | 'languages'

type OptionsEnumTranslated = {
    auteurs: OptionsEnum
    themes: OptionsEnum
    genres: OptionsEnum
    titre: OptionsEnum
    langues: OptionsEnum
}
