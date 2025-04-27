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
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#firstName').type('Erick')
    cy.get('#lastName').type('Felix')
    cy.get('#email').type('emailError.com')
    cy.get('#phone').type('1299998888')
    cy.contains('button', 'Enviar').click()
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
  cy.contains('button', 'Enviar').click()
  // verificacao
  cy.get('.error').should('be.visible')
 })

 it('preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
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

 it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
  cy.get('#phone-checkbox').click()
  cy.contains('button', 'Enviar').click()
  // verificacao
  cy.get('.error').should('be.visible')
 })

 it('envia o formulário com sucesso usando um comando customizado', () => {
  const data = {
    firstName: "Lilian",
    lastName: "Beatriz",
    email: "lika@email.com",
    phone: "12999998888",
    text: "TESTE_DELA"
  } 
  cy.fillMandatoryFieldsAndSubmit(data)
  cy.contains('button', 'Enviar').click()
  cy.get('.success').should('be.visible')
 })

 it('envia o formuário com sucesso usando um cy.contais', () => {
  cy.fillMandatoryFieldsAndSubmit()
  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
 })
})