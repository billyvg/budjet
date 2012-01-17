BJ = Ember.Namespace.create();
BJ = Ember.Application.create();

// Models
BJ.Transaction = Em.Object.extend({
  amount: 0,
  description: '',
  type: '',
  reoccuring: false,

  relative: function() {
    if (this.get('type') == 'expense') {
      return this.get('amount')*-1;
    }
    return this.get('amount');
  }.property('type', 'amount')
});

// Views
BJ.TransactionView = Em.View.extend({
});

BJ.ActionsView = Em.View.extend({
});


/**
 * Controllers
 */

BJ.transactionsController = Em.ArrayProxy.create({
  // Array of Transaction objects
  content: [],

  addTransaction: function() {
    var t = BJ.Transaction.create({
      id: 123,
      date: 'today',
      amount: 200,
      description: 'test',
      reoccuring: false,
      type: 'expense'
    });
    this.pushObject(t);
  },

  // Load transactions from somewhere...
  loadTransactions: function() {
    for (var i = 0; i < 10; i++) {
      var t = BJ.Transaction.create({
        id: i,
        amount: 100+i,
        description: 'test',
        type: 'expense'
      });
      this.pushObject(t);
    }
  }
});


$(function() {
  BJ.transactionsController.loadTransactions();
});
