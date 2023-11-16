export const notFoundHttpRequestHandler = (e) => {
    if(Number(e.response.status) === 404)
    {
        return e.response.data.description;
    }
    else
    {
        return null;
    }
}