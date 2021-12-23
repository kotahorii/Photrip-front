export const userRes = {
  id: 2,
  name: 'takashi4 update',
  image: {
    url: 'sample.jpg',
  },
  email: 'user0@gmail.com',
  createdAt: '2021-11-29T11:24:42.980Z',
  updatedAt: '2021-11-29T11:28:32.029Z',
  introduction: 'testtest',
  prefecture: 1,
}
export const postRes = {
  id: 3,
  userId: 1,
  title: 'iiiiii',
  body: 'iiiiiiiiii',
  prefecture: 'prefecture',
  city: 'city',
  town: 'town',
  createdAt: '2021-12-23T06:24:51.999Z',
  image: {
    url: 'sample.jpg',
  },
  lat: 3.2,
  lng: 3.2,
  favorites: [
    {
      id: 3,
      userId: 1,
      postId: 3,
      createdAt: '2021-12-23T06:24:51.999Z',
      updatedAt: '2021-12-23T06:24:51.999Z',
    },
  ],
  comments: [
    {
      id: 1,
      userId: 1,
      postId: 3,
      comment: 'aiueo',
      createdAt: '2021-12-23T06:29:33.076Z',
      updatedAt: '2021-12-23T06:29:33.076Z',
    },
  ],
  labels: [
    {
      id: 1,
      userId: 1,
      postId: 3,
      name: 'takashiest',
      createdAt: '2021-12-23T06:45:26.896Z',
      updatedAt: '2021-12-23T06:45:26.896Z',
    },
  ],
  rates: [
    {
      id: 1,
      userId: 1,
      postId: 3,
      rate: 4.0,
      createdAt: '2021-12-23T06:41:20.397Z',
      updatedAt: '2021-12-23T06:43:30.191Z',
    },
  ],
}
export const comment = {
  id: 2,
  comment: 'test update',
  userId: 2,
  postId: 3,
  createdAt: '2021-11-29T12:33:57.621Z',
  updatedAt: '2021-11-29T12:33:57.621Z',
}
export const favorite = {
  id: 1,
  userId: 2,
  postId: 3,
  createdAt: '2021-11-29T12:38:05.237Z',
  updatedAt: '2021-11-29T12:38:05.237Z',
}
export const rate = {
  id: 1,
  rate: 3.0,
  userId: 2,
  postId: 3,
  createdAt: '2021-11-29T12:43:42.722Z',
  updatedAt: '2021-11-29T12:44:02.921Z',
}
export const label = {
  id: 2,
  postId: 3,
  userId: 2,
  createdAt: '2021-12-02T11:31:46.326Z',
  updatedAt: '2021-12-02T11:31:46.326Z',
  name: 'testlabel',
}
