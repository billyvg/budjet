(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  namespace('BJ', function(exports) {
    exports.TransactionView = (function(_super) {

      __extends(TransactionView, _super);

      function TransactionView() {
        TransactionView.__super__.constructor.apply(this, arguments);
      }

      TransactionView.prototype.template = '#transaction-row-tmpl';

      TransactionView.prototype.tagName = 'tr';

      TransactionView.prototype.render = function() {
        $(this.el).html((exports.templater(this.template))(this.model.toJSON()));
        return this.el;
      };

      return TransactionView;

    })(Backbone.View);
    exports.TransactionListView = (function(_super) {

      __extends(TransactionListView, _super);

      function TransactionListView() {
        TransactionListView.__super__.constructor.apply(this, arguments);
      }

      TransactionListView.prototype.initialize = function() {
        return this.collection.bind('add', this.add, this);
      };

      TransactionListView.prototype.add = function(model) {
        var view;
        view = new exports.TransactionView({
          model: model
        });
        return this.$el.find('tbody').append(view.render());
      };

      TransactionListView.prototype.render = function() {
        return '';
      };

      return TransactionListView;

    })(Backbone.View);
    return exports.TransactionFormView = (function(_super) {

      __extends(TransactionFormView, _super);

      function TransactionFormView() {
        TransactionFormView.__super__.constructor.apply(this, arguments);
      }

      TransactionFormView.prototype.initialize = function() {
        return '';
      };

      TransactionFormView.prototype.events = {
        'click .add-item': 'add'
      };

      TransactionFormView.prototype.add = function() {
        var data, model;
        data = this.$el.serializeArray();
        model = {};
        _.each(data, function(ele) {
          return model[ele.name] = ele.value;
        });
        this.collection.add(model);
        return false;
      };

      TransactionFormView.prototype.render = function() {
        return '';
      };

      return TransactionFormView;

    })(Backbone.View);
  });

}).call(this);
