Cypress.Commands.add('fillMandatoryFieldsAndSubmitHard', () => {
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('erick@email.com')
    cy.get('#phone').type('1299998888')
    cy.get('#open-text-area').type("TESTE")
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    //Valores padrao para campos
    firstName: 'John',
    lastName: 'Done',
    email: 'john@email.com',
    phone: '120987654321',
    text: 'Test.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    //cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})