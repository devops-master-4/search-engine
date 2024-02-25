type BookProperties = {
    _id: string
    id: number
    bookCover: string // url of image covers
    title: string
    authors: string[]
    subjects: string[] // theme du livre
    languages: string[]
}
type optionSelected = {
    name: string
    selected: boolean
}

type OptionsEnum = 'authors.name' | 'subjects' | 'title' | 'languages'

type OptionsEnumTranslated = {
    auteurs: OptionsEnum
    genres: OptionsEnum
    titre: OptionsEnum
    langues: OptionsEnum
}
