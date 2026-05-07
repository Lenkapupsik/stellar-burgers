/// <reference types="cypress" />

Cypress.Commands.add('addIngredient', (name: string) => {
  cy.contains('[data-testid=ingredient-item]', name)
    .should('be.visible')
    .within(() => {
      cy.contains('button', 'Добавить').click();
    });
});

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredient(name: string): Chainable<void>;
    }
  }
}