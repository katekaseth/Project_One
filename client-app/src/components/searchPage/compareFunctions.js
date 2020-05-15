export const a_zSort = (a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
    return 0;
};

export const z_aSort = (a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
    if (b.title.toLowerCase() < a.title.toLowerCase()) return -1;
    return 0;
};

export const mostRecentSort = (a, b) => {
    if (a.updated < b.updated) return 1;
    if (b.updated < a.updated) return -1;
    return 0;
};

export const leastRecentSort = (a, b) => {
    if (a.updated > b.updated) return 1;
    if (b.updated > a.updated) return -1;
    return 0;
};
