BJ.Transaction = Em.Object.extend({
  amount: 0,
  description: '',
  type: '',
  reoccuring: false,

  relative: function() {
    if (this.get('type') == 'expense') {
      return this.get('amount')*-1;
    }
    return this.get('amount');
  }.property('type', 'amount')
});
