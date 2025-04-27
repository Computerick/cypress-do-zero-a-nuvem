describe('Central de Atendimento ao Cliente TAT', () => { //define a suite de testes
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verificar o título da aplicação', () => { // define o caso de teste
    cy.title().should('eq','Central de Atendimento ao Cliente TAT') // verificação que deve ter o titulo 
  })

  it('preenche os campos obrigatorios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxzwuyz', 10)
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('erick@email.com')
    cy.get('#phone').type('1299998888')
    //cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#open-text-area').type(longText)
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('emailError.com')
    cy.get('#phone').type('1299998888')
    cy.get('button[type="submit"]').click()
    //verificacao
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um telefone inválido', () =>{
    cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '')
  })

 it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário' ,() => {
  cy.get('#firstName').type('Erick')
  cy.get('#lastName').type('Felix')
  cy.get('#email').type('emailError.com')
  cy.get('#phone-checkbox').click()
  cy.get('button[type="submit"]').click()
  // verificacao
  cy.get('.error').should('be.visible')
 })

 it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
  after
  
  cy.get('#firstName')
    .type('Erick')
    .should('have.value','Erick')
    .clear()
    .should('have.value','')
  cy.get('#lastName')
    .type('Felix')
    .should('have.value','Felix')
    .clear()
    .should('have.value','')
  cy.get('#email')
    .type('erick@email.com')
    .should('have.value','erick@email.com')
    .clear()
    .should('have.value','')
  cy.get('#phone')
    .type('1299998888')
    .should('have.value','1299998888') 
    .clear()
    .should('have.value','')
 })
})