(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('BJ', function(exports) {
    return exports.AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.initialize = function() {
        this.transactions = new exports.Transactions;
        this.form = new exports.TransactionFormView({
          el: '#transaction-form',
          collection: this.transactions
        });
        this.transactionList = new exports.TransactionListView({
          el: '#budget-table',
          collection: this.transactions
        });
        return this.transactions.fetch({
          add: true
        });
      };

      AppView.prototype.render = function() {
        return '';
      };

      return AppView;

    })(Backbone.View);
  });

}).call(this);
