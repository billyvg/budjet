BJ.TransactionView = Backbone.View.extend({
  tagName: 'tr'

, render: function() {
    var template = '<td>1</td> <td>1/1/2011</td> <td>$100</td> <td>Temporary Description</td> <td>Yes</td>'
    $(this.el).html(template)
    return this.el;
  }


})
