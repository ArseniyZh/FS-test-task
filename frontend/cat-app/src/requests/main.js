export const BASE_URL = "http://85.143.172.98:8000/"
export const API = "api/"
export const USERS = "users/"
export const CATS = "cats/"

export const REGISTER_URL = BASE_URL + API + USERS + "registration/"
export const LOGIN_URL = BASE_URL + API + USERS + "login/"
export const LOGOUT_URL = BASE_URL + API + USERS + "logout/"
export const GET_NEW_ACCESS_TOKEN_URL = BASE_URL + API + USERS + "get_new_access_token/"
export const USER_INFO_URL = BASE_URL + API + USERS + "user_info/"

export const CAT_LIST_URL = BASE_URL + API + CATS + "list/"
export const CAT_UPDATE_URL = BASE_URL + API + CATS + "update/"
export const CAT_CREATE_URL = BASE_URL + API + CATS + "create/"
export const CAT_DELETE_URL = BASE_URL + API + CATS + "delete/"


export const registrationRequest = async (username, password) => {
    const data = {
        "username": username,
        "password": password
    }
    let response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    return response
}


export const loginRequest = async (username, password) => {
    const data = {
        "username": username,
        "password": password
    }
    let response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    return response
}

export const logoutRequest = async () => {
    const data = {
        "refresh": localStorage.getItem("refresh_token")
    }
    let response = await fetch(LOGOUT_URL, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response
}

export const getNewAccessTokenRequest = async () => {
    let response = await fetch(GET_NEW_ACCESS_TOKEN_URL + "?refresh_token=" + localStorage.getItem("refresh_token"), {
        method: "GEt",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem("access_token", data.access)
    }
    return response
}


export const userInfoRequest = async () => {
    let response = await fetch(USER_INFO_URL, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        await getNewAccessTokenRequest()
        response = await fetch(USER_INFO_URL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                'Content-Type': 'application/json',
            },
        });
    }
    return response
}


export const catListRequest = async () => {
    let response = await fetch(CAT_LIST_URL, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        await getNewAccessTokenRequest()
        response = await fetch(CAT_LIST_URL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                'Content-Type': 'application/json',
            },
        });
    }
    return response
}


export const catUpdateRequest = async (id, breed_title, nickname, age) => {
    const data = {
        "id": id,
        "breed_title": breed_title,
        "nickname": nickname,
        "age": age
    }
    let response = await fetch(CAT_UPDATE_URL, {
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        await getNewAccessTokenRequest()
        response = await fetch(CAT_UPDATE_URL, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    return response
}


export const catCreateRequest = async (breed_title, nickname, age) => {
    let data = {
        "breed_title": breed_title,
        "nickname": nickname,
        "age": age
    }
    let response = await fetch(CAT_CREATE_URL, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        await getNewAccessTokenRequest()
        response = await fetch(CAT_CREATE_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    return response
}


export const catDeleteRequest = async (id) => {
    const data = {
        "id": id
    }
    let response = await fetch(CAT_DELETE_URL, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token"),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === 401) {
        await getNewAccessTokenRequest()
        response = await fetch(CAT_DELETE_URL, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    return response
}