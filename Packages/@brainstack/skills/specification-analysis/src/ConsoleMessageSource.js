const readlineSync = require('readline-sync')
class ConsoleMessageSource {
    async receiveMessage() {
        return readlineSync.question("==> ");
    }

    async sendMessage(message) {
        console.log(message);
    }
}
exports.ConsoleMessageSource = ConsoleMessageSource;
