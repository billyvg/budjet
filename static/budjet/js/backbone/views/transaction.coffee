namespace 'BJ', (exports) ->
  class exports.TransactionView extends Backbone.View
    template: '#transaction-row-tmpl'
    tagName: 'tr'

    render: () ->
      $(@el).html((exports.templater(@template))(@model.toJSON()))
      @el

  class exports.TransactionListView extends Backbone.View
    initialize: () ->
      @collection.bind 'add', @add, @

    add: (model) ->
      view = new exports.TransactionView {
        model: model
      }

      @$el.find('tbody').append(view.render())

    render: () ->
      ''

  class exports.TransactionFormView extends Backbone.View
    initialize: () ->
      ''

    events:
      'click .add-item': 'add'


    add: () ->
      data = @$el.serializeArray()
      model = {}

      _.each(data, (ele) ->
        model[ele.name] = ele.value
      )

      @collection.add model

      false

    render: () ->
      ''
