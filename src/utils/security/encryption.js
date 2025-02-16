import CryptoJS from "crypto-js"

export const genrateEncryption = ({ plainText = "", signture = process.env.ENC_SIGNTURE }) => {
    const Encryption = CryptoJS.AES.encrypt(plainText, signture).toString()
    return Encryption
}
export const decryptionEncryption = ({ cipherText = "", signture = process.env.ENC_SIGNTURE }) => {
    const Encryption = CryptoJS.AES.decrypt(cipherText, signture).toString(CryptoJS.enc.Utf8)
    return Encryption
}