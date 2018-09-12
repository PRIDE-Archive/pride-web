import Vue from 'vue';
import Vuex from 'vuex';

//只要是plugin,都可以用这种use的方法去应用。
Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		baseURL: location.hostname.match(/ebi/)?'/pride':'',
		baseApiURL: location.hostname.match(/ebi/)?'http://wwwdev.ebi.ac.uk/pride/ws/archive':'http://ves-pg-41:9020',  
	},
});