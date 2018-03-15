export const api = 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getCommentsForPost = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)


export const remove = (contact) =>
  fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}/contacts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
