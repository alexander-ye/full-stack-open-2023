const dummyListWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    user: {
      username: "hellas",
      name: "Arto Hellas",
      id: "5cfde19dde5f227463ff6a4c"
    },
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
];

const dummyUsers = [
  {
    username: "mluukkai",
    name: "Matti Luukkainen",
    id: "5cfde192de5f227463ff6a4b",
    blogs: [
      {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        id: "5a422a851b54a676234d17f7",
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        id: "5a422b891b54a676234d17fa",
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        id: "5a422ba71b54a676234d17fb",
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        id: "5a422bc61b54a676234d17fc",
      },
    ]
  },
  {
    username: "hellas",
    name: "Arto Hellas",
    id: "5cfde19dde5f227463ff6a4c",
    blogs: [
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright",
        id: "5a422aa71b54a676234d17f8",
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions",
        id: "5a422b3a1b54a676234d17f9",
      },
    ]
  },
]

const dummyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5cfde192de5f227463ff6a4b"
    },
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    user: {
      username: "hellas",
      name: "Arto Hellas",
      id: "5cfde19dde5f227463ff6a4c"
    },
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    user: {
      username: "hellas",
      name: "Arto Hellas",
      id: "5cfde19dde5f227463ff6a4c"
    },
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5cfde192de5f227463ff6a4b"
    },
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5cfde192de5f227463ff6a4b"
    },
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    user: {
      username: "mluukkai",
      name: "Matti Luukkainen",
      id: "5cfde192de5f227463ff6a4b"
    },
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
];

module.exports = {
  dummyListWithOneBlog,
  dummyBlogs
}