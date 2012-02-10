namespace 'BJ', (exports) ->
  class exports.Transaction extends Backbone.Model
    defaults:
      amount: 0
      description: ''
      reoccuring: false

    type: () ->
      return '' if @get('amount') is 0
      if @get('amount') > 0 then 'income' else 'expense'

  class exports.Transactions extends Backbone.Collection
    model: exports.Transaction

    total: () ->
      @reduce (memo, transaction) ->
        memo + transaction.get 'amount'
      , 0

    reoccurringTotal: (period) ->
      ''


