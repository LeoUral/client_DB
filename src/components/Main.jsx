import React from 'react'
import Server from '../server/Server';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            text: '',
            number: 0,
            result: {},
            collection: 'logger',
            idDocument: 'test',
        }
        this.readData = this.readData.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
    }

    handleClickButton() {
        (async () => {
            try {
                const saveObj = {
                    text: this.state.text,
                    number: this.state.number,
                }
                console.log(`SAVE:::: `, saveObj); // test
                console.log(`String::: `, this.state.text, typeof (this.state.text)); // test
                console.log(`NUM::: `, this.state.number, typeof (this.state.number)); // test

                await Server.create(saveObj)

            } catch (err) {
                console.log(`ОШибка при создании документа: `, err);
            }
        })()

    }

    handleChangeText(e) {
        this.setState({ text: e.target.value })
    }

    handleChangeNumber(e) {
        this.setState({ number: Number(e.target.value) }) // * тип переменной указывается до сохранения
    }

    async readData() {
        try {
            console.log(`run readData()`);
            const result = await Server.read(this.state.collection, this.state.idDocument)
            this.setState({ result: result })
            this.setState({ text: result.text, number: result.number })
            setTimeout(() => {
                console.log(`result: `, result)
                console.log(`NAME: `, result.text);
                console.log(`Number: `, result.number);
                console.log(Object.keys(this.state.result));
            }, 2000)
        } catch (err) {
            console.log(`Ошибка при обращении к Server: `, err);
        }
    }

    async componentDidMount() {
        await this.readData()
    }

    render() {
        return (
            <div>
                Тестовая проверка работы сервера с фронтендом
                <div> &nbsp;  </div>
                <div>
                    text (load) : {this.state.text}
                </div>
                <div>
                    Number (load) : {this.state.number}
                </div>
                <div> &nbsp; </div>
                <div>
                    <input
                        type='text'
                        onChange={this.handleChangeText}
                    />
                </div>
                <div>
                    <input
                        type='number'
                        onChange={this.handleChangeNumber}
                    />
                </div>

                <div>
                    text: {this.state.text}
                </div>
                <div>
                    number: {this.state.number}
                </div>
                <div>
                    <button
                        onClick={this.handleClickButton}
                    >
                        SAVE
                    </button>
                </div>
                <div
                    style={{ padding: '10px' }}
                >
                    Отображение документа:
                    <div
                        style={{ padding: '10px' }}
                    >
                        <div>
                            <span> <b> _id: {`"${this.state.idDocument}"`} </b> </span>
                        </div>
                        <div>
                            <span>   {`{`} </span>
                            {
                                Object.keys(this.state.result).map(itm => {
                                    return (
                                        <div
                                            key={itm}
                                            style={{ padding: '0px 0px 0px 15px' }}
                                        >
                                            <span> <b> {itm}:</b></span>
                                            <span
                                                style={{
                                                    color: typeof (this.state.result[itm]) === 'number' ? 'blue' : 'green'
                                                }}
                                            >
                                                &nbsp; {this.state.result[itm]}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                            <span>  &nbsp;{`}`} </span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Main;