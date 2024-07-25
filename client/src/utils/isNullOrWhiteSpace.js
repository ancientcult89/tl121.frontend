export function isNullOrWhiteSpace(input) {
    // Преобразуем входное значение в строку, если это не null и не undefined
    const stringInput = input !== null && input !== undefined ? String(input) : '';

    // Проверяем, является ли строка пустой или содержит только пробелы
    return !stringInput || stringInput.trim().length === 0;
}