/**
 * aggro.js is a simplified version of backbone.js' event system.
 * This script creates a global EventAggregator object and provides a class, EventSystem for exetsion.
 * Requires a Class object with extend method i.e. John Resig Class or other variant thereof.
 */
(function () {

  if (typeof(Class) == 'undefined') {
    throw new Error('aggro.js is missing required Class object.');
  }

  var array = [];
  var slice = array.slice;

  function keys(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (hasOwnProperty.call(obj, key)) keys.push(key);
    return keys;
  }

  function triggerEvents(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  }

  var EventSystem = Class.extend({
    events: null,
    init: function() {
      this.events = [];
    },
    on: function(name, callback, context) {
      this.events = this.events || [];
      var events = this.events[name] || (this.events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }
      names = name ? [name] : keys(this.events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this.events[name]) {
          this.events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this.events[name];
        }
      }
      return this;
    },
    trigger: function(name) {  
      if (!this.events) return this;
      var args = slice.call(arguments, 1);
      var events = this.events[name];
      var allEvents = this.events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    }
  });
  
  // Make class accessible for extension
  window.EventSystem = EventSystem;
  // Instantiate global event aggregator
  window.EventAggregator = new EventSystem();
  // Return class
  return EventSystem;
})();
