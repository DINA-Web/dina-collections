export default () =>
  describe('validation', () => {
    let newSpecimenId

    before(() => {
      cy.log('Create new specimen for tests')
      cy.login()
      cy.goToRoute('/app/specimens/mammals/create/sections/0')
      cy.getByTestId('createAutomaticNumber').click()
      cy.url()
        .should('include', '/edit/')
        .then(url => {
          const urlParts = url.split('/')
          const specimenIdIndex = urlParts.findIndex(str => str === 'edit')
          newSpecimenId = urlParts[specimenIdIndex - 1]
        })
    })

    afterEach(() => {
      cy.getByTestId('saveButton')
        .click()
        .shouldFinishLoading()
      cy.errorClassShouldNotExist()
    })

    it('validates coordinates format', () => {
      cy.goToRoute(`/app/specimens/mammals/${newSpecimenId}/edit/sections/2`)
      cy.get('[data-testid="localityOrigin"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByTestId('addPositionButton').click()

      cy.getInputByFieldLabel('Latitude')
        .type('N123')
        .blur()
      cy.getByText('Latitude must be number between 0 and 90')

      cy.getInputByFieldLabel('Latitude')
        .clear()
        .type('12.01')
        .blur()
      cy.quickQueryByText('Latitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getInputByFieldLabel('Latitude')
        .clear()
        .type('110')
        .blur()
      cy.getByText('Latitude must be number between 0 and 90')

      cy.getInputByFieldLabel('Longitude')
        .type('45W')
        .blur()
      cy.getByText('Longitude must be number between 0 and 180')

      cy.getInputByFieldLabel('Longitude')
        .clear()
        .type('123.23456')
        .blur()
      cy.quickQueryByText('Longitude must be number between 0 and 180').should(
        'not.exist'
      )

      cy.getInputByFieldLabel('Longitude')
        .clear()
        .type('3040')
        .blur()
      cy.getByText('Longitude must be number between 0 and 180')

      cy.log('does not allow leading minus sign in input')
      cy.getInputByFieldLabel('Latitude')
        .clear()
        .type('-11')
        .should('have.value', '11')
      cy.quickQueryByText('Latitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getInputByFieldLabel('Longitude')
        .clear()
        .type('-22.22')
        .should('have.value', '22.22')
      cy.quickQueryByText('Longitude must be number between 0 and 90').should(
        'not.exist'
      )

      cy.getByText('Done').click()
      cy.getByText('11 N, 22.22 E', { exact: false })
    })

    it('validates storage location required for physical object', () => {
      cy.goToRoute(`/app/specimens/mammals/${newSpecimenId}/edit/sections/4`)
      cy.get('[data-testid="physicalObjects"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByText('Add a skeleton').click()
      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getInputByFieldLabel('Preparation type')
          .click({ force: true })
          .type('Antler{enter}')
        cy.getInputByFieldLabel('Normal storage location')
          .type('Bensalen{selectall}{backspace}')
          .blur()
      })

      cy.log('shows error on field and form section navigation')
      cy.getByText('Required')
      cy.getByTestId('formSectionNavigationItem-physicalObjects').should(
        'have.class',
        'error'
      )

      cy.log('shows error on closed accordion item title')
      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getByTestId('activeAccordionTitle').click()
        cy.get('.error')
      })
      cy.quickQueryByText('There are issues that prevent saving')

      cy.getByTestId('physicalObjectsSkeleton').within(() => {
        cy.getByTestId('accordionTitle').click()
        cy.getInputByFieldLabel('Normal storage location').type('Bens')
        cy.getDropdownOptionByText('Bensalen [room]').click()
      })
    })

    it('validates collecting date input', () => {
      cy.goToRoute(`/app/specimens/mammals/${newSpecimenId}/edit/sections/3`)
      cy.get('[data-testid="collectingDeath"]', {
        log: false,
        timeout: 60000,
      })
      cy.getByTestId('collectingDate').within(() => {
        cy.getInputByFieldLabel('Year').as('yearInput')
        cy.getInputByFieldLabel('Month').as('monthInput')
        cy.getInputByFieldLabel('Day').as('dayInput')
        cy.get('input[value=single]').as('singleRadio')
        cy.get('input[value=range]').as('rangeRadio')
        cy.get('input[value=latest]').as('latestRadio')
      })

      cy.log('check input does not accept letters')
      cy.get('@dayInput')
        .type('abc')
        .should('have.value', '') // number input does not accept letters

      cy.log('check date input validation')
      cy.get('@dayInput')
        .type('15')
        .blur()
      cy.getByText('A day must have month and year')
      cy.get('@monthInput').type('1')
      cy.getByText('A month must have year')
      cy.get('@yearInput').type('20')
      cy.getByText('Invalid date')
      cy.get('@yearInput')
        .clear()
        .type('3000')
      cy.getByText('Only past dates allowed')

      cy.log('check .error classes applied')
      cy.getByTestId('formSectionNavigationItem-collectingDeath').should(
        'have.class',
        'error'
      )
      cy.getByTestId('collectingDate').within(() => {
        cy.get('.error')
      })

      cy.log('check errors removed on empty date')
      cy.get('@dayInput').clear()
      cy.get('@monthInput').clear()
      cy.get('@yearInput').clear()
      cy.quickQueryByText('Only past dates allowed').should('not.exist')
      cy.errorClassShouldNotExist()

      cy.log('check range date validation')
      cy.get('@rangeRadio').check({ force: true })
      cy.getByTestId('endDatePart').within(() => {
        cy.getInputByFieldLabel('Year').as('endYearInput')
        cy.getInputByFieldLabel('Month').as('endMonthInput')
      })
      cy.getByTestId('startDatePart').within(() => {
        cy.getInputByFieldLabel('Year').as('startYearInput')
      })

      cy.get('@startYearInput')
        .type('2000')
        .blur()
      cy.getByText('Both start and end required')
      cy.get('@endYearInput').type('1999')
      cy.getByText('End date before start date')
      cy.get('@endYearInput').clear()
      cy.get('@endMonthInput').type('5')
      cy.getByText('A month must have year')
      cy.get('@endYearInput').type('2000')
      cy.errorClassShouldNotExist()

      cy.get('@endMonthInput').clear()
      cy.get('@endYearInput').clear()

      cy.log('check date validation also applies to latest date')
      cy.get('@latestRadio').check({ force: true })
      cy.getByTestId('endDatePart').within(() => {
        cy.getInputByFieldLabel('Day').as('endDayInput')
      })
      cy.get('@endDayInput').type('24')
      cy.getByText('A day must have month and year')
      cy.get('@endYearInput').type('1980')
      cy.get('@endMonthInput').type('1')
    })
  })
