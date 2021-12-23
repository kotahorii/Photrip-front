import axios from 'axios'
import applyCaseMiddleware from 'axios-case-converter'

const options = {
  ignoreHeaders: true,
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: process.env.REACT_APP_REST_URL,
  }),
  options
)

export default client
