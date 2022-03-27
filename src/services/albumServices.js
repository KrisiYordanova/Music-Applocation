import * as authService from './authServices.js';

export const getAll = () => {
    return fetch('http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name').then(res => res.json())
}

export const create = (album) => {
    const accessToken = authService.getToken();

    return fetch('http://localhost:3030/data/albums', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": accessToken
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
}

export const getOne = (albumId) => {
    return fetch(`http://localhost:3030/data/albums/${albumId}`).then(res => res.json())
}

export const edit = (album, albumId) => {
    const accessToken = authService.getToken();

    return fetch(`http://localhost:3030/data/albums/${albumId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": accessToken
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
}

export const deleteAlbum = async (albumId) => {
    const accessToken = authService.getToken();

    try {

        let confirmed = confirm('Are you sure you want to delete the album?')

        if(confirmed){
            const response = await fetch(`http://localhost:3030/data/albums/${albumId}`, {
            method: 'DELETE',
            headers: {
                'X-Authorization': accessToken
            }
            })

            if(!response.ok){
                const error = await response.json();
                throw new Error(error.message)
            } else {
                const data = await response.json();
                return data;

            }
        }
    } catch (err) {
        alert('The album is not deleted');
        throw err;
    }
}

export const search = (searchText) => {
    const query = encodeURIComponent(`name LIKE "${searchText}"`)
    return fetch(`http://localhost:3030/data/albums?where=${query}`)
        .then(res => res.json())
}