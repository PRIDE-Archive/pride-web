<template>
	<Poptip v-else trigger="hover" placement="left" style="position: absolute; right: 0;">
      <div v-html="getSVG(icon)"></div>
      <div class="" slot="title" style="display: flex; justify-content: space-between; align-items: center; width: 150px" >
        <span>Omics score: {{score}}</span>
        <Icon type="md-help-circle" @click="gotoIconHelpPage"/>
      </div>
      <div class="" slot="content">
        <div><span style="margin-right: 5px">{{icon.viewsCount}}</span><span>Views</span></div>
        <div><span style="margin-right: 5px">{{icon.connectionsCount}}</span><span>Connections</span></div>
        <div><span style="margin-right: 5px">{{icon.citationsCount}}</span><span>Citations</span></div>
        <div><span style="margin-right: 5px">{{icon.reanalysisCount}}</span><span>Reanalyses</span></div>
        <div><span style="margin-right: 5px">{{icon.downloadCount}}</span><span>Downloads</span></div>
      </div>
    </Poptip>

	      
	
</template>
<script>
	let score = 0
	function a() {}
	a.roundNumber = function (n, l) {
	  return (
	    void 0 === l && (l = 2), Math.round(n * Math.pow(10, l)) / Math.pow(10, l)
	  );
	};
	a.toRadians = function (n) {
	  return n * (Math.PI / 180);
	};
	a.tan = function (l) {
	  return a.roundNumber(Math.tan(a.toRadians(l)));
	};
	function n(dataset) {
	  this.dataset = Object.assign(
	    {
	      id: Math.random().toString(36).substr(3, 8),
	      viewsCount: 0,
	      viewsCountScaled: 0,
	      connectionsCount: 0,
	      citationsCount: 0,
	      citationsCountScaled: 0,
	      reanalysisCount: 0,
	      reanalysisCountScaled: 0,
	      downloadCount: 0,
	      downloadCountScaled: 0
	    },
	    dataset || {}
	  );
	}
	n.prototype.convertData = function () {
	  var n = this.dataset.connectionsCountScaled || 0;
	  return (
	    n > 1 && (n = 1),
	    [
	      {
	        score: this.dataset.viewsCount || 0,
	        scale: this.dataset.viewsCountScaled || 0,
	        color: "#2E8B57",
	        label: "Views"
	      },
	      {
	        score: this.dataset.connectionsCount || 0,
	        scale: n,
	        color: "#0099cc",
	        label: "Connections"
	      },
	      {
	        score: this.dataset.citationsCount || 0,
	        scale: this.dataset.citationsCountScaled || 0,
	        color: "#FF0000",
	        label: "Citations"
	      },
	      {
	        score: this.dataset.reanalysisCount || 0,
	        scale: this.dataset.reanalysisCountScaled || 0,
	        color: "#4B0082",
	        label: "Reanalyses"
	      },
	      {
	        score: this.dataset.downloadCount || 0,
	        scale: this.dataset.downloadCountScaled || 0,
	        color: "#FFA500",
	        label: "Downloads"
	      }
	    ]
	  );
	};
	n.prototype.normalise_number_leaves = function (n, l) {
	  for (
	    var t = n.reduce(function (n, l) {
	        return n + l.scale;
	      }, 0),
	      e = 0,
	      a = 0,
	      i = 0;
	    i < n.length;
	    i++
	  )
	    (n[i].norm_leaves = n[i].scale / t / (1 / l)),
	      e < n[i].norm_leaves && ((e = n[i].norm_leaves), (a = i));
	  var u = 0;
	  for (i = 0; i < n.length; i++)
	    i !== a &&
	      n[i].norm_leaves > 0 &&
	      ((n[i].norm_leaves =
	        n[i].norm_leaves < 1 ? 1 : Math.round(n[i].norm_leaves)),
	      (u += n[i].norm_leaves));
	  n[a].norm_leaves = l - u;
	};
	n.prototype.svg_linear_gradient_direction = function (n) {
	  return n < 45
	    ? {
	        x: 50 * a.tan(n) + 50,
	        y: 0
	      }
	    : n < 90
	    ? {
	        x: 100,
	        y: 50 * a.tan(90 - n)
	      }
	    : n < 135
	    ? {
	        x: 100,
	        y: 50 * a.tan(135 - n) + 50
	      }
	    : n < 180
	    ? {
	        x: 50 * a.tan(180 - n) + 50,
	        y: 100
	      }
	    : n < 225
	    ? {
	        x: 50 * a.tan(225 - n),
	        y: 100
	      }
	    : n < 270
	    ? {
	        x: 0,
	        y: 50 * a.tan(270 - n) + 50
	      }
	    : n <= 315
	    ? {
	        x: 0,
	        y: 50 * a.tan(315 - n)
	      }
	    : n < 360
	    ? {
	        x: 50 * a.tan(n),
	        y: 0
	      }
	    : void 0;
	};
	n.prototype.initialize = function (height, width) {
	  let t = this.convertData();
	  this.normalise_number_leaves(t, 12);
	  let s = [];
	  for (let d = 0; d < t.length; d++)
	    for (let c = 0; c < t[d].norm_leaves; c++) s.push(t[d]);

	  score = Math.round(
	    t.reduce(function (n, l) {
	      return n + 1e3 * l.scale;
	    }, 0)
	  );
	  
	  let SVG = `
	  <svg viewBox="0 0 720 720" class="rosette-chart" height="${height}" width="${width}">
	    <defs>
	  `;
	  for (let d = 0; d < 12; d++) {
	    let p = this.svg_linear_gradient_direction((360 * d) / 12);
	    SVG += `
	      <linearGradient id="${this.dataset.id}_gradient_${d}" x1="${
	      100 - p.x
	    }%" y1="${100 - p.y}%" x2="${p.x}%" y2="${p.y}%">
	        <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
	        <stop offset="100%" style="stop-color:${
	          d < s.length ? s[d].color : "#D3D3D3"
	        };stop-opacity:1"></stop>
	      </linearGradient>
	      `;
	  }
	  let g = 0;
	  SVG += `</defs>
		<g style="cursor: pointer" transform="matrix(2.769449835201722,0,0,2.769449835201722,-623.698285897772,-621.9327602781555)">
	      <path d="m 378.9895761619361,264.3949755505212 c -5.7581064046051,-9.760471988086 -13.9767744892666,-17.8967349868568 -23.7880988708504,-23.5771958597846 -19.6283610230305,11.35944983617 -32.8333198402356,32.5714433799553 -32.8333198402356,56.8810218555477 8e-13,24.309578475592 13.1997639769653,45.5005305810539 32.8281250000002,56.859980417222 -11.3189343625164,-19.6517526426536 -12.1487673822503,-44.6243573250858 0.00602185554,-65.67706984024 5.9880211686214,-10.3715569008459 14.3702453380125,-18.4586997617603 24.0528968555452,-24.0266605769822 -0.088750556225,-0.1532609037314 -0.1756740404876,-0.307601595516 -0.2656250000002,-0.4600759957605 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 420.8837824508476,288.3712819635018 c -0.1064304300389,-11.3318698969113 -3.1558742772426,-22.4874143880489 -8.8125,-32.3125 -22.6783841986818,0.023391619623 -44.7202107622013,11.79103748485 -56.8749999999976,32.8437500000043 -12.1547892377953,21.0527125151545 -11.3189343625162,46.0044973573463 3e-13,65.6562500000003 0.023391619619,-22.6783841986843 11.7910374848463,-44.7202107622037 32.8437499999955,-56.8750000000028 10.371556900848,-5.9880211686176 21.6743474022139,-8.8005802455077 32.8437500000001,-8.7812500000001 -2.297844251e-4,-0.1771031141508 0.00166261591,-0.3542278162052 -2e-13,-0.5312500000001 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 445.1770761619407,330.0824755505187 c 5.5737634923062,-9.8669024181249 8.5106398987825,-21.0526092640995 8.5244011291495,-32.3896958597847 -19.6517526426534,-11.3189343625115 -44.6243573250855,-12.1487673822458 -65.6770698402401,0.00602185555 -21.0527125151536,12.1547892377968 -32.8047333803807,34.1815962185377 -32.8281249999998,56.8599804172223 11.359449836168,-19.6283610230347 32.5714433799533,-32.8333198402394 56.8810218555426,-32.8333198402444 11.9760423372391,2e-12 23.1708255835205,3.2156476404536 32.8341468555453,8.8170894230179 0.088352557926,-0.1534906881563 0.1785537757177,-0.3059389796057 0.2656249999998,-0.4600759957606 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 445.3600888638353,378.352075674592 c 9.760471988086,-5.758106404605 17.8967349868569,-13.9767744892664 23.5771958597846,-23.7880988708504 -11.3594498361699,-19.6283610230302 -32.5714433799552,-32.8333198402352 -56.8810218555477,-32.8333198402357 -24.309578475592,9e-13 -45.5005305810539,13.1997639769654 -56.8599804172219,32.8281250000004 19.6517526426538,-11.3189343625165 44.6243573250856,-12.1487673822505 65.6770698402401,0.00602185554 10.371556900846,5.9880211686212 18.4586997617602,14.3702453380126 24.0266605769822,24.0528968555453 0.1532609037312,-0.088750556225 0.307601595516,-0.1756740404876 0.4600759957604,-0.2656250000003 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 421.3837824508547,420.2462819635038 c 11.3318698969114,-0.1064304300389 22.4874143880489,-3.1558742772425 32.3124999999998,-8.8125000000003 -0.023391619623,-22.6783841986814 -11.7910374848499,-44.720210762201 -32.8437500000043,-56.8749999999976 -21.0527125151545,-12.1547892377952 -46.004497357346,-11.3189343625162 -65.65625,4e-13 22.6783841986841,0.023391619619 44.7202107622035,11.7910374848462 56.8750000000027,32.8437499999955 5.9880211686178,10.371556900848 8.8005802455077,21.674347402214 8.78125,32.8437500000002 0.1771031141507,-2.297844253e-4 0.3542278162053,0.00166261591 0.5312500000001,-2e-13 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 379.6725888638378,444.5395756745965 c 9.8669024181249,5.5737634923063 21.0526092640994,8.5106398987828 32.3896958597846,8.5244011291495 11.3189343625117,-19.6517526426532 12.1487673822459,-44.6243573250854 -0.00602185555,-65.6770698402401 -12.1547892377967,-21.0527125151536 -34.1815962185376,-32.8047333803806 -56.8599804172221,-32.8281249999996 19.6283610230345,11.3594498361679 32.8333198402394,32.5714433799532 32.8333198402444,56.8810218555426 -2.1e-12,11.9760423372391 -3.2156476404539,23.1708255835205 -8.8170894230179,32.8341468555455 0.1534906881566,0.088352557925 0.3059389796059,0.1785537757177 0.4600759957606,0.2656249999997 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 331.4029887397643,444.7225883764912 c 5.758106404605,9.7604719880859 13.9767744892662,17.896734986857 23.7880988708504,23.5771958597845 19.6283610230303,-11.3594498361699 32.8333198402354,-32.5714433799552 32.8333198402359,-56.8810218555478 -1.1e-12,-24.309578475592 -13.1997639769654,-45.5005305810537 -32.8281250000003,-56.8599804172217 11.3189343625163,19.6517526426537 12.1487673822505,44.6243573250857 -0.00602185554,65.67706984024 -5.9880211686216,10.3715569008459 -14.370245338013,18.4586997617602 -24.0528968555454,24.0266605769824 0.088750556226,0.1532609037307 0.1756740404877,0.307601595516 0.2656250000002,0.4600759957603 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 289.5087824508529,420.7462819635105 c 0.106430430039,11.3318698969113 3.1558742772424,22.4874143880491 8.8125000000001,32.3124999999998 22.6783841986818,-0.023391619623 44.7202107622011,-11.7910374848498 56.8749999999978,-32.8437500000043 12.1547892377952,-21.0527125151546 11.3189343625161,-46.0044973573459 -5e-13,-65.6562499999997 -0.023391619619,22.6783841986841 -11.7910374848461,44.7202107622035 -32.8437499999954,56.8750000000026 -10.3715569008481,5.9880211686177 -21.6743474022142,8.8005802455077 -32.8437500000004,8.7812500000003 2.297844263e-4,0.1771031141507 -0.00166261591,0.3542278162052 3e-13,0.5312499999998 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 265.2154887397601,379.0350883764934 c -5.5737634923061,9.8669024181251 -8.5106398987828,21.0526092640995 -8.5244011291495,32.3896958597847 19.6517526426535,11.3189343625118 44.6243573250854,12.1487673822458 65.6770698402401,-0.00602185555 21.0527125151537,-12.1547892377968 32.8047333803805,-34.1815962185374 32.8281249999995,-56.859980417222 -11.359449836168,19.6283610230345 -32.5714433799531,32.8333198402395 -56.8810218555425,32.8333198402444 -11.9760423372391,-2.2e-12 -23.1708255835207,-3.2156476404538 -32.8341468555456,-8.8170894230179 -0.088352557924,0.1534906881571 -0.1785537757177,0.3059389796057 -0.2656249999997,0.4600759957606 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 265.0324760378657,330.7654882524203 c -9.760471988086,5.7581064046052 -17.8967349868572,13.9767744892663 -23.5771958597847,23.7880988708502 11.35944983617,19.6283610230307 32.5714433799553,32.8333198402353 56.8810218555478,32.8333198402359 24.309578475592,-9e-13 45.5005305810537,-13.1997639769654 56.8599804172215,-32.8281250000001 -19.6517526426535,11.3189343625163 -44.6243573250855,12.1487673822505 -65.6770698402397,-0.00602185554 -10.3715569008459,-5.9880211686215 -18.4586997617603,-14.3702453380129 -24.0266605769824,-24.0528968555454 -0.1532609037301,0.088750556226 -0.3076015955161,0.1756740404876 -0.4600759957603,0.2656250000003 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 289.0087824508462,288.8712819635089 c -11.3318698969114,0.106430430039 -22.4874143880491,3.1558742772423 -32.3124999999999,8.8125 0.023391619623,22.6783841986819 11.7910374848502,44.720210762201 32.8437500000042,56.8749999999978 21.0527125151547,12.1547892377951 46.0044973573459,11.318934362516 65.6562499999998,-5e-13 -22.6783841986841,-0.023391619619 -44.7202107622035,-11.791037484846 -56.8750000000025,-32.8437499999955 -5.9880211686176,-10.3715569008482 -8.8005802455075,-21.6743474022142 -8.7812500000001,-32.8437500000003 -0.1771031141501,2.297844264e-4 -0.3542278162053,-0.00166261591 -0.53125,3e-13 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <path d="m 330.7199760378628,264.5779882524163 c -9.8669024181249,-5.5737634923063 -21.0526092640994,-8.5106398987829 -32.3896958597846,-8.5244011291496 -11.3189343625118,19.6517526426536 -12.1487673822455,44.6243573250852 0.00602185555,65.6770698402401 12.154789237797,21.0527125151536 34.1815962185375,32.8047333803803 56.8599804172221,32.8281249999995 -19.6283610230345,-11.359449836168 -32.8333198402396,-32.571443379953 -32.8333198402443,-56.8810218555425 2.1e-12,-11.9760423372393 3.2156476404538,-23.1708255835206 8.8170894230178,-32.8341468555454 -0.1534906881565,-0.088352557924 -0.3059389796056,-0.1785537757178 -0.4600759957605,-0.2656249999999 z" fill="url('#${
	        this.dataset.id
	      }_gradient_${g++}')" style="stroke:none"></path>
	      <circle cx="355" cy="355" fill="white" r="52"></circle><text x="355" y="355" dy=".3em" style="font-size: 32px" text-anchor="middle">${score}</text>
	    </g>
	  </svg>`;
	  return SVG
	};
	export default {
		props: ['icon','height','width'],
		data() {
		    return {
		      score:0,
		      list: [
			        // {
			        //   id: "E-GEOD-25401",
			        //   source: "arrayexpress-repository",
			        //   title:
			        //     "Adipose Tissue MicroRNAs as Regulators of CCL2 Production in Human Obesity [gene expression]",
			        //   description:
			        //     "We used an unbiased systems biology approach to study the regulation of gene expression in human adipose tissue focusing on inflammation. We show that microRNAs play a major role as regulators of CCL2 production in obesity. Abdominal subcutaneous adipose needle biopsies were obtained from women (n=56) with a wide variation in BMI. From the biopsies we prepared and hybridised biotinylated complementary RNA to GeneChip Human Gene 1.0 ST Arrays (Affymetrix Inc., Santa Clara, CA),  labelled RNA to Affymetrix miRNA arrays, and bisulphite converted DNA to Illumina Infinium HumanMethylation27 beadchips using standardised protocols (Affymetrix Inc., Illumina Inc.) . Subsequent analyses of gene expression was performed using the Affymetrix GeneChip Operating Software version 1.4. To allow comparisons of transcript levels between samples, all samples were subjected to an all-probeset scaling-to-target signal of 100.",
			        //   keywords: ["transcription profiling by array"],
			        //   organisms: [
			        //     {
			        //       acc: "9606",
			        //       name: "Homo sapiens"
			        //     }
			        //   ],
			        //   publicationDate: "20120812",
			        //   score: null,
			        //   omicsType: ["Genomics"],
			        //   citationsCount: 0,
			        //   connectionsCount: 2,
			        //   reanalysisCount: 0,
			        //   viewsCount: 8,
			        //   downloadCount: 15,
			        //   citationsCountScaled: 0,
			        //   connectionsCountScaled: 0.0000011610767593651,
			        //   reanalysisCountScaled: 0,
			        //   viewsCountScaled: 0.0024676125848241827,
			        //   downloadCountScaled: 0.00036681094563861783,
			        //   claimable: false
			        // },
		      ]
		    };
		},
	
	  	methods:{
		    getSVG(t){
		      let svg = new n(t)
		      let height = this.height || 65
		      let width = this.width || 65
		      // console.log('height width', this.height, this.width)
		      let svgInt = svg.initialize(height, width)
		      this.score = score
		      // console.log('score',this.icon.id, score)
		      return svgInt
		    },
		    gotoIconHelpPage(){
		    	window.open('http://blog.omicsdi.org/post/rosette-chart/')
		    }
	  	},
	  	mounted () {
	  		// if(this.icon.id=='PXD028666')
	  		// console.log('111height width', this.height, this.width)
    	// 	console.log('iconiconiconicon',this.icon.id)
  		}
	};
</script>