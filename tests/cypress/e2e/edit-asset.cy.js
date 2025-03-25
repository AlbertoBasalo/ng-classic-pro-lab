/**
 * Given an asset edit page visited
 *  When change quantity and submit
 *  Then the quantity should be updated
 */
describe('Given an asset edit page visited', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click()
  })
  describe('When change quantity and submit', () => {
    beforeEach(() => {
      cy.get('#quantity').clear().type('2').blur();
      cy.get('[type="submit"]').click();
    })
    it('Then the quantity should be updated', () => {
      // the item on local storage should be updated
     cy.window().then((win) => {
        const assets = JSON.parse(win.localStorage.getItem('assets'));
        expect(assets[0].quantity).to.equal(2);
     })
    })
  })
})


