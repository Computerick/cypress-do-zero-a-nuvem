describe('Central de Atendimento ao Cliente TAT', () => { //define a suite de testes
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verificar o título da aplicação', () => { // define o caso de teste
    cy.title().should('eq','Central de Atendimento ao Cliente TAT') // verificação que deve ter o titulo 
  })

  it.only('preenche os campos obrigatorios e envia o formulário', () => {
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('erick@email.com')
    cy.get('#phone').type('1299998888')

    cy.get('#open-text-area').type('Obrigado!')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

})