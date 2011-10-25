BJ.TransactionModel = Backbone.Model.extend({
  defaults: function() {
    return {
      amount: 0,
      description: '',
      type: '',
      reoccuring: false
    }
  }
  /**
   * Retrieve the relative value of the transaction (i.e.
   * negative for an expense, and positive for income).
   */
, relative: function() {
    if (this.get('type') == 'expense') {
      return this.get('amount')*-1;
    }

    return this.get('amount')
  }
});

BJ.TransactionCollection = Backbone.Collection.extend({
  model: BJ.TransactionModel,
});
