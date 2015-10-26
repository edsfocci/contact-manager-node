var ContactManager = new Mn.Application();

ContactManager.RootView = Mn.LayoutView.extend({
  el: 'body',

  regions: {
    mainRegion: '#main-region',
    dialogRegion: '#dialog-region'
  }
});

ContactManager.on('start', function() {
  ContactManager.rootView = new ContactManager.RootView();

  if (Backbone.history) {
    Backbone.history.start();

    if (this.getCurrentRoute() === '') {
      ContactManager.trigger('contacts:list');
    }
  }
});
