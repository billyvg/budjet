BJ = Ember.Namespace.create();
BJ = Ember.Application.create();

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


BJ.ActionsView = Em.View.extend({

});


$(function() {
  BJ.transactionsController.loadTransactions();
});
