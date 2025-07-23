describe('Registro de Usuario', () => {
  beforeEach(() => {
    cy.wait(5000)
    cy.visit('/')
  })

  it('Registro Exitoso con Datos Válidos', () => {
    cy.contains('Registro de Usuario')

    cy.get('#name').type('Juan Perez')
    cy.get('#email').type('juan.perez@example.com')
    cy.get('#password').type('ClaveSegura123')
    cy.get('#confirmPassword').type('ClaveSegura123')

    cy.contains('Registrarse').click()

    cy.contains('¡Registro exitoso! Datos enviados correctamente.').should(
      'be.visible'
    )

    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#password').should('have.value', '')
    cy.get('#confirmPassword').should('have.value', '')
  })
})

describe('Escenario 2: Registro Fallido por Falta de Datos Obligatorios', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe mostrar mensajes de error cuando se omiten campos obligatorios', () => {
    cy.get('#email').type('test@example.com')
    cy.get('#password').type('MiClave123')
    cy.get('#confirmPassword').type('MiClave123')
    cy.contains('Registrarse').click()

    cy.contains('El nombre es obligatorio.').should('be.visible')

    cy.contains('Por favor, corrige los errores en el formulario.').should(
      'be.visible'
    )

    cy.contains('¡Registro exitoso!').should('not.exist')
  })
})
