import { createStore } from 'vuex'

export default createStore({
  state: {
    cameraIsActive:false
  },
  getters: {
    getCameraActive(state):boolean{
      return state.cameraIsActive
    }
  },
  mutations: {
    setCameraActive(state,payload:boolean){
      state.cameraIsActive = payload
    }
  },
  actions: {
    changeStateCamera({commit},payload){

      commit('setCameraActive',payload)
    }
  },
  modules: {
  }
})
