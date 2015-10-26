ContactManager.module('ContactsApp.Show',
function(Show, ContactManager, Backbone, Mn, $, _) {
  Show.MissingContact = Mn.ItemView.extend({
    className: 'alert alert-danger',
    template: '#missing-contact-view'
  });

  Show.Contact = Mn.ItemView.extend({
    template: '#contact-view',

    events: {
      'click a.js-edit': 'editClicked'
    },

    editClicked: function(e) {
      e.preventDefault();
      this.trigger('contact:edit', this.model);
    }
  });
});
