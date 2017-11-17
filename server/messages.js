

var messages = (function () {
    var instance;

    function createInstance() {
        return [];
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

/*
module.exports = {
    messages: messages
};
*/
module.exports.default = messages;