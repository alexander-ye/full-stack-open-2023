
Cypress.Commands.add('createBlog', ({ title, author, url, likes=0 }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
    }
  })

  cy.visit('')
})

describe('Blog app', function() {
  beforeEach(function() {
    // Empty the database each time tests are run
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // Create a new user each time tests are run
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
    const user2 = {
      name: 'Oobie Doobie Banoobie',
      username: 'gkenobi',
      password: 'master'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form shown on load by default', function() {
    cy.get('#login-username').should('exist')
    cy.get('#login-password').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      // login as root user
      cy.get('#login-username').type('root')
      cy.get('#login-password').type('sekret')
      cy.get('#login-submit-button').click()
      // ensure login was successful
      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      // login as root user
      cy.get('#login-username').type('anakin')
      cy.get('#login-password').type('isajedimasterwholikessand')
      cy.get('#login-submit-button').click()
      // ensure login was successful
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: 'root', password: 'sekret'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('.createNewBlogButton').click()
      cy.contains('test title')
    })

    describe('and multiple blogs exists', function() {
      beforeEach(function() {
        const dummyBlogs = [
          { title: 'test title', author: 'test author', url: 'test url', likes: 1 },
          { title: 'test title 2', author: 'test author 2', url: 'test url 2', likes: 6 },
          { title: 'test title 3', author: 'test author 3', url: 'test url 3', likes: 5 },
          { title: 'test title 4', author: 'test author 4', url: 'test url 4', likes: 3 },
        ]

        for (const blog of dummyBlogs) {
          cy.createBlog(blog)
        }
      })

      it('User can like a blog', function() {
        cy.contains('test title test author').parent().as('blog')
        cy.get('@blog').contains('show details').click()
        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 2')
      })

      it('User can delete a blog', function() {
        cy.contains('test title test author').parent().as('blog')
        cy.get('@blog').contains('show details').click()
        cy.get('@blog').contains('delete').click().should('not.exist')
      })

      describe('and a different user logs in', function() {
        beforeEach(function () {
          cy.contains('log out').click()
          cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
            username: 'gkenobi', password: 'master'
          }).then(response => {
            localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
            cy.visit('')
          })
        })

        it('Different user can like a blog', function() {
          cy.contains('test title test author').parent().as('blog')
          cy.get('@blog').contains('show details').click()
          cy.get('@blog').contains('like').click()
          cy.get('@blog').contains('likes 2')
        })

        // it('Different user cannot delete a blog', function() {
        //   cy.contains('test title test author').parent().as('blog')
        //   cy.get('@blog').contains('show details').click()
        //   cy.get('@blog').contains('delete').should('exist')
        // })

        it('Different user cannot see delete button', function() {
          cy.contains('test title test author').parent().as('blog')
          cy.get('@blog').contains('show details').click()
          cy.get('@blog').contains('delete').should('not.exist')
        })
      })

      describe('blogs are sorted from most liked to least liked', function() {
        it('blogs are sorted correctly', function() {
          cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).contains('test title 2 author 2')
            cy.wrap(blogs[1]).contains('test title 3 author 3')
            cy.wrap(blogs[2]).contains('test title 4 author 4')
            cy.wrap(blogs[3]).contains('test title author')
          })
        })

        it('blogs ares sorted correctly after liking a blog', function() {
          cy.contains('test title test author').parent().as('blog')
          cy.get('@blog').contains('show details').click()
          for (let i = 0; i < 6; i++) {
            cy.get('@blog').contains('like').click()
          }
          cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).contains('test title test author')
            cy.wrap(blogs[1]).contains('test title 2 test author 2')
            cy.wrap(blogs[2]).contains('test title 3 test author 3')
            cy.wrap(blogs[3]).contains('test title 4 test author 4')
          })
        })
      })
    })
  })
})