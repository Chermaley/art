const postData = async (url, data) =>{

    let res = await fetch(url, { //Ставим await чтобы дождаться завершения отправки
        method: "POST",
        body: data
    });
    return await res.text(); //Ставим await чтобы дождаться ответа
};

const getResource = async (url) =>{
    let res = await fetch(url);  //Ставим await чтобы дождаться завершения отправки)

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); //Ставим await чтобы дождаться ответа
};

export {postData, getResource};