jQuery ->
  class TransactionModel extends Backbone.Model
    defaults:
      amount: 0
      description: ''
      type: ''
      reoccuring: false

    ###
    Retrieve the relative value of the transaction (i.e.
    negative for an expense, and positive for income).
    ###
    relative: ->
      if @get('type') == 'expense'
        return @get('amount')*-1

      @get('amount')

  class TransactionCollection extends Backbone.Collection
    model: BJ.TransactionModel
