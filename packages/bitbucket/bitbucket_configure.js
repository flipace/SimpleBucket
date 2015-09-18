Template.configureLoginServiceDialogForBitbucket.helpers({
  siteUrl: function () {
  // Twitter doesn't recognize localhost as a domain name
    return Meteor.absoluteUrl({replaceLocalhost: true});
  }
});

Template.configureLoginServiceDialogForBitbucket.fields = function () {
  return [
    {property: 'consumerKey', label: 'API key'},
    {property: 'secret', label: 'API secret'}
  ];
};
