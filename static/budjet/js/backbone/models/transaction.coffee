namespace 'BJ', (exports) ->
  class exports.Transaction extends Backbone.Model
    defaults:
      amount: 0
      description: ''
      recurring: 0

    initialize: (attr) ->
      attr.recurring = Number attr.recurring
      attr.amount = Number attr.amount
      attr.date = new Date attr.date

      attr.recurring = if _.isNumber attr.recurring then attr.recurring else 0
      attr.recurring *= if attr.recurr_unit is 'Week' then 7 else 1

      attr.amount = if _.isNumber attr.amount then attr.amount else 0
      attr.date_formatted = attr.date.toFormat 'MM-D-YYYY'
      @set attr

    type: () ->
      return '' if @get 'amount' is 0
      if @get 'amount'  > 0 then 'income' else 'expense'

    expected: (targetDate) ->
      return 0 if @get('date').compareTo targetDate  > 0
      return @get 'amount' if @get('date').compareTo targetDate  is 0
      return @get 'amount' if not @get 'recurring'

      daysBetween = @get('date').getDaysBetweentargetDate
      numberTx = Math.floor(daysBetween / @get 'recurring') + 1

      @get 'amount' * numberTx

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
        return date.compareTo startDate >= 0 if not endDate
        return date.compareTo endDate <= 0 if not startDate
        return date.compareTo startDate >= 0 and date.compareTo endDate <= 0

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
          transaction.expected(endDate)
      ).reduce(
        (memo, num) ->
          memo + num
        , 0)

