describe('Basic app flow', () => {
  it('loads home and navigates to a product', () => {
    cy.visit('/');
    cy.contains('Products');
    cy.get('a').first().click();
    cy.location('pathname').should('include', '/product/');
  });
});