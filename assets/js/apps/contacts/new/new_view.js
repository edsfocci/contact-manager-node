ContactManager.module('ContactsApp.New',
function(New, ContactManager, Backbone, Mn, $, _) {
  New.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
    title: 'New Contact'
  });
});
