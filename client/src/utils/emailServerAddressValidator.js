function isValidMailServerAddress(address) {
    const mailServerPattern = new RegExp(
        '^' +
        // Доменное имя с обязательным TLD и без порта
        '(([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}' +
        '$'
    );

    return mailServerPattern.test(address);
}