import Vue from 'vue';
import Vuex from 'vuex';

//只要是plugin,都可以用这种use的方法去应用。
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		baseURL: location.hostname.match(/localhost/)?'':'/pride',
		//baseApiURL: location.hostname.match(/localhost/)?'//ves-pg-41:9020':'//wwwdev.ebi.ac.uk/pride/ws/archive',  
		baseApiURL: location.hostname.match(/localhost/)?'//wwwdev.ebi.ac.uk/pride/ws/archive':'//www.ebi.ac.uk/pride/ws/archive/v2',  
		username: '',
		token:''
	},
	mutations:{
		setUser(state,payload){
			for(let i in payload){
				state[i] = payload[i];
			}
		}
	}
});