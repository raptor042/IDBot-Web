import { ethers } from "ethers"

export const validateEmail = email => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    console.log(email.match(emailFormat))

    if(email.match(emailFormat)) {
        return true
    } else {
        return false
    }
}

export const validateAddress = address => {
    console.log(ethers.isAddress(address))

    return ethers.isAddress(address)
}

export const validateAge = age => {
    if(age >= 18 || age <= 80) {
        return true
    } else {
        return false
    }
}

export const validatePhone = phone => {
    const phoneFormat = /^\+?([0-9]{1,3})\)?[ ]?([0-9]{10,12})/
    console.log(phone.match(phoneFormat))

    if(phone.match(phoneFormat)) {
        return true
    } else {
        return false
    }
}