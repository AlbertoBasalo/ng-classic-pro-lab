describe('Assets Board', () => {
  it('should visit the home page', () => {
    cy.visit('/')
  })
  it('should have a title', () => {
    cy.visit('/')
    cy.get('article > header h2').should('contain', 'Assets Board')
  })
  it('should have a table with 6 asset rows', () => {
    cy.visit('/')
    cy.get('table tbody tr').should('have.length', 6)
  })
})