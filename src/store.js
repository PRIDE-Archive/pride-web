import Vue from 'vue';
import Vuex from 'vuex';

//只要是plugin,都可以用这种use的方法去应用。
Vue.use(Vuex);

console.log(process.env.NODE_ENV)
console.log(location.href)

let mode = ''
if(process.env.NODE_ENV == 'development')
	mode = 'dev'
else if(location.href.match(/www\.ebi\.ac\.uk\/pride/))
	mode = 'prod'
else
	mode = 'prodev'

console.log('mode',mode)
console.log('location.href',location.href)
if(mode == 'dev'){
	console.log('mode is dev')
}
if(mode == 'prod'){
	console.log('mode is prod')
}


export default new Vuex.Store({
	state:{
		baseURL: (mode == 'prod' || mode == 'prodev') ?'/pride':'',
		//baseApiURL: location.hostname.match(/localhost/)?'//ves-pg-41:9020':'//wwwdev.ebi.ac.uk/pride/ws/archive',
		baseApiURL: (mode == 'dev' || mode == 'prod') ? 'https://www.ebi.ac.uk/pride/ws/archive/v2' : 'https://wwwdev.ebi.ac.uk/pride/ws/archive/v2',
		basePrivateURL: (mode == 'dev' || mode == 'prod') ? 'https://www.ebi.ac.uk/pride/private/ws/archive/v2' : 'https://www.ebi.ac.uk/pride/private/ws/archive/v2',
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
