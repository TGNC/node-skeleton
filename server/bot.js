let messages = require('./messages').default;
const randomResponses = [
    'I don\'t know what you are talking about.',
    'Please be more specific.',
    'I am not that smart, be more clear!',
    'I am too old for this job..'
];

/**
 * Check if the next message might be a good answer, to determine if the bot should return it
 * */
function messageMightBeGoodAnswer(message) {
    if (message
        && !message.isBot
        && messageNotContainBot(message)
        && message.text.indexOf('don\'t know') === -1) {
        return true;
    }

    return false
}

function messageNotContainBot(message) {
    if (message
        && message.text.indexOf('@bot') === -1
        && message.text.indexOf('bot') === -1) {
        return true;
    }

    return false;
}

function checkHistoryResponse(msgText) {
    //Running on the messages backwards so the last answers will be used
    for (let i = messages.getInstance().length - 1; i > 0; i--) {

        let currentMessage = messages.getInstance()[i];
        if (msgText.toLowerCase().indexOf(currentMessage.text.toLowerCase()) !== -1 && messageNotContainBot(currentMessage)) {
            //If the sentence was already used before, it's response might be the next message
            if (messageMightBeGoodAnswer(messages.getInstance()[i + 1])) {
                return 'The answer might be: ' + messages.getInstance()[i + 1].text;
            } else {
                //The bot don't know the answer because no one answered it
                return 'I am still waiting for the answer like you..'
            }
        }
    }

    return false;
}

function randomResponse() {
    let randomIndex = Math.floor(Math.random() * randomResponses.length);

    return randomResponses[randomIndex];
}

function run(msgText) {
    console.log('bot messages', JSON.stringify(messages.getInstance()));

    //Check if there was a reference for the bot
    if (msgText.indexOf('@bot') === -1 && msgText.indexOf('bot') === -1) {
        return false; //There was no reference to the bot.
    }

    //Check if the bot know the question
    let historyResult = checkHistoryResponse(msgText);
    if (historyResult) {
        return historyResult;
    }

    //Answer random response
    return randomResponse();

}

module.exports = {
    run: run
};