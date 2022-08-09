const nodemail = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemail.createTransport({
            host: "smtp.gmail.com", 
            port: 465,
            secure: true,
            auth: {
                user: 'sosiska2004dota2@gmail.com',
                pass: 'wdzibaclsgixysop'
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'sosiska2004dota2@gmail.com',
            to,
            subject: 'Привет',
            text: 'Привет Дядя Вадим',
            html: 
            `
                <div>
                    <h1>Активируйте!!</h1>
                    <a href="${link}" stype={color:red} >${link}</a>
                </div>
            `
        })
    }
}


module.exports = new MailService()