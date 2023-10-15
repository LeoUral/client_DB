import { URL, PORT, TOKEN, PASSWORD, EMAIL } from './_variables'


class Server {
    constructor() {
        this.URL = URL;
        this.PORT = PORT;
    }

    /**
     * Чтение данных
     * @returns 
     */
    async read(collection, idDocument) {
        try {
            const url = `${this.URL}${this.PORT}/api/read/document`
            const userBody = {
                token: TOKEN,
                email: EMAIL,
                password: PASSWORD,
                collection: collection,
                idDocument: idDocument,
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userBody)
            })

            const result = await response.json();

            return result;

        } catch (err) {
            console.log(`ОШИБКА: `, err);
            return { messageError: err.message }
        }
    }


    /**
     * Сохранение данных
     * @param {*} data 
     * @returns 
     */
    async create(data) {
        try {
            const url = `${this.URL}${this.PORT}/api/create/document`
            const userBody = {
                token: TOKEN,
                email: EMAIL,
                password: PASSWORD,
                collection: 'logger',
                idDocument: 'test',
                data: data,
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userBody)
            })

            const result = await response.json();

            return result;

        } catch (err) {
            console.log(`ОШИБКА: `, err);
            return { messageError: err.message }
        }
    }

}

export default new Server();