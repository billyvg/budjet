(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('BJ', function(exports) {
    return exports.TransactionView = (function(_super) {

      __extends(TransactionView, _super);

      function TransactionView() {
        TransactionView.__super__.constructor.apply(this, arguments);
      }

      TransactionView.prototype.tagName = 'tr';

      TransactionView.prototype.render = function() {
        var template;
        template = '<td>1</td> <td>1/1/2011</td> <td>$100</td> <td>Temporary Description</td> <td>Yes</td>';
        $(this.el).html(template);
        return this.el;
      };

      return TransactionView;

    })(Backbone.View);
  });

}).call(this);
