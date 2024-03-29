(function() {

  namespace('BJ', function(exports) {
    describe('Tests for Transaction Model.', function() {
      beforeEach(function() {
        this.income = new exports.Transaction({
          date: new Date(2012, 1, 1),
          amount: 100,
          description: 'Testing Income',
          recurring: 14
        });
        this.expense = new exports.Transaction({
          date: new Date(2012, 1, 13),
          amount: -100,
          description: 'Testing expense',
          recurring: 5
        });
        return this.single = new exports.Transaction({
          date: new Date(2012, 1, 1),
          amount: 1000,
          recurring: false
        });
      });
      it('Can be created with default values', function() {
        var transaction;
        transaction = new exports.Transaction;
        expect(transaction.get('amount')).toBe(0);
        expect(transaction.get('description')).toBe('');
        return expect(transaction.get('recurring')).toBe(0);
      });
      it('Can be created with set values', function() {
        var transaction;
        transaction = new exports.Transaction({
          amount: 100,
          description: 'Testing',
          recurring: 14
        });
        expect(transaction.get('amount')).toBe(100);
        expect(transaction.get('description')).toBe('Testing');
        return expect(transaction.get('recurring')).toBe(14);
      });
      it('Is an "expense" if amount is negative', function() {
        return expect(this.expense.type()).toBe('expense');
      });
      it('Is "income" if amount is positive', function() {
        return expect(this.income.type()).toBe('income');
      });
      it('Is empty string if amount is 0', function() {
        this.income.set({
          amount: 0
        });
        return expect(this.income.type()).toBe('');
      });
      it('0 if expected() is given a date in the past.', function() {
        return expect(this.income.expected(new Date(2011, 2, 1))).toBe(0);
      });
      it('Non-recurring transactions should only return a single amount.', function() {
        return expect(this.single.expected(new Date(2013, 2, 1))).toBe(1000);
      });
      it('Recurring income every 14 days starting from 2-1-2012 to 3-1-2012, occurs 3 times.', function() {
        return expect(this.income.expected(new Date(2012, 2, 1))).toBe(300);
      });
      it('Recurring expense every 5 days starting from 2-13-2012 to 3-2-2012, occurs 4 times.', function() {
        return expect(this.expense.expected(new Date(2012, 2, 2))).toBe(-400);
      });
      return it('Recurring transaction with the same start/end date, occurs once.', function() {
        return expect(this.expense.expected(new Date(2012, 1, 13))).toBe(-100);
      });
    });
    describe('Tests for Transaction Collection', function() {
      beforeEach(function() {
        return this.transactions = new exports.Transactions();
      });
      it('Add a new transaction with non-default values to collection ', function() {
        var content, trans;
        trans = {
          date: new Date(2012, 1, 10),
          amount: 100,
          description: 'test',
          recurring: 7
        };
        expect(this.transactions.models.length).toBe(0);
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
        return expect(this.transactions.recurringTotal()).toBe(100 - 30 + 22 - 14 + 49);
      });
      it('Calculate the total amount of non-recurring transactions.', function() {
        return expect(this.transactions.nonrecurringTotal()).toBe(10 + 123 + 59);
      });
      it('Sum of transactions before 2-3-2012', function() {
        return expect(this.transactions.totalBalance('', new Date(2012, 2, 3))).toBe(100 - 30 + 22 - 14 + 59 + 10 + 123);
      });
      it('Sum of transactions after 1-21-2012', function() {
        return expect(this.transactions.totalBalance(new Date(2012, 1, 21), '')).toBe(59 + 49 + 123);
      });
      it('Sum of transactions between 1-1-2012 and 2-1-2012.', function() {
        return expect(this.transactions.totalBalance(new Date(2012, 1, 1), new Date(2012, 2, 1))).toBe(100 - 30 + 22 - 14 + 59 + 10);
      });
      it('Sum of transactions between 1-11-2012 and 1-21-2012.', function() {
        return expect(this.transactions.totalBalance(new Date(2012, 1, 11), new Date(2012, 1, 21))).toBe(22 - 14 + 59);
      });
      return it('Calculate the available money on 3-1-2012, with only transactions starting after 2-5-2012.', function() {
        return expect(this.transactions.expected(new Date(2012, 1, 5), new Date(2012, 2, 1))).toBe(-89);
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
