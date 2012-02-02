describe 'Tests for transactions models.', () ->

  beforeEach () ->
    @income = new BJ.Transaction {
      amount: 100
      description: 'Testing Income'
      reoccuring: true
    }
    @expense = new BJ.Transaction {
      amount: -100
      description: 'Testing expense'
      reoccuring: true
    }
    ''

  it 'Can be created with default values', () ->
    transaction = new BJ.Transaction
    expect transaction.get('amount').toBe 0
    expect transaction.get('description').toBe ''
    expect transaction.get('reoccuring').toBe false
    ''

  it 'Can be created with set values', () ->
    transaction = new BJ.Transaction {
      amount: 100
      description: 'Testing'
      reoccuring: true
    }
    expect transaction.get('amount')  .toBe 100
    expect transaction.get('description')  .toBe 'Testing'
    expect transaction.get('reoccuring')  .toBe true
    ''

  it 'Is an "expense" if amount is negative', () ->
    expect @expense.get('type') .toBe 'expense'
    ''

  it 'Is "income" if amount is positive', () ->
    expect @income.get('type') .toBe 'income'
    ''

  it 'Is empty string if amount is 0', () ->
    @income.set 'amount', 0
    expect @income.get('type') .toBe ''
    ''

  ''

describe 'Tests for transactionsController', () ->

  beforeEach () ->
    @controller = new BJ.transactionsController
    @controller.set 'content', []
    ''

  it 'Should be sum of all the transactions',  () ->
    transactions = [-100, 50, 50, -20, 10, 0]

    @controller.pushObject new BJ.Transaction {amount: transaction} for own i, transaction of intransactions

    expect(@controller.totalAssets()).toBe -10

    ''

  it 'addTransaction should create a new Transaction in controllers content property', () ->
    trans = 
      date: ''
      amount: 100
      description: 'test'
      reoccuring: true

    expect(@controller.content.length).toBe 0
    @controller.addTransaction trans
    expect(@controller.content.length).toBe 1

    content = @controller.content[0]

    expect(content.get 'date' ).toBe trans.date
    expect(content.get 'amount' ).toBe trans.amount
    expect(content.get 'description' ).toBe trans.description
    expect(content.get 'reoccuring' ).toBe trans.reoccuring
    ''
  ''
