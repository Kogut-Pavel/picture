const postData = async (url, data) => { // Отправка запроса
    let res = await fetch(url, {
        method: "POST",
        body: data,
    });

    return await res.text();
};

const getResource = async (url) => { // Получение данных
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {postData, getResource};