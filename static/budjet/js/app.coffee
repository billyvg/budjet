window.namespace = (target, name, block) ->
  [target, name, block] = [(if typeof exports isnt 'undefined' then exports else window), arguments...] if arguments.length < 3
  top    = target
  target = target[item] or= {} for item in name.split '.'
  block target, top

namespace 'BJ', (exports) ->
  exports.templater = (template) ->
    Handlebars.compile($(template).html())

  jQuery ->
    exports.App = new exports.AppView {
      el: '#budjet-app'
    }
