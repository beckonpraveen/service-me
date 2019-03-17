export const state = () => ({
  loginStatus: 0,
  userName:''
})

export const mutations = {
  login (state, userName) {
    state.loginStatus = 1;
    state.userName = userName;
  },
  logout (state) {
    state.loginStatus = 0;
    state.userName = '';
  }
}
