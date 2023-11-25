
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
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
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

    it.only('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('.createNewBlogButton').click()
      cy.contains('test title')
    })
  })
})