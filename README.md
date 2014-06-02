jsutils
=======

A few javascript utilities that I've been working on.

aggro.js
--------

Basically, a stripped down, minimalized version of backbone.js' event system. aggro.js provides a global event aggregator object and an extendable class. Requires an extendable Class object (with method extend) like John Resig's simple javascript class.

Global event aggregator:

Subscribe
    EventAggregator.on('my event', callback, context);

Unsubscribe
    // Unsubscribe all events
    EventAggregator.off();
    // Unsubscribe all specific events
    EventAggregator.off('my event');

Trigger (publish)
    // Trigger an event
    EventAggregator.trigger('my event', args);


Use by extending:
    // Now myEventfulClass has on, off and trigger methods
    var myEventfulClass = EventSystem.extend({});

    var myEventfulInstance = new myEventfulClass();
    
    // Now all methods have a context of myEventfulInstance.
    myEventfulInstance.trigger('my event');
