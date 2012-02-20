(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('BJ', function(exports) {
    exports.ActionView = (function(_super) {

      __extends(ActionView, _super);

      function ActionView() {
        ActionView.__super__.constructor.apply(this, arguments);
      }

      ActionView.prototype.el = '#budget-actions';

      ActionView.prototype.events = function() {
        return {
          'click .add-item': 'add'
        };
      };

      ActionView.prototype.initialize = function() {
        return this.app = this.options.parent;
      };

      ActionView.prototype.add = function() {
        return this.app.transactions.add(new exports.Transaction);
      };

      ActionView.prototype.render = function() {
        return '';
      };

      return ActionView;

    })(Backbone.View);
    return exports.AppView = (function(_super) {

      __extends(AppView, _super);

      function AppView() {
        AppView.__super__.constructor.apply(this, arguments);
      }

      AppView.prototype.el = '#budjet-app';

      AppView.prototype.initialize = function() {
        this.action = new exports.ActionView(function() {
          return {
            parent: this
          };
        });
        this.transactions = new exports.Transactions;
        return this.transactions.bind('add', this.add, this);
      };

      AppView.prototype.add = function(row) {
        var view;
        view = new exports.TransactionView({
          model: row
        });
        return $('.budget-table tbody').append(view.render);
      };

      AppView.prototype.render = function() {
        return '';
      };

      return AppView;

    })(Backbone.View);
  });

}).call(this);
