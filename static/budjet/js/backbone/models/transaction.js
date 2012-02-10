(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('BJ', function(exports) {
    exports.Transaction = (function(_super) {

      __extends(Transaction, _super);

      function Transaction() {
        Transaction.__super__.constructor.apply(this, arguments);
      }

      Transaction.prototype.defaults = {
        amount: 0,
        description: '',
        reoccuring: false
      };

      Transaction.prototype.type = function() {
        if (this.get('amount') === 0) return '';
        if (this.get('amount') > 0) {
          return 'income';
        } else {
          return 'expense';
        }
      };

      return Transaction;

    })(Backbone.Model);
    return exports.Transactions = (function(_super) {

      __extends(Transactions, _super);

      function Transactions() {
        Transactions.__super__.constructor.apply(this, arguments);
      }

      Transactions.prototype.model = exports.Transaction;

      Transactions.prototype.total = function() {
        return this.reduce(function(memo, transaction) {
          return memo + transaction.get('amount');
        }, 0);
      };

      Transactions.prototype.reoccurringTotal = function(period) {
        return '';
      };

      return Transactions;

    })(Backbone.Collection);
  });

}).call(this);
