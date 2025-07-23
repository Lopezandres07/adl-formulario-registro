describe('Registro de Usuario', () => {
  beforeEach(() => {
    cy.wait(5000)
    cy.visit('/')
  })

  it('Registro Exitoso con Datos Válidos', () => {
    // Dado que estoy en la página de registro
    cy.contains('Registro de Usuario')

    // Cuando ingreso los datos válidos
    cy.get('#name').type('Juan Perez')
    cy.get('#email').type('juan.perez@example.com')
    cy.get('#password').type('ClaveSegura123')
    cy.get('#confirmPassword').type('ClaveSegura123')

    // Y hago clic en "Registrarse"
    cy.contains('Registrarse').click()

    // Entonces debería ver el mensaje de éxito
    cy.contains('¡Registro exitoso! Datos enviados correctamente.').should(
      'be.visible'
    )

    // Y el formulario debería estar vacío
    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#password').should('have.value', '')
    cy.get('#confirmPassword').should('have.value', '')
  })
})
