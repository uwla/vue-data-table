export default {
    get(state, users) {
        state.users = users
    },

    update(state, user) {
        let index = state.users.findIndex(o => o.id == user.id)
        state.users.splice(index, 1, user)
    },

    delete(state, user) {
        state.users = state.users.filter(data => data.id != user.id)
    },

    create(state, user) {
        state.users.unshift(user)
    }
}
