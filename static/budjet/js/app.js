BJ = Ember.Namespace.create();
BJ = Ember.Application.create();

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


BJ.ActionsView = Em.View.extend({

});


$(function() {
  BJ.transactionsController.loadTransactions();
});
