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
        recurring: 0
      };

      Transaction.prototype.initialize = function(attr) {
        attr.recurring = Number(attr.recurring);
        attr.amount = Number(attr.amount);
        attr.date = new Date(attr.date);
        attr.recurring = _.isNumber(attr.recurring) ? attr.recurring : 0;
        attr.recurring *= attr.recurr_unit === 'Week' ? 7 : 1;
        return attr.amount = _.isNumber(attr.amount) ? attr.amount : 0;
      };

      Transaction.prototype.type = function() {
        if (this.get('amount') === 0) return '';
        if (this.get('amount') > 0) {
          return 'income';
        } else {
          return 'expense';
        }
      };

      Transaction.prototype.expected = function(targetDate) {
        var daysBetween, numberTx;
        if (this.get('date').compareTo(targetDate) > 0) return 0;
        if (this.get('date').compareTo(targetDate) === 0) {
          return this.get('amount');
        }
        if (!this.get('recurring')) return this.get('amount');
        daysBetween = this.get('date').getDaysBetween(targetDate);
        numberTx = Math.floor(daysBetween / this.get('recurring')) + 1;
        return this.get('amount') * numberTx;
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

      Transactions.prototype.dateFilter = function(startDate, endDate) {
        return this.filter(function(transaction) {
          var date;
          date = transaction.get('date');
          if (!endDate) return date.compareTo(startDate) >= 0;
          if (!startDate) return date.compareTo(endDate) <= 0;
          return date.compareTo(startDate) >= 0 && date.compareTo(endDate) <= 0;
        });
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
        transactions = this.dateFilter(startDate, endDate);
        return this.total(transactions);
      };

      Transactions.prototype.expected = function(startDate, endDate) {
        return this.dateFilter(startDate, endDate).map(function(transaction) {
          return transaction.expected(endDate);
        }).reduce(function(memo, num) {
          return memo + num;
        }, 0);
      };

      return Transactions;

    })(Backbone.Collection);
  });

}).call(this);
