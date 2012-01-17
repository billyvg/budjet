BJ = Ember.Namespace.create();
BJ = Ember.Application.create();

// Models
BJ.Transaction = Em.Object.extend({
  amount: 0,
  description: '',
  reoccuring: false,

  type: function() {
    if (this.get('amount') > 0) {
      return 'income';
    }
    else if (this.get('amount') < 0) {
      return 'expense';
    }
    else {
      return '';
    }
  }.property('amount')
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

  addTransaction: function(transaction) {
    var t = BJ.Transaction.create(transaction);
    this.pushObject(t);
  },

  // Load transactions from somewhere...
  loadTransactions: function() {
    for (var i = 0; i < 10; i++) {
      var t = BJ.Transaction.create({
        id: i,
        amount: 100+i,
        description: 'test',
      });
      this.pushObject(t);
    }
  },

  totalAssets: function() {
    return _.reduce(this.content, function(memo, obj) {
      return memo + obj.get('amount');
    }, 0);
  }
});


//$(function() {
//  BJ.transactionsController.loadTransactions();
//});
