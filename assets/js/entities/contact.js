ContactManager.module('Entities',
function(Entities, ContactManager, Backbone, Mn, $, _) {
  Entities.Contact = Backbone.Model.extend({
    urlRoot: 'contacts',

    defaults: {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },

    validate: function(attrs, options) {
      var errors = {};
      if (!attrs.firstName) errors.firstName = "can't be blank";

      if (!attrs.lastName) errors.lastName = "can't be blank";
      else if (attrs.lastName.length < 2) errors.lastName = 'is too short';

      if (! _.isEmpty(errors)) return errors;
    }
  });

  Entities.configureStorage(Entities.Contact);

  Entities.ContactCollection = Backbone.Collection.extend({
    url: 'contacts',
    model: Entities.Contact,

    comparator: function(contact) {
      return [contact.escape('firstName'), contact.escape('lastName')];
    }
  });

  Entities.configureStorage(Entities.ContactCollection);

  var contacts;

  var initializeContacts = function() {
    contacts = new Entities.ContactCollection([
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Brigham',
        phoneNumber: '555-0163'
      },
      {
        id: 1,
        firstName: 'Alice',
        lastName: 'Arten',
        phoneNumber: '555-0184'
      },
      {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Campbell',
        phoneNumber: '555-0129'
      }
      // {
      //   firstName: 'Alice',
      //   lastName: 'Tampen'
      // },
      // {
      //   firstName: 'Bob',
      //   lastName: 'Brigham'
      // },
      // {
      //   firstName: 'Alice',
      //   lastName: 'Artsy'
      // },
      // {
      //   firstName: 'Alice',
      //   lastName: 'Arten'
      // },
      // {
      //   firstName: 'Charlie',
      //   lastName: 'Campbell'
      // },
      // {
      //   firstName: 'Alice',
      //   lastName: 'Smith'
      // }
    ]);

    for (var i = 0; i < contacts.length; i++) contacts.models[i].save();

    return contacts.models;
  };

  var API = {
    getContactEntities: function() {
      var contacts = new Entities.ContactCollection();
      var defer = $.Deferred();

      setTimeout(function() {
        contacts.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });
      }, 1200);

      var promise = defer.promise();
      $.when(promise).done(function(contacts) {
        if (contacts.length === 0) {
          // if we don't have any contacts yet, create some for convenience
          var models = initializeContacts();
          contacts.reset(models);
        }
      });

      return promise;
    },

    getContactEntity: function(contactId) {
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();

      setTimeout(function() {
        contact.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });
      }, 1200);

      return defer.promise();
    }
  };

  ContactManager.reqres.setHandler('contact:entities', function() {
    return API.getContactEntities();
  });

  ContactManager.reqres.setHandler('contact:entity', function(id) {
    return API.getContactEntity(id);
  });
});
