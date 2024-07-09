const ENG_NAME_LIST = [
    'David Smith',
    'Yueling Zhang',
    'Huawen Wu',
    'Annie Lee',
]

const CN_NAME_LIST = [
    '大卫斯密斯',
    '月林张',
    '华文吴',
    '安妮李',
]

const AWS = require('aws-sdk');
// const { Configuration, OpenAIApi } = require('openai');
// import OpenAI from "openai";
const OpenAI = require('openai')

AWS.config.update({region: 'ap-southeast-2'});

exports.lambdaHandler = async (event) => {
    try {
        const input = JSON.parse(event.body);
        const inputName = input.inputName
        const chatGPTSecret = await exports.getSecretFromSecretsManager();
        const openai = await exports.getOpenAIObject(chatGPTSecret);
        let nameList1 = CN_NAME_LIST
        let nameList2 = ENG_NAME_LIST
        if (isEnglishName(inputName)) {
            nameList1 = ENG_NAME_LIST
            nameList2 = CN_NAME_LIST
        }

        const prompt = `I have a list of names [${nameList1.join(', ')}]. Which of them best matches '${inputName}'? Respond with only the full list item.`;

        const gptResponse = await exports.getChatGPTPrompt(openai, prompt);
        // const resp = `The best match for ${inputName} is: ${gptResponse}`
        
        const nameIndex = nameList1.indexOf(gptResponse)
        const resp = `The best match for ${inputName} is ${nameList1[nameIndex]} (${nameList2[nameIndex]})`

        return {
            statusCode: 200,
            body: JSON.stringify(resp)
        }
    } catch (error) {
        console.log(error);
        console.log(event.body);
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}

exports.getSecretFromSecretsManager = async () => {
    const secretsmanager = new AWS.SecretsManager();
    const params = {
        SecretId: process.env.SECRET_NAME
    };
    const data = await secretsmanager.getSecretValue(params).promise();
    return data.SecretString;
}

exports.getOpenAIObject = async (apiKey) => {
    // const configuration = new Configuration({
    //     apiKey: apiKey,
    // });
    // const openai = new OpenAIApi(configuration);
    const openai = new OpenAI({
        apiKey: apiKey,
    });
    return openai;
}

exports.getChatGPTPrompt = async (openai, input) => {

    const response = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: input,
        max_tokens: 50,
    });
    return response.choices[0].text.trim();
}

function isEnglishName(name) {
    return /^[a-zA-Z ]*$/.test(name);
}