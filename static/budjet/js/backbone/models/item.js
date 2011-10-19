BJ.TransactionModel = Backbone.Model.extend({
  defaults: function() {
    return {
      amount: 0,
      description: '',
      type: '',
      reoccuring: false
    }
  }
});

BJ.TransactionCollection = Backbone.Collection.extend({
  model: BJ.TransactionModel,
});
