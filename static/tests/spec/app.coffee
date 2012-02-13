namespace 'BJ', (exports) ->
  describe 'Tests for Transaction Model.', () ->
    beforeEach () ->
      @income = new exports.Transaction {
        amount: 100
        description: 'Testing Income'
        recurring: true
      }
      @expense = new exports.Transaction {
        amount: -100
        description: 'Testing expense'
        recurring: true
      }

    it 'Can be created with default values', () ->
      transaction = new exports.Transaction
      expect(transaction.get('amount')).toBe 0
      expect(transaction.get('description')).toBe ''
      expect(transaction.get('recurring')).toBe false

    it 'Can be created with set values', () ->
      transaction = new exports.Transaction {
        amount: 100
        description: 'Testing'
        recurring: true
      }
      expect(transaction.get('amount')).toBe 100
      expect(transaction.get('description')).toBe 'Testing'
      expect(transaction.get('recurring')).toBe true

    it 'Is an "expense" if amount is negative', () ->
      expect(@expense.type()).toBe 'expense'

    it 'Is "income" if amount is positive', () ->
      expect(@income.type()).toBe 'income'

    it 'Is empty string if amount is 0', () ->
      @income.set {amount: 0}
      expect(@income.type()).toBe ''

  describe 'Tests for Transaction Collection', () ->

    beforeEach () ->
      @transactions = new exports.Transactions()
      # @transactions destroy

    it 'Add a new transaction with non-default values to collection ', () ->
      trans =
        date: ''
        amount: 100
        description: 'test'
        recurring: true

      expect(@transactions.models.lenth).toBe undefined
      @transactions.add trans
      expect(@transactions.models.length).toBe 1

      content = @transactions.models[0]

      expect(content.get 'date' ).toBe trans.date
      expect(content.get 'amount' ).toBe trans.amount
      expect(content.get 'description' ).toBe trans.description
      expect(content.get 'recurring' ).toBe trans.recurring

    it 'Add transactions with different amounts to the collection and return the sum of all the transactions', () ->
      transactions = [-100, 50, 50, -20, 10, 0]
      sum = 0

      @transactions.add {amount: transaction} for transaction in transactions
      sum = sum + transaction for transaction in transactions
      expect(@transactions.total()).toBe sum

  describe 'Tests for Transaction Collection calculations', () ->
    beforeEach () ->
      @transactions = new exports.Transactions()

      @transactions.add {
        date: new Date 2012, 1, 1
        amount: 100
        recurring: 14
      }
      @transactions.add {
        date: new Date 2012, 1, 5
        amount: -30
        recurring: 4
      }
      @transactions.add {
        date: new Date 2012, 1, 11
        amount: 22
        recurring: 7
      }
      @transactions.add {
        date: new Date 2012, 1, 17
        amount: -14
        recurring: 21
      }
      @transactions.add {
        date: new Date 2012, 1, 21
        amount: 59
        recurring: 'true'
      }
      @transactions.add {
        date: new Date 2012, 1, 35
        amount: 49
        recurring: 30
      }
      @transactions.add {
        date: new Date 2012, 1, 8
        amount: 10
        recurring: 0
      }
      @transactions.add {
        date: new Date 2012, 2, 2
        amount: 123
        recurring: false
      }

    it 'Calculate the total amount of recurring transactions.', () ->
      expect(@transactions.recurringTotal()).toBe (100-30+22-14+59+49)

    it 'Calculate the total amount of non-recurring transactions.', () ->
      expect(@transactions.nonrecurringTotal()).toBe (10+123)

    it 'Calculate the net balance of transactions in a certain time period.', () ->
      expect(@transactions.totalBalance(new Date(2012, 1, 1), new Date(2012, 2, 1))).toBe (100-30+22-14+59+10)

    it 'Calculate the available money in a certain time period.', () ->
      expect('').toBe false

  describe 'Tests of the Summary View', () ->
    beforeEach () ->
      @transactions = new exports.Transactions
      @transactions.add {
        amount: 100
        recurring: 14
      }

    it 'Check if recurring sum updates when a transaction is added.', () ->
      expect('').toBe false

    it 'Check if recurring sum updates when a transaction is removed.', () ->
      expect('').toBe false

    it 'Check if non-recurring sum updates when a transaction is added.', () ->
      expect('').toBe false

    it 'Check if non-recurring sum updates when a transaction is removed.', () ->
      expect('').toBe false





