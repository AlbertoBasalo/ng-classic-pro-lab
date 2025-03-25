/**
 * Given the symbols page
 * When the page is loaded
 * Then the symbols should be displayed
 */
describe('Given the stocks page', () => {
  beforeEach(() => {
    cy.visit('/symbols');
  });
  describe('When the page is loaded', () => { 
    it('Then the symbols list should be displayed', () => {
      cy.get('ul[aria-label="Symbols list"]').find('li').should('have.length', 37);
    });
  });
  describe('When the user search for a symbol', () => {
    beforeEach(() => {
      cy.get('input[type="search"]').clear().type('NVDA');
    });
    it('Then the symbol should be displayed', () => {
      cy.get('ul[aria-label="Symbols list"]').find('li').should('contain', 'NVDA');
    });
  });
  describe('When the user search for a a category', () => {
    beforeEach(() => {
      cy.get('input[type="search"]').clear().type('Stocks');
    });
    it('Then the symbols should be displayed and the query param should be updated', () => {
      cy.get('ul[aria-label="Symbols list"]').find('li').should('have.length', 11);
      cy.location('search').should('contain', 'search=Stocks');
    });
  });
});
describe('Given the symbols page with a filter', () => {
  beforeEach(() => {
    cy.visit('/symbols?search=Crypto');
  });
  describe('When the page is loaded', () => {
    it('Then the symbols should be displayed and the search term should be displayed', () => {
      cy.get('input[type="search"]').should('have.value', 'Crypto');
      cy.get('ul[aria-label="Symbols list"]').find('li').should('have.length', 6);
    });
  });
});

