
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
          { title: 'test title', author: 'test author', url: 'test url', likes: 0 },
          { title: 'test title 2', author: 'test author 2', url: 'test url 2', likes: 0 },
          { title: 'test title 3', author: 'test author 3', url: 'test url 3', likes: 0 }
        ]

        for (const blog of dummyBlogs) {
          cy.createBlog(blog)
        }
      })

      it('User can like a blog', function() {
        cy.contains('test title test author').parent().as('blog')
        cy.get('@blog').contains('show details').click()
        cy.get('@blog').contains('like').click()
        cy.get('@blog').contains('likes 1')
      })

      it('User can delete a blog', function() {
        cy.contains('test title test author').parent().as('blog')
        cy.get('@blog').contains('show details').click()
        cy.get('@blog').contains('delete').click().should('not.exist')
      })

      describe('and a different uesr logs in', function() {
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
          cy.get('@blog').contains('likes 1')
        })

        // it.only('Different user cannot delete a blog', function() {
        //   cy.contains('test title test author').parent().as('blog')
        //   cy.get('@blog').contains('show details').click()
        //   cy.get('@blog').contains('delete').should('exist')
        // })

        it.only('Different user cannot see delete button', function() {
          cy.contains('test title test author').parent().as('blog')
          cy.get('@blog').contains('show details').click()
          cy.get('@blog').contains('delete').should('not.exist')
        })
      })
    })
  })
})