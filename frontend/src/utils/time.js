export const getTimestamp = (number = new Date().getTime()) => {
    const date = new Date(number);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString(
        [],
        { hour: '2-digit', minute: '2-digit' }
    )}`;
};