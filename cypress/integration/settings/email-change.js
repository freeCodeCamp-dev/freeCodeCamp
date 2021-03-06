/* global cy */
describe('Email input field', () => {
  before(() => {
    cy.login();
    cy.visit('/settings');
  });

  it('Should be possible to submit the new email', () => {
    cy.get('[id=new-email]')
      .type('bar@foo.com')
      .should('have.attr', 'value', 'bar@foo.com');

    cy.get('[id=confirm-email]')
      .type('bar@foo.com')
      .should('have.attr', 'value', 'bar@foo.com');

    cy.get('[id=form-update-email]').within(() => {
      cy.contains('Save').click();
    });
  });

  it('Displays an error message when there are problems with the submitted emails', () => {
    cy.get('[id=confirm-email]').clear().type('foo@bar.com');

    cy.get('[class=help-block]').contains(
      'Both new email addresses must be the same'
    );

    cy.get('[id=new-email]').clear().type('foo@bar.com');

    cy.get('[class=help-block]').contains(
      'This email is the same as your current email'
    );
  });

  it('Should be possible to get Quincys weekly email', () => {
    cy.contains('Yes please').click();
  });
});
