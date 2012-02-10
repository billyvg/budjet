namespace 'BJ', (exports) ->
  describe 'Tests for Transaction Model.', () ->
    beforeEach () ->
      @income = new exports.Transaction {
        amount: 100
        description: 'Testing Income'
        reoccuring: true
      }
      @expense = new exports.Transaction {
        amount: -100
        description: 'Testing expense'
        reoccuring: true
      }

    it 'Can be created with default values', () ->
      transaction = new exports.Transaction
      expect(transaction.get('amount')).toBe 0
      expect(transaction.get('description')).toBe ''
      expect(transaction.get('reoccuring')).toBe false

    it 'Can be created with set values', () ->
      transaction = new exports.Transaction {
        amount: 100
        description: 'Testing'
        reoccuring: true
      }
      expect(transaction.get('amount')).toBe 100
      expect(transaction.get('description')).toBe 'Testing'
      expect(transaction.get('reoccuring')).toBe true

    it 'Is an "expense" if amount is negative', () ->
      expect(@expense.type()).toBe 'expense'

    it 'Is "income" if amount is positive', () ->
      expect(@income.type()).toBe 'income'

    it 'Is empty string if amount is 0', () ->
      @income.set {amount: 0}
      expect(@income.type()).toBe ''

  describe 'Tests for Transaction Collection', () ->

    beforeEach () ->
      @transactions = new exports.Transactions
      # @transactions destroy

    it 'Add a new transaction with non-default values to collection ', () ->
      trans =
        date: ''
        amount: 100
        description: 'test'
        reoccuring: true

      expect(@transactions.models.lenth).toBe undefined
      @transactions.add trans
      expect(@transactions.models.length).toBe 1

      content = @transactions.models[0]

      expect(content.get 'date' ).toBe trans.date
      expect(content.get 'amount' ).toBe trans.amount
      expect(content.get 'description' ).toBe trans.description
      expect(content.get 'reoccuring' ).toBe trans.reoccuring

    it 'Add transactions with different amounts to the collection and return the sum of all the transactions', () ->
      transactions = [-100, 50, 50, -20, 10, 0]
      sum = 0

      @transactions.add {amount: transaction} for transaction in transactions
      sum = sum + transaction for transaction in transactions
      expect(@transactions.total()).toBe sum

    it 'Calculate the total amount of reoccurring transactions.', () ->
      expect('').toBe false

    it 'Calculate the available money in a certain time period.', () ->
      expect('').toBe false

  describe 'Tests of the Summary View', () ->
    beforeEach () ->
      @transactions add {
        amount: 100
        reoccuring: 14
      }

    it 'Check if reoccurring sum updates when a transaction is added.', () ->
      expect('').toBe false

    it 'Check if reoccurring sum updates when a transaction is removed.', () ->
      expect('').toBe false

    it 'Check if non-reoccurring sum updates when a transaction is added.', () ->
      expect('').toBe false

    it 'Check if non-reoccurring sum updates when a transaction is removed.', () ->
      expect('').toBe false





