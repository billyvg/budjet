namespace 'BJ', (exports) ->
  class exports.Transaction extends Backbone.Model
    defaults:
      amount: 0
      description: ''
      recurring: 0

    initialize: (attr) ->
      recurring = Number(attr.recurring)

      attr.recurring = if _.isNumber(recurring) then recurring else 0
      @set {recurring: attr.recurring}

    type: () ->
      return '' if @get('amount') is 0
      if @get('amount') > 0 then 'income' else 'expense'

    expected: (targetDate) ->
      return 0 if @get('date').compareTo(targetDate) > 0
      return @get('amount') if @get('date').compareTo(targetDate) is 0
      return @get('amount') if not @get('recurring')

      daysBetween = @get('date').getDaysBetween(targetDate)
      numberTx = Math.floor(daysBetween / @get('recurring')) + 1

      @get('amount') * numberTx

  class exports.Transactions extends Backbone.Collection
    model: exports.Transaction

    total: (coll = @models) ->
      _.reduce coll
      , (memo, transaction) ->
          memo + Number(transaction.get 'amount')
      , 0

    dateFilter: (startDate, endDate) ->
      @filter (transaction) ->
        date = transaction.get 'date'
        return date.compareTo(startDate) >= 0 if not endDate
        return date.compareTo(endDate) <= 0 if not startDate
        return date.compareTo(startDate) >= 0 and date.compareTo(endDate) <= 0

    recurringTotal: () ->
      recurring = @filter (transaction) -> transaction.get 'recurring'
      @total recurring

    nonrecurringTotal: () ->
      recurring = @filter (transaction) -> !transaction.get 'recurring'
      @total recurring

    totalBalance: (startDate, endDate) ->
      transactions = @dateFilter(startDate, endDate)
      @total transactions

    expected: (startDate, endDate) ->
      @dateFilter(startDate, endDate).map(
        (transaction) ->
          console.log transaction, transaction.expected(endDate)
          transaction.expected(endDate)
      ).reduce(
        (memo, num) ->
          console.log memo
          memo + num
        , 0)

