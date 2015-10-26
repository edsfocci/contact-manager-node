(function(Backbone, Mn) {
  _.extend(Mn.Application.prototype, {
    navigate: function(route, options) {
      options || (options = {});
      Backbone.history.navigate(route, options);
    },

    getCurrentRoute: function() {
      return Backbone.history.fragment;
    }
  });
})(Backbone, Mn);
