namespace 'BJ', (exports) ->
  class exports.TransactionView extends Backbone.View
    tagName: 'tr'

    render: () ->
      template = '<td>1</td> <td>1/1/2011</td> <td>$100</td> <td>Temporary Description</td> <td>Yes</td>'
      $(@el).html template
      @el

  class exports.TransactionListView extends Backbone.View
    initialize: () ->
      @collection.bind 'add', @add, @

    add: (model) ->
      view = new exports.TransactionView {
        model: model
      }

      $(@el).find('tbody').append(view.render())

    render: () ->
      ''

  class exports.TransactionFormView extends Backbone.View
    initialize: () ->
      ''

    events:
      'click .add-item': 'add'


    add: () ->
      data = $(@el).serializeArray()
      model = {}

      _.each(data, (ele) ->
        model[ele.name] = ele.value
      )

      @collection.add model

      false

    render: () ->
      ''
