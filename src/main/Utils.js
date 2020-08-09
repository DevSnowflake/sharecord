const CONSTANTS = {
    ERRORS: {
        NO_CONTENT: "204: No Content",
        ANONYMOUS_USER: "401: Anonymous User",
        INVALID_USER: "402: Invalid User"
    }
}

function parseID (id) {
    try {
        const userString = Buffer.from(id, "base64").toString();
        const userJSON = JSON.parse(userString);
        const isValid = validateUser(userJSON);
        return isValid ? userJSON : false;
    } catch (e) {
        return null;
    }
}

function validateUser(user) {
    if (
        !user ||
        typeof user !== "object" ||

        !user.username ||
        typeof user.username !== "string" ||

        !user.discrim ||
        typeof user.discrim !== "number" ||

        !user.createdAt ||
        typeof user.createdAt !== "number"
    ) return false;
    return true;
}

module.exports = {
    CONSTANTS,
    parseID,
    validateUser
}