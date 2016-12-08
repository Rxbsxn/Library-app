import Ember from 'ember';

export default Ember.Controller.extend({
  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageEnoughLong: Ember.computed.gte('message.length', 5),
  responseMessage: '',
  isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),

  actions: {
    sendMessage: function() {
      var email = this.get('emailAddress');
      var message = this.get('message');

      const newMessage = this.store.createRecord('contact', {
        email: email,
        message: message
      });

      newMessage.save().then((response) => {
        this.set('responseMessage', `Thanks, we delivered your message to admin: ${response.get('message')}`);
        this.set('emailAddress', '');
        this.set('message', '');
      });

    }
  }
});
