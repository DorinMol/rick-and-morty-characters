import axios from 'axios'

const buildEndpoint = (page) => {
  let endpoint = `https://rickandmortyapi.com/api/character`
  if (page) endpoint += `/?page=${page}`
  return endpoint
}

export const getCharacters = async (page) => {
  try {
    const response = await axios.get(buildEndpoint(page))
    return response.data
  } catch (error) {
    console.log('error > ', error)
  }
}
