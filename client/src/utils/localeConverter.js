export const localeConverter = {
    stringToId: (localeName) => {
        if(localeName === 'en-US')
            return 0;
        if(localeName === 'ru-RU')
            return 1;
        return 0;
    },
    idToString: (localeId) => {
        if(localeId === 0)
            return 'en-US';
        if(localeId === 1)
            return 'ru-RU';
        return 'en-US';
    }
}