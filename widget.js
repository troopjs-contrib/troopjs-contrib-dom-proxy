define([
  "troopjs-dom/component",
  "troopjs-hub/emitter",
], function(Widget, hub) {
  "use strict";

  var UNDFINED;
  var ARRAY_SLICE = Array.prototype.slice;
  var ARRAY_PUSH = Array.prototype.push;
  var OBJECT_TOSTRING = Object.prototype.toString;
  var TOSTRING_ARRAY = "[object Array]";
  var TOSTRING_STRING = "[object String]";
  var $ELEMENT = "$element";

  function proxy($event) {
    var args = ["dom/" + $event.type];

    ARRAY_PUSH.apply(args, arguments);

    return hub.emit.apply(hub, args);
  }

  return Widget.extend(function($element, name, events) {
    var me = this;
    var _events;

    if (events !== UNDFINED) {
      switch (OBJECT_TOSTRING.call(events)) {
        case TOSTRING_STRING:
          _events = [events];
          break;

        case TOSTRING_ARRAY:
          _events = events;
          break;

        default:
          throw new Error("Unsupported 'events' type");
      }

      _events.forEach(function(event) {
        me.on("dom/" + event, proxy);
      });
    }
  });
});
