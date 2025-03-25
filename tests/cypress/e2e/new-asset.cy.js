/**
 * Given a new asset page visited 
 * When fill the form and submit
 * Then the asset should be created
 */
describe('Given a new asset page visited', () => {
  beforeEach(() => {
    cy.visit('/assets/new');
  });
  describe('When fill the form and submit', () => {
    beforeEach(() => {
      cy.get('#categoryId').select('4');
      cy.get('#symbol').select('NVDA');
      cy.get('#quantity').clear().type('2');
    });
    it('Then the asset should be created', () => {
      cy.get('[type="submit"]').click();
      cy.window().then((win) => {
        const assets = JSON.parse(win.localStorage.getItem('assets'));
        const asset = assets.find((a) => a.symbol === 'NVDA');
        expect(asset).to.exist;
        expect(asset.quantity).to.equal(2);
      });
      // Go to the home page
      cy.get('a[aria-label="Home"]').click();
      // NVDA should be in the list
      cy.get('tbody').should('contain', 'NVDA');
    });
  });
});
