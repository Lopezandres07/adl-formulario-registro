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

describe('Escenario 3: Registro Fallido por Clave y Confirmación de Clave No Coinciden', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe mostrar mensajes de error cuando las contraseñas no coincidan', () => {
    cy.get('#name').type('Maria Lopez')
    cy.get('#email').type('maria.lopez@example.com')
    cy.get('#password').type('ClaveValida123')
    cy.get('#confirmPassword').type('ClaveDiferente456')

    cy.contains('Registrarse').click()

    cy.contains('La clave y la confirmación de clave no coinciden.').should(
      'be.visible'
    )

    cy.contains('Por favor, corrige los errores en el formulario.').should(
      'be.visible'
    )

    cy.contains('¡Registro exitoso!').should('not.exist')
  })
})

describe('Escenario 4: Registro Fallido por Clave No Cumple las Reglas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe mostrar mensajes de error cuando las contraseñas son cortas', () => {
    cy.get('#name').type('Pedro Gomez')
    cy.get('#email').type('pedro.gomez@example.com')
    cy.get('#password').type('corta')
    cy.get('#confirmPassword').type('corta')

    cy.contains('Registrarse').click()

    cy.contains(
      'La clave debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas y números.'
    ).should('be.visible')

    cy.contains('Por favor, corrige los errores en el formulario.').should(
      'be.visible'
    )

    cy.contains('¡Registro exitoso!').should('not.exist')
  })

  it('Debe mostrar mensajes de error cuando las contraseñas son solo minúsculas', () => {
    cy.get('#name').type('Pedro Gomez')
    cy.get('#email').type('pedro.gomez@example.com')
    cy.get('#password').type('solominusculas')
    cy.get('#confirmPassword').type('solominusculas')

    cy.contains('Registrarse').click()

    cy.contains(
      'La clave debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas y números.'
    ).should('be.visible')

    cy.contains('Por favor, corrige los errores en el formulario.').should(
      'be.visible'
    )

    cy.contains('¡Registro exitoso!').should('not.exist')
  })

  it('Debe mostrar mensajes de error cuando las contraseñas son solo números', () => {
    cy.get('#name').type('Pedro Gomez')
    cy.get('#email').type('pedro.gomez@example.com')
    cy.get('#password').type('1234567890')
    cy.get('#confirmPassword').type('1234567890')

    cy.contains('Registrarse').click()

    cy.contains(
      'La clave debe tener al menos 10 caracteres, incluyendo mayúsculas, minúsculas y números.'
    ).should('be.visible')

    cy.contains('Por favor, corrige los errores en el formulario.').should(
      'be.visible'
    )

    cy.contains('¡Registro exitoso!').should('not.exist')
  })
})
