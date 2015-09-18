FlowRouter.route('/', {
    fastRender: true,
    action: function() {
        ReactLayout.render(MainLayout);
    }
})
