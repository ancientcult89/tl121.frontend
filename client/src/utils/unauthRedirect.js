export const unauthRedirect = (e) => {
    if(e.code !== 'ERR_NETWORK' && Number(e.response.status) === 401)
    {
        localStorage.setItem('role', '');
        window.location.href = '/';
    }
}