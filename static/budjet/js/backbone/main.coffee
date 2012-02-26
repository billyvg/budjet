namespace 'BJ', (exports) ->
  class exports.AppView extends Backbone.View

    initialize: ->
      @transactions = new exports.Transactions
      @form = new exports.TransactionFormView {
        el: '#transaction-form'
        collection: @transactions
      }
      @transactionList = new exports.TransactionListView {
        el: '#budget-table'
        collection: @transactions
      }

    render: ->
      ''
