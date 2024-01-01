function serializeMessage(message) {
    return JSON.stringify(message);
}

function deserializeMessage(data) {
    if (Buffer.isBuffer(data)) {
        return JSON.parse(data.toString('utf-8'));
    } else if (typeof data === 'string') {
        return JSON.parse(data);
    }
    throw new Error('Unsupported data type');
}

const isJsonString = (data) => {
    try {
        JSON.parse(data);
        return true;
    } catch (err) {
        return false;
    }
};
