import service from "../index";

const api = '/api'

export const login = (data) => {
    return service({
        method: 'POST', url: api + '/login', data
    });
}