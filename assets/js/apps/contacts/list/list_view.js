ContactManager.module('ContactsApp.List',
function(List, ContactManager, Backbone, Mn, $, _) {
  List.Layout = Mn.LayoutView.extend({
    template: '#contact-list-layout',

    regions: {
      panelRegion: '#panel-region',
      contactsRegion: '#contacts-region'
    }
  });

  List.Panel = Mn.ItemView.extend({
    template: '#contact-list-panel',

    triggers: {
      'click button.js-new': 'contact:new'
    }
  });

  List.Contact = Mn.ItemView.extend({
    tagName: 'tr',
    template: '#contact-list-item',

    events: {
      'click': 'highlightName',
      'click td a.js-show': 'showClicked',
      'click td a.js-edit': 'editClicked',
      'click button.js-delete': 'deleteClicked'
    },

    flash: function(cssClass) {
      var $view = this.$el;
      $view.hide().toggleClass(cssClass).fadeIn(800, function() {
        setTimeout(function() {
          $view.toggleClass(cssClass);
        }, 500);
      });
    },

    highlightName: function() {
      this.$el.toggleClass('warning');
    },

    showClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('contact:show', this.model);
    },

    editClicked: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.trigger('contact:edit', this.model);
    },

    deleteClicked: function(e) {
      e.stopPropagation();
      this.trigger('contact:delete', this.model);
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Mn.ItemView.prototype.remove.call(self);
      });
    }
  });

  List.Contacts = Mn.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: '#contact-list',
    childView: List.Contact,
    childViewContainer: 'tbody',

    collectionEvents: {
      'reset': function() {
        this.attachHtml = function(collectionView, itemView, index) {
          collectionView.$el.append(itemView.el);
        };
      }
    },

    // initialize: function() {
    //   this.listenTo(this.collection, 'reset', function() {
    //     this.attachHtml = function(collectionView, itemView, index) {
    //       collectionView.$el.append(itemView.el);
    //     };
    //   });
    // },

    onRenderCollection: function() {
      this.attachHtml = function(collectionView, itemView, index) {
        collectionView.$el.prepend(itemView.el);
      };
    }
  });
});
