export const encrypt = async text => {
    const response = await fetch("https://idbot-80bt.onrender.com/encrypt", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ text })
        })
    const data = await response.text()
    console.log(data)

    return data
}

export const decrypt = async text => {
    const response = await fetch("https://idbot-80bt.onrender.com/decrypt", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ text })
        })
    const data = await response.text()
    console.log(data)

    return data
}