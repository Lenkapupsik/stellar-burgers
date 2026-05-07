/// <reference types="cypress" />

const API = '**';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients*`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('GET', `${API}/auth/user*`, {
      fixture: 'user.json',
    }).as('getUser');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh');
      },
    });

    cy.setCookie('accessToken', 'test-access');

    cy.wait('@getIngredients');

    cy.get('[data-testid=ingredient-item]', { timeout: 10000 })
      .should('exist');
  });

  it('добавляет ингредиенты', () => {
    cy.addIngredient('Булка');
    cy.addIngredient('Соус');

    cy.get('[data-testid=constructor]')
      .should('contain.text', 'Булка')
      .and('contain.text', 'Соус');
  });

  it('открывает модалку ингредиента', () => {
    cy.contains('[data-testid=ingredient-item]', 'Булка').click();

    cy.get('[data-testid=modal]')
      .should('be.visible')
      .and('contain.text', 'Булка');

    cy.get('[data-testid=close]').click();
    cy.get('[data-testid=modal]').should('not.exist');
  });

  it('закрывает модалку по overlay', () => {
    cy.contains('[data-testid=ingredient-item]', 'Булка').click();

    cy.get('[data-testid=overlay]').click({ force: true });

    cy.get('[data-testid=modal]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API}/ingredients*`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    cy.intercept('GET', `${API}/auth/user*`, {
      fixture: 'user.json',
    }).as('getUser');

    cy.intercept('POST', `${API}/orders*`, {
      fixture: 'order.json',
    }).as('createOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh');
      },
    });

    cy.setCookie('accessToken', 'test-access');

    cy.wait('@getIngredients');

    cy.get('[data-testid=ingredient-item]', { timeout: 10000 })
      .should('exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('создаёт заказ и очищает конструктор', () => {
    cy.addIngredient('Булка');
    cy.addIngredient('Соус');

    cy.get('[data-testid=order-button]').click();

    cy.wait('@createOrder');

    cy.get('[data-testid=modal]')
      .should('be.visible')
      .and('contain.text', '12345');

    cy.get('[data-testid=close]').click();

    cy.get('[data-testid=constructor]')
      .should('not.contain.text', 'Соус');
  });
});
