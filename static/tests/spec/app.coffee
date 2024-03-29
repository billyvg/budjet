namespace 'BJ', (exports) ->
  describe 'Tests for Transaction Model.', () ->
    beforeEach () ->
      @income = new exports.Transaction {
        date: new Date(2012, 1, 1)
        amount: 100
        description: 'Testing Income'
        recurring: 14
      }
      @expense = new exports.Transaction {
        date: new Date(2012, 1, 13)
        amount: -100
        description: 'Testing expense'
        recurring: 5
      }
      @single = new exports.Transaction {
        date: new Date(2012, 1, 1)
        amount: 1000
        recurring: false
      }

    it 'Can be created with default values', () ->
      transaction = new exports.Transaction
      expect(transaction.get('amount')).toBe 0
      expect(transaction.get('description')).toBe ''
      expect(transaction.get('recurring')).toBe 0

    it 'Can be created with set values', () ->
      transaction = new exports.Transaction {
        amount: 100
        description: 'Testing'
        recurring: 14
      }
      expect(transaction.get('amount')).toBe 100
      expect(transaction.get('description')).toBe 'Testing'
      expect(transaction.get('recurring')).toBe 14

    it 'Is an "expense" if amount is negative', () ->
      expect(@expense.type()).toBe 'expense'

    it 'Is "income" if amount is positive', () ->
      expect(@income.type()).toBe 'income'

    it 'Is empty string if amount is 0', () ->
      @income.set {amount: 0}
      expect(@income.type()).toBe ''

    it '0 if expected() is given a date in the past.', () ->
      expect(
        @income.expected(new Date(2011, 2, 1))
      ).toBe 0

    it 'Non-recurring transactions should only return a single amount.', () ->
      expect(
        @single.expected(new Date(2013, 2, 1))
      ).toBe 1000

    it 'Recurring income every 14 days starting from 2-1-2012 to 3-1-2012, occurs 3 times.', () ->
      expect(
        @income.expected(new Date(2012, 2, 1))
      ).toBe 300

    it 'Recurring expense every 5 days starting from 2-13-2012 to 3-2-2012, occurs 4 times.', () ->
      expect(
        @expense.expected(new Date(2012, 2, 2))
      ).toBe -400

    it 'Recurring transaction with the same start/end date, occurs once.', () ->
      expect(
        @expense.expected(new Date(2012, 1, 13))
      ).toBe -100

  describe 'Tests for Transaction Collection', () ->

    beforeEach () ->
      @transactions = new exports.Transactions()
      # @transactions destroy

    it 'Add a new transaction with non-default values to collection ', () ->
      trans =
        date: new Date(2012, 1, 10)
        amount: 100
        description: 'test'
        recurring: 7

      expect(@transactions.models.length).toBe 0
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
      expect(
        @transactions.recurringTotal()
      ).toBe (100-30+22-14+49)

    it 'Calculate the total amount of non-recurring transactions.', () ->
      expect(
        @transactions.nonrecurringTotal()
      ).toBe (10+123+59)

    it 'Sum of transactions before 2-3-2012', () ->
      expect(
        @transactions.totalBalance('', new Date(2012, 2, 3))
      ).toBe (100-30+22-14+59+10+123)

    it 'Sum of transactions after 1-21-2012', () ->
      expect(
        @transactions.totalBalance(new Date(2012, 1, 21), '')
      ).toBe (59+49+123)

    it 'Sum of transactions between 1-1-2012 and 2-1-2012.', () ->
      expect(
        @transactions.totalBalance(new Date(2012, 1, 1), new Date(2012, 2, 1))
      ).toBe (100-30+22-14+59+10)

    it 'Sum of transactions between 1-11-2012 and 1-21-2012.', () ->
      expect(
        @transactions.totalBalance(new Date(2012, 1, 11), new Date(2012, 1, 21))
      ).toBe (22-14+59)

    it 'Calculate the available money on 3-1-2012, with only transactions starting after 2-5-2012.', () ->
      expect(
        @transactions.expected(
          new Date(2012, 1, 5), new Date(2012, 2, 1)
        )
      ).toBe -89

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





