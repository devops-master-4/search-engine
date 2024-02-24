import { optionSelected, OptionsEnumTranslated } from '../types/search'

export const optionsEnumTranslated: OptionsEnumTranslated = {
    auteurs: 'authors',
    themes: 'subjects',
    genres: 'bookshelves',
    titre: 'title',
    langues: 'languages',
}

export const initialOptions: optionSelected[] = [
    {
        name: 'langues',
        selected: false,
    },
    {
        name: 'themes',
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
