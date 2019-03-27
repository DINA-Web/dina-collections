describe('Footer', () => {
  before(() => {
    cy.visit('/')
  })

  it('has three columns', () => {
    cy.getByTestId('footerContent')
      .children()
      .and('have.length', 3)

    cy.getByText('Site')
    cy.getByText('Documentation')
    cy.getByText('Developer')
  })

  it('has expected number of links', () => {
    const links = [
      { expectedLength: 3, id: 'footerSite' },
      { expectedLength: 2, id: 'footerDocument' },
      { expectedLength: 5, id: 'footerDeveloper' },
    ]

    cy.wrap(links).each(({ id, expectedLength }) => {
      cy.getByTestId(id)
        .children()
        .and('have.length', expectedLength)
    })
  })

  it('has expected links', () => {
    cy.getByTestId('footerStart').shouldHaveHref('/')
    cy.getByTestId('footerLogin').shouldHaveHref('/login')
    cy.getByTestId('footerDataModel').shouldHaveHref('/docs')
    cy.getByTestId('footerDinaWiki').shouldHaveHref(
      'https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!'
    )
    cy.getByTestId('footerDocumentDataModel').shouldHaveHref('/docs')
    cy.getByTestId('footerDinaWebGithub').shouldHaveHref(
      'https://github.com/DINA-Web'
    )
    cy.getByTestId('footerDinaCollectionsGithub').shouldHaveHref(
      'https://github.com/DINA-Web/dina-collections'
    )
    cy.getByTestId('footerDinaStyle').shouldHaveHref(
      'https://dina-style.nrm.se/'
    )
    cy.getByTestId('footerDinaApiDocs').shouldHaveHref(
      'https://dina-api.nrm.se/docs'
    )
  })
})
