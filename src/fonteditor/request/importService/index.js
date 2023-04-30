import service from "../index";

const api = '/api'

export const getOlByUrl = (params) => {
    return service({
        method: 'GET', url: api + '/online/getOnlineByUrl', params
    });
}