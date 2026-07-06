const isValidToken = (token: string): boolean => {
    if(!token) return false;

    const payload = token.split(".")[1];
    if(!payload) return false;

    const decodedPayload = JSON.parse(atob(payload));

    const expiryTime = decodedPayload.exp *1000;
    const currentTime = Date.now();

    return currentTime < expiryTime;
};

export {isValidToken};