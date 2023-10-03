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
        this.setState({ number: e.target.value })
    }


    async readData() {
        try {
            console.log(`run readData()`);
            const result = await Server.read()
            this.setState({ result: result })
            this.setState({ text: result.text, number: result.number })
            setTimeout(() => {
                console.log(`result: `, result)
                console.log(`NAME: `, result.text);
                console.log(`Number: `, result.number);
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

            </div>
        )
    }
}
export default Main;