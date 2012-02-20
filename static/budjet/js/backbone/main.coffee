namespace 'BJ', (exports) ->
  class exports.ActionView extends Backbone.View
    el: '#budget-actions'

    events: ->
      'click .add-item': 'add'

    initialize: ->
      @app = this.options.parent

    add: ->
      @app.transactions.add new exports.Transaction

    render: ->
      ''


  class exports.AppView extends Backbone.View
    el: '#budjet-app'

    initialize: ->
      @action = new exports.ActionView -> parent: @
      @transactions = new exports.Transactions
      @transactions.bind 'add', @add, @

    add: (row) ->
      view = new exports.TransactionView {model: row}
      $('.budget-table tbody').append view.render

    render: ->
      ''
