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
  cy.get('#phone-checkbox').check()
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
    firstName: "Livia",
    lastName: "Silvia",
    email: "livia@email.com",
    phone: "12999998888",
    text: "TESTE_DELA"
  } 
  cy.fillMandatoryFieldsAndSubmit(data)
  cy.contains('button', 'Enviar').click()
  cy.get('.success').should('be.visible')
 })

 it('envia o formulário com sucesso usando um cy.contais', () => {
  cy.fillMandatoryFieldsAndSubmit()
  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
 })

 it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
 })

 it('seleciona um produto (Mentoria) por seu valor', () => {
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
 })

 it('seleciona um produto (Blog) por seu indice', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
 })

 it('seleciona um produto aleatório no select', () => {
  cy.get('select option')
    .not('[disabled]')
    .its('length').then(n => {
      cy.get('select').select(Cypress._.random(1, n))
    })
 })

 it('marca o tipo de atendimento "Feedback"', () => {
  cy.get('input[type="radio"][value="feedback"]')
    .check()

    .should('be.checked')
 })

 it('marca o tipo de atendimento', () => {
  cy.get('input[type="radio"]')
    //each recebe uma função, wrap empacota o elemento para visitar cada
    .each((typeofService) => {
      cy.wrap(typeofService)
        .check()
        .should('be.checked')
    })
 })

 it.only('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]')
    .check() //marcará todos
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
 })
})