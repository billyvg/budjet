namespace 'BJ', (exports) ->
  class exports.TransactionView extends Backbone.View
    tagName: 'tr'

    render: () ->
      template = '<td>1</td> <td>1/1/2011</td> <td>$100</td> <td>Temporary Description</td> <td>Yes</td>'
      $(@el).html template
      @el
