export const saveUser = (user) => {
    if(user.accessToken){
        localStorage.setItem('user', JSON.stringify(user))
    }
}

export const getUser = () => {
    let serializedUser = localStorage.getItem('user');

    if(serializedUser){
        let user = JSON.parse(serializedUser);

        return user;
    }
}

export const getToken = () => {
    return getUser()?.accessToken
}

export const getUserId = () => {
    return getUser()?._id
}
export const deleteUser = () => {
    localStorage.removeItem('user')
}

export const login = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3030/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if (response.ok != true){
            const error = await response.json();
            
            throw new Error(error.message);
        } else {
            const user = await response.json();
            saveUser(user);

            return user
        }
    } catch (err){
        alert(err.message);
        throw err;
    }
}

export const register = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3030/users/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })

        if (response.ok != true){
            const error = await response.json();
            
            throw new Error(error.message);
        } else {
            const user = await response.json();
            saveUser(user);

            return user
        }
    } catch (err){
        alert(err.message);
        throw err;
    }
}

export const logout = () => {

    return fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': getToken()
        }
    })
        .then(() => deleteUser())
}