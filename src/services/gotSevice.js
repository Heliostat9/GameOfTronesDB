export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }

        return await res.json();
    }

    getAllBooks = async() => {
        const res = await this.getResource('/books/');
        return res.map(this._transformBook);
    }

    getBook = async (id) => {
        const res = await this.getResource(`/books/${id}/`);
        return this._transformBook(res);
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouse = async() => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }

    getHouse = async(id) => {
        const res = await this.getResource(`/houses/${id}`);
        return this._transformHouse(res);
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        
        return {
            id: this._extractId(char),
            name: char.name ? char.name : 'no data :(',
            gender: char.gender ? char.gender : 'no data :(',
            born: char.born ? char.born : 'no data :(',
            died: char.died ? char.died : 'no data :(',
            culture: char.culture ? char.culture : 'no data :('
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: house.name ? house.name : 'no data :(',
            region: house.region ? house.region : 'no data :(',
            words: house.words ? house.words  : 'no data :(',
            titles: house.titles ? house.titles : 'no data :(',
            overlord: house.overlord ? house.overlord : 'no data :(',
            ancestralWeapons: house.ancestralWeapons ? house.ancestralWeapons : 'no data :('
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: book.name ? book.name : 'no data :(',
            numberOfPages: book.numberOfPages ? book.numberOfPages : 'no data :(',
            publisher: book.publisher ? book.publisher : 'no data :(',
            released: book.released ? book.released  : 'no data :('
        }
    }
}