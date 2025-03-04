import Vue from 'vue';
import Vuex from 'vuex';

//use only for importing plugin
Vue.use(Vuex);

/**
 * for mode management
 */
let mode = ''
if(process.env.NODE_ENV == 'development')
	mode = 'dev'
else if(location.href.match(/wwwdev\.ebi\.ac\.uk\/pride/))
	mode = 'prodev'
else if(location.href.match(/www\.ebi\.ac\.uk\/pride/))
	mode = 'prod'
else
	mode = 'prodev'

if(mode == 'dev'){
	console.log('mode is dev')
}
if(mode == 'prod'){
	console.log('mode is prod')
	console.log('2024-1')
}


export default new Vuex.Store({
	state:{
		baseURL: (mode == 'prod' || mode == 'prodev')? '/pride' : '', // this URL is only for the static files path like txt, png, md, jpg etc. Not for the request API
		baseApiURL: (mode == 'dev' || mode == 'prod') ? 'https://www.ebi.ac.uk/pride/ws/archive/v2' : 'https://wwwdev.ebi.ac.uk/pride/ws/archive/v2',
		baseApiURL_new: (mode == 'dev' || mode == 'prod') ? 'https://www.ebi.ac.uk/pride/ws/archive/v3' : 'https://wwwdev.ebi.ac.uk/pride/ws/archive/v3',
		basePrivateURL: (mode == 'prod') ? 'https://www.ebi.ac.uk/pride/private/ws/archive/v2' : 'https://wwwdev.ebi.ac.uk/pride/private/ws/archive/v2',
		baseMoleculesApiURL:'https://www.ebi.ac.uk/pride/molecules/ws',
		baseMoleculesApiURL_new:'https://www.ebi.ac.uk/pride/ws/usi/v1',
		username: '',
		token:'',
		type:''

	},
	mutations:{
		setUser(state,payload){
			for(let i in payload){
				state[i] = payload[i];
			}
		}
	}
});
