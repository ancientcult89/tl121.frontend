export const badHttpRequestHandler = (e) => {
    if(Number(e.response.status) === 400)
    {
        return e.response.data.description;
    }
    else
    {
        return null;
    }
}