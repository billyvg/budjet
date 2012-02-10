(function() {

  namespace('BJ', function(exports) {
    describe('Tests for Transaction Model.', function() {
      beforeEach(function() {
        this.income = new exports.Transaction({
          amount: 100,
          description: 'Testing Income',
          reoccuring: true
        });
        return this.expense = new exports.Transaction({
          amount: -100,
          description: 'Testing expense',
          reoccuring: true
        });
      });
      it('Can be created with default values', function() {
        var transaction;
        transaction = new exports.Transaction;
        expect(transaction.get('amount')).toBe(0);
        expect(transaction.get('description')).toBe('');
        return expect(transaction.get('reoccuring')).toBe(false);
      });
      it('Can be created with set values', function() {
        var transaction;
        transaction = new exports.Transaction({
          amount: 100,
          description: 'Testing',
          reoccuring: true
        });
        expect(transaction.get('amount')).toBe(100);
        expect(transaction.get('description')).toBe('Testing');
        return expect(transaction.get('reoccuring')).toBe(true);
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
        return this.transactions = new exports.Transactions;
      });
      it('Add a new transaction with non-default values to collection ', function() {
        var content, trans;
        trans = {
          date: '',
          amount: 100,
          description: 'test',
          reoccuring: true
        };
        expect(this.transactions.models.lenth).toBe(void 0);
        this.transactions.add(trans);
        expect(this.transactions.models.length).toBe(1);
        content = this.transactions.models[0];
        expect(content.get('date')).toBe(trans.date);
        expect(content.get('amount')).toBe(trans.amount);
        expect(content.get('description')).toBe(trans.description);
        return expect(content.get('reoccuring')).toBe(trans.reoccuring);
      });
      it('Add transactions with different amounts to the collection and return the sum of all the transactions', function() {
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
      it('Calculate the total amount of reoccurring transactions.', function() {
        return expect('').toBe(false);
      });
      return it('Calculate the available money in a certain time period.', function() {
        return expect('').toBe(false);
      });
    });
    return describe('Tests of the Summary View', function() {
      beforeEach(function() {
        return this.transactions(add({
          amount: 100,
          reoccuring: 14
        }));
      });
      it('Check if reoccurring sum updates when a transaction is added.', function() {
        return expect('').toBe(false);
      });
      it('Check if reoccurring sum updates when a transaction is removed.', function() {
        return expect('').toBe(false);
      });
      it('Check if non-reoccurring sum updates when a transaction is added.', function() {
        return expect('').toBe(false);
      });
      return it('Check if non-reoccurring sum updates when a transaction is removed.', function() {
        return expect('').toBe(false);
      });
    });
  });

}).call(this);
