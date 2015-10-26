ContactManager.module('ContactsApp.Show',
function(Show, ContactManager, Backbone, Mn, $, _) {
  Show.Controller = {
    showContact: function(id) {
      var loadingView = new ContactManager.Common.Views.Loading({
        title: 'Artificial Loading Delay',
        message: 'Data loading is delayed to demonstrate using a loading view.'
      });
      ContactManager.rootView.mainRegion.show(loadingView);

      var fetchingContact = ContactManager.request('contact:entity', id);
      $.when(fetchingContact).done(function(contact) {
        var contactView;

        if (contact) {
          contactView = new Show.Contact({
            model: contact
          });

          contactView.on('contact:edit', function(contact) {
            ContactManager.ContactsApp.trigger('contact:edit',
              contact.get('id'));
          });
        } else contactView = new Show.MissingContact();



        ContactManager.rootView.mainRegion.show(contactView);
      });
    }
  };
});
