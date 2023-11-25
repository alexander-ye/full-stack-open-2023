
describe('Blog app', function() {
  beforeEach(function() {
    // Empty the database each time tests are run
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // Create a new user each time tests are run
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
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
})