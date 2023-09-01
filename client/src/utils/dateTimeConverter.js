export default class dateTimeConverter {
    static datePickerToDate (date) {
        const separator = '-'
        let day, month, year;
        //корректировка datepicker который месяц считает на 1 меньше
        month = date.$M + 1;
        day = date.$D;
        year = date.$y;

        //добавляем ведущие нули для правильного формирования даты
        if (month < 10)
            month = '0' + month;
        if(day < 10)
            day = '0' + day;

        return year + separator + month + separator + day
    }

    static dateBackEndToDatePicker(date) {
        const separator = '-'
        if(date != null) {
            let year = date.slice(0,4);
            let month = date.slice(5,7);
            let day = date.slice(8,10);

            const res = year + separator + month + separator + day;
            return res;
        }
    }
}