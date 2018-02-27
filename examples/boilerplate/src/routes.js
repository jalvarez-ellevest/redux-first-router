import { redirect } from 'redux-first-router'

export default {
  HOME: {
    path: '/',
    // beforeEnter: async (req) => {
    //   if (typeof window !== 'undefined' && req.history.entries.length > 2) await new Promise(res => setTimeout(res, 10000))
    //   if (typeof window !== 'undefined' && req.history.entries.length > 2) {
    //     const res = await req.dispatch({ type: 'LIST', params: { category: 'react' } })
    //   }
    // }
    beforeLeave: async ({ type }) => {
      await new Promise(res => setTimeout(res, 10000))
      return type === 'NOT_FOUND'
    }
  },
  LIST: {
    path: '/list/:category',
    thunk: async ({ params }) => {
      const { category } = params
      const packages = await fetch(`/api/category/${category}`)

      if (packages.length === 0) {
        return {
          type: 'LIST',
          params: { category: 'redux' }
        }
      }

      return { category, packages }
    }
  }
}

// this is essentially faking/mocking the fetch api
// pretend this actually requested data over the network

const fetch = async path => {
  await new Promise(res => setTimeout(res, 500))
  const category = path.replace('/api/category/', '')

  switch (category) {
    case 'redux':
      return ['reselect', 'recompose', 'redux-first-router']
    case 'react':
      return [
        'react-router',
        'react-transition-group',
        'react-universal-component'
      ]
    default:
      return []
  }
}
