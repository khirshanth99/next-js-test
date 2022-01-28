import axios from "axios"

export const getExhibitionApi = (data) => {
    axios.get(`https://api.artic.edu/api/v1/exhibitions?limit=${data}`)
    .then((res) => {
        return res?.data?.data
    })
    .catch((err) => {
        return err
    })
}