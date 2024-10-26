import jwt from "jsonwebtoken"
import {TransportOptions, Transporter, createTransport} from "nodemailer"
import {renderConfirmEmailTemplate} from "./templates/verify-email-templates/simple"
import {renderPasswordResetEmailTemplate} from "./templates/password-reset-templates/simple"
export default class GmailClientCore {
    private config = {
        service: "gmail", 
        host: "smtp.gmail.com", 
        port: 587, 
        secure: "false", 
        auth: {
            "user": "", 
            "pass": ""
        }
    }
    private appData = {
        appName: "",
        appSecret: ""
    }
    public constructor(senderGmail: string, senderGmailAppPassword: string, appName: string, appSecret: string) {
        this.config.auth.user = senderGmail
        this.config.auth.pass = senderGmailAppPassword
        this.appData.appName = appName
        this.appData.appSecret = appSecret
    }
    private getGmailTransporter(): Transporter{
        return createTransport(this.config as TransportOptions)
    }

    public async sendVerifierEmail(email: string, redirectURL: string, validityInMinutes: number){
        const transporter = this.getGmailTransporter()
        const token = jwt.sign({email: email}, this.appData.appSecret, {expiresIn: `${validityInMinutes}m` })

            await transporter.sendMail({
                from: `No Reply ${this.config.auth.user}`,
                to: email,
                subject: `Email Verification Link for ${this.appData.appName}`,
                html: renderConfirmEmailTemplate(this.appData.appName, `${redirectURL}?token=${token}`, validityInMinutes)
            })


        
    }

    public verifyEmail(token: string): object | never{
            const decoded = jwt.verify(token, this.appData.appSecret) as jwt.JwtPayload
            return {email: decoded.email, verification: "done",scope: {appName:this.appData.appName}}

    }

    public async sendPasswordResetEmail(email: string, passwordResetFormURL: string, validityInMinutes: number) {
        const transporter = this.getGmailTransporter()
        const token = jwt.sign({email: email}, this.appData.appSecret, {expiresIn: `${validityInMinutes}m` })
        
        await transporter.sendMail({
            from: `No Reply ${this.config.auth.user}`,
            to: email,
            subject: `Reset Password Link for ${this.appData.appName}`,
            html: renderPasswordResetEmailTemplate(this.appData.appName, `${passwordResetFormURL}?token=${token}`, validityInMinutes)
        })
    }

    public verifyPasswordResetLink(token: string){
        const decoded = jwt.verify(token, this.appData.appSecret) as jwt.JwtPayload
        return {email: decoded.email, verification: "done", scope: {appName: this.appData.appName}}
    }
}


