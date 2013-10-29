if (Meteor.isClient) {


  Deps.autorun(function() {
    Meteor.subscribe("allUsers");
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });


  Template.hello.events({
    'click input': function() {
      console.log("click");

      if (Meteor.userId()) {
        console.log("Meteor.logoutOtherClients CALL");
        Meteor.logoutOtherClients(function(error) {
          if (error) console.log("Meteor.logoutOtherClients ERROR" + error)
        })
      }

    }
  });

  Template.users.helpers({
    users: function() {
      return Meteor.users.find({});
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function() {
    Meteor.publish("allUsers", function() {
      return Meteor.users.find();
    });
  });
}