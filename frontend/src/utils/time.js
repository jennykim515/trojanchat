export const getTimestamp = () => `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' }
)}`;