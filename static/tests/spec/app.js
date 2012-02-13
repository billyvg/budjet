(function() {

  namespace('BJ', function(exports) {
    describe('Tests for Transaction Model.', function() {
      beforeEach(function() {
        this.income = new exports.Transaction({
          amount: 100,
          description: 'Testing Income',
          recurring: true
        });
        return this.expense = new exports.Transaction({
          amount: -100,
          description: 'Testing expense',
          recurring: true
        });
      });
      it('Can be created with default values', function() {
        var transaction;
        transaction = new exports.Transaction;
        expect(transaction.get('amount')).toBe(0);
        expect(transaction.get('description')).toBe('');
        return expect(transaction.get('recurring')).toBe(false);
      });
      it('Can be created with set values', function() {
        var transaction;
        transaction = new exports.Transaction({
          amount: 100,
          description: 'Testing',
          recurring: true
        });
        expect(transaction.get('amount')).toBe(100);
        expect(transaction.get('description')).toBe('Testing');
        return expect(transaction.get('recurring')).toBe(true);
      });
      it('Is an "expense" if amount is negative', function() {
        return expect(this.expense.type()).toBe('expense');
      });
      it('Is "income" if amount is positive', function() {
        return expect(this.income.type()).toBe('income');
      });
      return it('Is empty string if amount is 0', function() {
        this.income.set({
          amount: 0
        });
        return expect(this.income.type()).toBe('');
      });
    });
    describe('Tests for Transaction Collection', function() {
      beforeEach(function() {
        return this.transactions = new exports.Transactions();
      });
      it('Add a new transaction with non-default values to collection ', function() {
        var content, trans;
        trans = {
          date: '',
          amount: 100,
          description: 'test',
          recurring: true
        };
        expect(this.transactions.models.lenth).toBe(void 0);
        this.transactions.add(trans);
        expect(this.transactions.models.length).toBe(1);
        content = this.transactions.models[0];
        expect(content.get('date')).toBe(trans.date);
        expect(content.get('amount')).toBe(trans.amount);
        expect(content.get('description')).toBe(trans.description);
        return expect(content.get('recurring')).toBe(trans.recurring);
      });
      return it('Add transactions with different amounts to the collection and return the sum of all the transactions', function() {
        var sum, transaction, transactions, _i, _j, _len, _len2;
        transactions = [-100, 50, 50, -20, 10, 0];
        sum = 0;
        for (_i = 0, _len = transactions.length; _i < _len; _i++) {
          transaction = transactions[_i];
          this.transactions.add({
            amount: transaction
          });
        }
        for (_j = 0, _len2 = transactions.length; _j < _len2; _j++) {
          transaction = transactions[_j];
          sum = sum + transaction;
        }
        return expect(this.transactions.total()).toBe(sum);
      });
    });
    describe('Tests for Transaction Collection calculations', function() {
      beforeEach(function() {
        this.transactions = new exports.Transactions();
        this.transactions.add({
          date: new Date(2012, 1, 1),
          amount: 100,
          recurring: 14
        });
        this.transactions.add({
          date: new Date(2012, 1, 5),
          amount: -30,
          recurring: 4
        });
        this.transactions.add({
          date: new Date(2012, 1, 11),
          amount: 22,
          recurring: 7
        });
        this.transactions.add({
          date: new Date(2012, 1, 17),
          amount: -14,
          recurring: 21
        });
        this.transactions.add({
          date: new Date(2012, 1, 21),
          amount: 59,
          recurring: 'true'
        });
        this.transactions.add({
          date: new Date(2012, 1, 35),
          amount: 49,
          recurring: 30
        });
        this.transactions.add({
          date: new Date(2012, 1, 8),
          amount: 10,
          recurring: 0
        });
        return this.transactions.add({
          date: new Date(2012, 2, 2),
          amount: 123,
          recurring: false
        });
      });
      it('Calculate the total amount of recurring transactions.', function() {
        return expect(this.transactions.recurringTotal()).toBe(100 - 30 + 22 - 14 + 59 + 49);
      });
      it('Calculate the total amount of non-recurring transactions.', function() {
        return expect(this.transactions.nonrecurringTotal()).toBe(10 + 123);
      });
      it('Calculate the net balance of transactions in a certain time period.', function() {
        return expect(this.transactions.totalBalance(new Date(2012, 1, 1), new Date(2012, 2, 1))).toBe(100 - 30 + 22 - 14 + 59 + 10);
      });
      return it('Calculate the available money in a certain time period.', function() {
        return expect('').toBe(false);
      });
    });
    return describe('Tests of the Summary View', function() {
      beforeEach(function() {
        this.transactions = new exports.Transactions;
        return this.transactions.add({
          amount: 100,
          recurring: 14
        });
      });
      it('Check if recurring sum updates when a transaction is added.', function() {
        return expect('').toBe(false);
      });
      it('Check if recurring sum updates when a transaction is removed.', function() {
        return expect('').toBe(false);
      });
      it('Check if non-recurring sum updates when a transaction is added.', function() {
        return expect('').toBe(false);
      });
      return it('Check if non-recurring sum updates when a transaction is removed.', function() {
        return expect('').toBe(false);
      });
    });
  });

}).call(this);
