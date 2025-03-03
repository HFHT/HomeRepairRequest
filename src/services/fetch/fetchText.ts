// performs a request and resolves with Text
export const fetchText = async (url: string, init = {}) => {
    const res = await fetch(url, init);
    console.log(res);
    let response = await res.text();
    if (response !== 'Ok') {
        throw new Error(`Save failed, try again later: ${response}`)
    }
    return response;
};