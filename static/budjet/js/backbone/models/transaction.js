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
        recurring: false
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

      Transactions.prototype.total = function(coll) {
        if (coll == null) coll = this.models;
        return _.reduce(coll, function(memo, transaction) {
          return memo + Number(transaction.get('amount'));
        }, 0);
      };

      Transactions.prototype.recurringTotal = function() {
        var recurring;
        recurring = this.filter(function(transaction) {
          return transaction.get('recurring');
        });
        return this.total(recurring);
      };

      Transactions.prototype.nonrecurringTotal = function() {
        var recurring;
        recurring = this.filter(function(transaction) {
          return !transaction.get('recurring');
        });
        return this.total(recurring);
      };

      Transactions.prototype.totalBalance = function(startDate, endDate) {
        var transactions;
        transactions = this.filter(function(transaction) {
          var date;
          date = transaction.get('date');
          if (!endDate) return date.compareTo(startDate) >= 0;
          if (!startDate) return date.compareTo(endDate) <= 0;
          return date.compareTo(startDate) >= 0 && date.compareTo(endDate) <= 0;
        });
        return this.total(transactions);
      };

      Transactions.prototype.estimatedBalance = function(startDate, endDate) {
        return true;
      };

      return Transactions;

    })(Backbone.Collection);
  });

}).call(this);
