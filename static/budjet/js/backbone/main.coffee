jQuery ->
  class ActionView extends Backbone.View
    el: '#budget-actions'

    events: ->
      'click .add-item': 'add'

    initialize: ->
      this.App = this.options.parent

    add: ->
      this.App.Transactions.add new BJ.TransactionModel

    render: ->
      ''


  class BJ.AppView extends Backbone.View
    el: '#budjet-app'

    initialize: ->
      @Action = new BJ.ActionView -> parent: @
      @Transactions = new BJ.TransactionCollection
      @Transactions.bind 'add', @add, @

    add: (row) ->
      view = new BJ.TransactionView {model: row}
      $('.budget-table tbody').append view.render

    render: ->
      ''
