import bcrypt from "bcrypt"

export const genrateHashing = ({ plainText = "", salt = process.env.SALT }) => {
    const hash = bcrypt.hashSync(plainText, parseInt(salt))
    return hash
}
export const compareHashing = ({ plainText = "", hashingValue = "" }) => {
    const hash = bcrypt.compareSync(plainText, hashingValue)
    return hash
}