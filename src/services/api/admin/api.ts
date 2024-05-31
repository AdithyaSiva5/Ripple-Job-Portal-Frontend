import axios from "axios"

import {BASE_URL} from '../../../constants/baseUrls'

export const adminApi = axios.create({
    baseURL: `${BASE_URL}/api`,
})