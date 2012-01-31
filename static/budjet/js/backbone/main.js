$(function() {


  BJ.ActionView = Backbone.View.extend({
    el: $('#budget-actions')

  , events: {
      'click .add-item':      'add'
    }

  , initialize: function() {
      this.App = this.options.parent
    }

  , add: function() {
      this.App.Transactions.add(new BJ.TransactionModel);
    }

  , render: function() {

    }

  })


  BJ.AppView = Backbone.View.extend({
    el: $('#budjet-app')

  , initialize: function() {
      this.Action = new BJ.ActionView({parent: this})
      this.Transactions = new BJ.TransactionCollection()
      this.Transactions.bind('add', this.add, this)
    }

  , add: function(row) {
      var view = new BJ.TransactionView({model: row})
      $('.budget-table tbody').append(view.render())
    }

  , render: function() {


    }
  })

});

