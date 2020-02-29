export default {
    update(context, user) {
        context.commit('update', user)
    },

    delete(context, user) {
        context.commit('delete', user)
    },

    create(context, user) {
        context.commit('create', user)
    }
}
