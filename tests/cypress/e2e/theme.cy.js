/**
 * The theme feature 
 *  should not have a theme when the page is loaded
 *  should have the dark theme when clicking on the theme button
 *  then should be saved in the local storage
 */
describe('The theme feature', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should not have a theme when the page is loaded', () => {
    cy.get('html').should('not.have.attr', 'data-theme')
  })
  it('should have the dark theme when clicking on the theme button', () => {
    // Act: click on the anchor with aria-label "Toggle theme"
    cy.get('a[aria-label="Toggle theme"]').click()
    // Assert: the theme should be dark
    cy.get('html').should('have.attr', 'data-theme', 'dark')
    // Assert: the theme should be saved in the local storage
    cy.window().then((win) => {
      const theme = win.localStorage.getItem('theme')
      expect(theme).to.equal('dark')
    })
  })
})
