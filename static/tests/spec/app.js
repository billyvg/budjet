describe('Tests for transactions models.', function() {

  beforeEach(function() {
    this.income = BJ.Transaction.create({
      amount: 100,
      description: 'Testing Income',
      reoccuring: true
    });
    this.expense = BJ.Transaction.create({
      amount: -100,
      description: 'Testing expense',
      reoccuring: true
    });
  });

  it('Can be created with default values', function() {
    var transaction = BJ.Transaction.create();
    expect(transaction.get('amount')).toBe(0);
    expect(transaction.get('description')).toBe('');
    expect(transaction.get('reoccuring')).toBe(false);
  });

  it('Can be created with set values', function() {
    var transaction = BJ.Transaction.create({
      amount: 100,
      description: 'Testing',
      reoccuring: true
    });
    expect(transaction.get('amount')).toBe(100);
    expect(transaction.get('description')).toBe('Testing');
    expect(transaction.get('reoccuring')).toBe(true);
  });

  it('Is an "expense" if amount is negative', function() {
    expect(this.expense.get('type')).toBe('expense');
  });

  it('Is "income" if amount is positive', function() {
    expect(this.income.get('type')).toBe('income');
  });

  it('Is empty string if amount is 0', function() {
    this.income.set('amount', 0);
    expect(this.income.get('type')).toBe('');
  });
});


describe('Tests for transactionsController', function() {

  beforeEach(function() {
    this.controller = BJ.transactionsController;
    this.controller.set('content', []);
  });


  it('Should be sum of all the transactions', function() {
    var transactions = [-100, 50, 50, -20, 10, 0];

    for (var x = 0; x < transactions.length; x++) {
      this.controller.pushObject(BJ.Transaction.create({amount: transactions[x]}));
    }
    expect(this.controller.totalAssets()).toBe(-10);
  });

  it('addTransaction should create a new Transaction in controllers content property',
    function() {
      var trans = {
        date: '',
        amount: 100,
        description: 'test',
        reoccuring: true
      };

      expect(this.controller.content.length).toBe(0);
      this.controller.addTransaction(trans);
      expect(this.controller.content.length).toBe(1);

      var content = this.controller.content[0];

      expect(content.get('date')).toBe(trans.date);
      expect(content.get('amount')).toBe(trans.amount);
      expect(content.get('description')).toBe(trans.description);
      expect(content.get('reoccuring')).toBe(trans.reoccuring);
    }
  );

});
