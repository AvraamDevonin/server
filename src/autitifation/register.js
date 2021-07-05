

function register(body) {
    const data = JSON.parse(Object.keys(body)[0]);
    return data;
}

module.exports = register;