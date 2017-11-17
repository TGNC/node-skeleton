

var messages = (function () {
    let instance;

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

module.exports.default = messages;