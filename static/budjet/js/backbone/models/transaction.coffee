namespace 'BJ', (exports) ->
  class exports.Transaction extends Backbone.Model
    defaults:
      amount: 0
      description: ''
      recurring: false

    type: () ->
      return '' if @get('amount') is 0
      if @get('amount') > 0 then 'income' else 'expense'

  class exports.Transactions extends Backbone.Collection
    model: exports.Transaction

    total: (coll = @models) ->
      _.reduce coll
      , (memo, transaction) ->
          memo + Number(transaction.get 'amount')
      , 0

    recurringTotal: () ->
      recurring = @filter (transaction) -> transaction.get 'recurring'
      @total recurring

    nonrecurringTotal: () ->
      recurring = @filter (transaction) -> !transaction.get 'recurring'
      @total recurring

    totalBalance: (startDate, endDate) ->
      transactions = @filter (transaction) ->
        date = transaction.get 'date'
        return date.compareTo(startDate) >= 0 if not endDate
        return date.compareTo(endDate) <= 0 if not startDate
        return date.compareTo(startDate) >= 0 and date.compareTo(endDate) <= 0

      @total transactions

    estimatedBalance: (startDate, endDate) ->
      true


