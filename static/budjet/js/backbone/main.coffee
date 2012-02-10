namespace 'BJ', (exports) ->
  class exports.ActionView extends Backbone.View
    el: '#budget-actions'

    events: ->
      'click .add-item': 'add'

    initialize: ->
      this.App = this.options.parent

    add: ->
      this.App.Transactions.add new exports.TransactionModel

    render: ->
      ''


  class exports.AppView extends Backbone.View
    el: '#budjet-app'

    initialize: ->
      @Action = new exports.ActionView -> parent: @
      @Transactions = new exports.TransactionCollection
      @Transactions.bind 'add', @add, @

    add: (row) ->
      view = new exports.TransactionView {model: row}
      $('.budget-table tbody').append view.render

    render: ->
      ''
