
import buildCaptchaCanvas from "./build-captcha-canvas";
const ALPHA_SET = '1abcdefghijkl2mnopqrst3uvwxyz4ABCDEFG5HI6KLMN7OP8QRSTUV9WXYZ';
const NUM_SET = "1234567890";
const OPT_SET = "*+-";


const randomString = ():string => {
    let result = "";
    for (let i = 0; i < 5; i++) {
        result += ALPHA_SET.charAt(Math.floor(Math.random() * ALPHA_SET.length));
    }
    return result;

};

// Create a new captcha and fill it with random text
export const getCaptcha =  (): {image: string, text: string}=>{
    const captchaText = randomString();
    const canvas = buildCaptchaCanvas(captchaText);
    return {
        image: canvas.toDataURL(),
        text: captchaText
    };

};
// Create a new captcha and fill it with random math
export const getMathCaptcha = (): {image:string, result: number}=>{
    const num1 = NUM_SET.charAt(Math.floor(Math.random() * NUM_SET.length));
    const num2 = NUM_SET.charAt(Math.floor(Math.random() * NUM_SET.length));
    const opt = OPT_SET.charAt(Math.floor(Math.random() * OPT_SET.length));
    const math = num1 + opt + num2;

    const canvas = buildCaptchaCanvas(math);
    return {
        image: canvas.toDataURL(),
        result: eval(math) as number
    };
};



