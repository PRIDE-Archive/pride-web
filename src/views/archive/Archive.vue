<template>
  <div class="archive-container">
      <div class="panel nav"><NavBar page="archive"/></div>
      <div class="browse-data-container">
          <Row class="search-row">
              <Card>
                <p slot="title">Search</p>
                <div class="search-container">
                    <div class="search-input">
                       
                        <div class="search-input-wrapper">
                            <div class="fake-input">
                              <div class="tag-wrapper">
                                  <Tag class="tag-in-search-input" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                                  <Select
                                      ref="searchRef"
                                      v-model="selectTemp"
                                      filterable
                                      remote
                                      placeholder="input here"
                                      :remote-method="searchInputChange"
                                      :loading="searchInputLoading"
                                      @on-open-change="searchInputLoadingDropdownOpen"
                                      style="width:500px">
                                      <Option v-for="(item, index) in autoCompleteArray" :value="item" :key="index">{{item}}</Option>
                                  </Select>
                              </div>
                              <Icon type="ios-search"></Icon>
                            </div>
                        </div>
                    </div>
                    <div class="search-filter">
                        <div class="filter-wrapper">
                            <div class="filter-condition">
                                <Select ref="fieldRef" class="filter-selector" v-model="fieldValue" style="width:200px" @on-change="fieldChange">
                                    <Option v-for="item in fieldSelectors" :value="item.value" :label="item.label" :key="item.value" >
                                            <span>{{ item.label }}</span>
                                            <span style="float:right;color:#ccc">{{item.number}}</span>
                                    </Option>
                                </Select>
                            </div>
                            <span class="separator">></span>
                            <div class="filter-condition ">
                                <Select ref="containRef" class="filter-selector input-search-needed" v-model="containValue" style="min-width:200px" size="small" filterable remote :remote-method="querySpecificFacets" :loading="querySpecificFacetsLoading" @on-change="containChange" loading-text="loading..." @on-open-change="containDropdownOpen" @on-query-change="queryChange">
                                    <Option v-for="item in containSelectors" :value="item.value" :label="item.label" :key="item.value">
                                      <span>
                                            <span>{{ item.label }}</span>
                                            <span style="color:#ccc"><span v-if="item.number">(</span>{{item.number}}<span v-if="item.number">)</span></span>
                                      </span>
                                    </Option>
                                </Select>
                            </div>
                        </div>

                        <div class="search-button">
                            <a class="button search-button" @click="submitSearch">Search</a>
                        </div>
                    </div>
                    <div class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" v-for="(item,index) in tagArray" :key="index" closable @on-close="tagDelete">{{item}}</Tag>
                      </div>
                    </div>
                    <div v-for="(item, index) in filterCombination" class="search-condition-container">
                      <div class="tag-container">
                          <Tag type="border" closable @on-close="conditionDelete(index,item)">
                            {{item.field}} > {{item.contains}}
                          </Tag>
                      </div>
                    </div>
                </div>
              </Card>
          </Row>
          <Row>
              <Card>
                  <p slot="title" class="resource-list-title-container">
                    <span>List of Datasets ({{total}})</span>
                    <span v-if="publicaitionList.length>0" class="sort-wrapper">
                        <span>Order by: </span>
                        <div class="sortOption"> 
                            <a class="order-action"><Icon v-if="order=='DESC'" type="md-arrow-dropdown" size="22" @click="orderChange('ASC')"/></a>
                            <a class="order-action"><Icon v-if="order=='ASC'" type="md-arrow-dropup" size="22" @click="orderChange('DESC')"/></a>
                        </div>
                        <span style="margin-left: 10px">Sort by: </span>
                        <div class="sortOption">
                            <Select v-model="sortType" size="small" style="width:95px" @on-change="sortChange">
                                <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="sortOption page">
                            <span style="margin-left: 5px">Page: </span>
                            <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                        </div>

                    </span>
                  </p>
                  <Spin size="large" fix v-if="loading"></Spin>
                  <Card v-if="publicaitionList.length>0" v-for="publicationItem in publicaitionList" class="resource-item" v-bind:key = "publicationItem.accession">
                      <div style="width:85%; display: inline-block;" >
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: publicationItem.accession}}"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.accession}}</text-highlight></router-link><span v-if="publicationItem.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                            <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.title}}</text-highlight></p> 
                            <p><span class="project-info">{{projectItemsSpecies}}: </span> <span v-for="item in publicationItem.species"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight>;</span><a class="more-action" style="margin-left: 5px"v-if= "publicationItem.organisms.length>3" @click="gotoDetails(publicationItem.accession)">(More)</a></p>
                            <span><span class="project-info">{{projectItemsProjectDescription}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.projectDescription}}</text-highlight>
                              <a class="more-action" @click="gotoDetails(publicationItem.accession)">(More)</a>
                            </span>
                            <p><span class="project-info">{{projectItemsSubmitters}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.submitters}}</text-highlight></p>
                            <p><span class="project-info">{{projectItemsPublicationDate}}: </span><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{publicationItem.publicationDate}}</text-highlight></p>
                            <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in publicationItem.projectTags" :key="index">
                                <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                                <a v-else class="button gray-dataset-button" href="javascript:void(0)" @click="searchByLabel('project_tags_facet=='+datesetItem )">
                                   <Icon type="ios-pricetag"></Icon>
                                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight>
                                </a>
                            </Dropdown>
                            <Collapse v-if="hightlightMode" simple>
                                <Panel>
                                    <span>Matched Items</span>
                                    <p class="matched-items" v-for="highlightItem in publicationItem.hightlightItemArray" slot="content">
                                        <span class="project-info">{{highlightItem.name}}: </span>
                                       <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                                    </p>
                                </Panel>
                            </Collapse>
                      </div>
                      <div style="width:15%; display: inline-block; position: absolute;">
                            <Poptip trigger="hover" placement="left" style="position: absolute; right: 0;">
                              <img :src="archive_logo" >
                              <div class="" slot="title" style="display: flex; justify-content: space-between; align-items: center; width: 150px" >
                                <span>Omics score: 0</span>
                                <Icon type="md-help-circle" />
                              </div>
                              <div class="" slot="content">
                                <div><span style="margin-right: 5px">1</span><span>Views</span></div>
                                <div><span style="margin-right: 5px">2</span><span>Connections</span></div>
                                <div><span style="margin-right: 5px">3</span><span>Citations</span></div>
                                <div><span style="margin-right: 5px">4</span><span>Reanalyses</span></div>
                                <div><span style="margin-right: 5px">5</span><span>Downloads</span></div>
                              </div>
                            </Poptip>
                            <svg width="65" viewBox="0 0 720 720" class="rosette-chart" height="65">
  <defs>
    <linearGradient id="E-PROT-1_gradient_0" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#2E8B57;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_1" x1="21%" y1="100%" x2="79%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_2" x1="0%" y1="71%" x2="100%" y2="28.999999999999996%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_4" x1="0%" y1="36.5%" x2="100%" y2="63.5%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_5" x1="21%" y1="0%" x2="79%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_6" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_7" x1="86.5%" y1="0%" x2="13.5%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_8" x1="100%" y1="21%" x2="0%" y2="79%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_9" x1="100%" y1="50%" x2="0%" y2="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#0099cc;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_10" x1="100%" y1="86.5%" x2="0%" y2="13.5%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#4B0082;stop-opacity:1"></stop>
    </linearGradient>
    <linearGradient id="E-PROT-1_gradient_11" x1="129%" y1="100%" x2="-28.999999999999996%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1"></stop>
    </linearGradient>
  </defs>
  <g style="cursor: pointer" transform="matrix(2.769449835201722,0,0,2.769449835201722,-623.698285897772,-621.9327602781555)">
    <path d="m 378.9895761619361,264.3949755505212 c -5.7581064046051,-9.760471988086 -13.9767744892666,-17.8967349868568 -23.7880988708504,-23.5771958597846 -19.6283610230305,11.35944983617 -32.8333198402356,32.5714433799553 -32.8333198402356,56.8810218555477 8e-13,24.309578475592 13.1997639769653,45.5005305810539 32.8281250000002,56.859980417222 -11.3189343625164,-19.6517526426536 -12.1487673822503,-44.6243573250858 0.00602185554,-65.67706984024 5.9880211686214,-10.3715569008459 14.3702453380125,-18.4586997617603 24.0528968555452,-24.0266605769822 -0.088750556225,-0.1532609037314 -0.1756740404876,-0.307601595516 -0.2656250000002,-0.4600759957605 z" fill="url('#E-PROT-1_gradient_0')" style="stroke:none"></path>
    <path d="m 420.8837824508476,288.3712819635018 c -0.1064304300389,-11.3318698969113 -3.1558742772426,-22.4874143880489 -8.8125,-32.3125 -22.6783841986818,0.023391619623 -44.7202107622013,11.79103748485 -56.8749999999976,32.8437500000043 -12.1547892377953,21.0527125151545 -11.3189343625162,46.0044973573463 3e-13,65.6562500000003 0.023391619619,-22.6783841986843 11.7910374848463,-44.7202107622037 32.8437499999955,-56.8750000000028 10.371556900848,-5.9880211686176 21.6743474022139,-8.8005802455077 32.8437500000001,-8.7812500000001 -2.297844251e-4,-0.1771031141508 0.00166261591,-0.3542278162052 -2e-13,-0.5312500000001 z" fill="url('#E-PROT-1_gradient_1')" style="stroke:none"></path>
    <path d="m 445.1770761619407,330.0824755505187 c 5.5737634923062,-9.8669024181249 8.5106398987825,-21.0526092640995 8.5244011291495,-32.3896958597847 -19.6517526426534,-11.3189343625115 -44.6243573250855,-12.1487673822458 -65.6770698402401,0.00602185555 -21.0527125151536,12.1547892377968 -32.8047333803807,34.1815962185377 -32.8281249999998,56.8599804172223 11.359449836168,-19.6283610230347 32.5714433799533,-32.8333198402394 56.8810218555426,-32.8333198402444 11.9760423372391,2e-12 23.1708255835205,3.2156476404536 32.8341468555453,8.8170894230179 0.088352557926,-0.1534906881563 0.1785537757177,-0.3059389796057 0.2656249999998,-0.4600759957606 z" fill="url('#E-PROT-1_gradient_2')" style="stroke:none"></path>
    <path d="m 445.3600888638353,378.352075674592 c 9.760471988086,-5.758106404605 17.8967349868569,-13.9767744892664 23.5771958597846,-23.7880988708504 -11.3594498361699,-19.6283610230302 -32.5714433799552,-32.8333198402352 -56.8810218555477,-32.8333198402357 -24.309578475592,9e-13 -45.5005305810539,13.1997639769654 -56.8599804172219,32.8281250000004 19.6517526426538,-11.3189343625165 44.6243573250856,-12.1487673822505 65.6770698402401,0.00602185554 10.371556900846,5.9880211686212 18.4586997617602,14.3702453380126 24.0266605769822,24.0528968555453 0.1532609037312,-0.088750556225 0.307601595516,-0.1756740404876 0.4600759957604,-0.2656250000003 z" fill="url('#E-PROT-1_gradient_3')" style="stroke:none"></path>
    <path d="m 421.3837824508547,420.2462819635038 c 11.3318698969114,-0.1064304300389 22.4874143880489,-3.1558742772425 32.3124999999998,-8.8125000000003 -0.023391619623,-22.6783841986814 -11.7910374848499,-44.720210762201 -32.8437500000043,-56.8749999999976 -21.0527125151545,-12.1547892377952 -46.004497357346,-11.3189343625162 -65.65625,4e-13 22.6783841986841,0.023391619619 44.7202107622035,11.7910374848462 56.8750000000027,32.8437499999955 5.9880211686178,10.371556900848 8.8005802455077,21.674347402214 8.78125,32.8437500000002 0.1771031141507,-2.297844253e-4 0.3542278162053,0.00166261591 0.5312500000001,-2e-13 z" fill="url('#E-PROT-1_gradient_4')" style="stroke:none"></path>
    <path d="m 379.6725888638378,444.5395756745965 c 9.8669024181249,5.5737634923063 21.0526092640994,8.5106398987828 32.3896958597846,8.5244011291495 11.3189343625117,-19.6517526426532 12.1487673822459,-44.6243573250854 -0.00602185555,-65.6770698402401 -12.1547892377967,-21.0527125151536 -34.1815962185376,-32.8047333803806 -56.8599804172221,-32.8281249999996 19.6283610230345,11.3594498361679 32.8333198402394,32.5714433799532 32.8333198402444,56.8810218555426 -2.1e-12,11.9760423372391 -3.2156476404539,23.1708255835205 -8.8170894230179,32.8341468555455 0.1534906881566,0.088352557925 0.3059389796059,0.1785537757177 0.4600759957606,0.2656249999997 z" fill="url('#E-PROT-1_gradient_5')" style="stroke:none"></path>
    <path d="m 331.4029887397643,444.7225883764912 c 5.758106404605,9.7604719880859 13.9767744892662,17.896734986857 23.7880988708504,23.5771958597845 19.6283610230303,-11.3594498361699 32.8333198402354,-32.5714433799552 32.8333198402359,-56.8810218555478 -1.1e-12,-24.309578475592 -13.1997639769654,-45.5005305810537 -32.8281250000003,-56.8599804172217 11.3189343625163,19.6517526426537 12.1487673822505,44.6243573250857 -0.00602185554,65.67706984024 -5.9880211686216,10.3715569008459 -14.370245338013,18.4586997617602 -24.0528968555454,24.0266605769824 0.088750556226,0.1532609037307 0.1756740404877,0.307601595516 0.2656250000002,0.4600759957603 z" fill="url('#E-PROT-1_gradient_6')" style="stroke:none"></path>
    <path d="m 289.5087824508529,420.7462819635105 c 0.106430430039,11.3318698969113 3.1558742772424,22.4874143880491 8.8125000000001,32.3124999999998 22.6783841986818,-0.023391619623 44.7202107622011,-11.7910374848498 56.8749999999978,-32.8437500000043 12.1547892377952,-21.0527125151546 11.3189343625161,-46.0044973573459 -5e-13,-65.6562499999997 -0.023391619619,22.6783841986841 -11.7910374848461,44.7202107622035 -32.8437499999954,56.8750000000026 -10.3715569008481,5.9880211686177 -21.6743474022142,8.8005802455077 -32.8437500000004,8.7812500000003 2.297844263e-4,0.1771031141507 -0.00166261591,0.3542278162052 3e-13,0.5312499999998 z" fill="url('#E-PROT-1_gradient_7')" style="stroke:none"></path>
    <path d="m 265.2154887397601,379.0350883764934 c -5.5737634923061,9.8669024181251 -8.5106398987828,21.0526092640995 -8.5244011291495,32.3896958597847 19.6517526426535,11.3189343625118 44.6243573250854,12.1487673822458 65.6770698402401,-0.00602185555 21.0527125151537,-12.1547892377968 32.8047333803805,-34.1815962185374 32.8281249999995,-56.859980417222 -11.359449836168,19.6283610230345 -32.5714433799531,32.8333198402395 -56.8810218555425,32.8333198402444 -11.9760423372391,-2.2e-12 -23.1708255835207,-3.2156476404538 -32.8341468555456,-8.8170894230179 -0.088352557924,0.1534906881571 -0.1785537757177,0.3059389796057 -0.2656249999997,0.4600759957606 z" fill="url('#E-PROT-1_gradient_8')" style="stroke:none"></path>
    <path d="m 265.0324760378657,330.7654882524203 c -9.760471988086,5.7581064046052 -17.8967349868572,13.9767744892663 -23.5771958597847,23.7880988708502 11.35944983617,19.6283610230307 32.5714433799553,32.8333198402353 56.8810218555478,32.8333198402359 24.309578475592,-9e-13 45.5005305810537,-13.1997639769654 56.8599804172215,-32.8281250000001 -19.6517526426535,11.3189343625163 -44.6243573250855,12.1487673822505 -65.6770698402397,-0.00602185554 -10.3715569008459,-5.9880211686215 -18.4586997617603,-14.3702453380129 -24.0266605769824,-24.0528968555454 -0.1532609037301,0.088750556226 -0.3076015955161,0.1756740404876 -0.4600759957603,0.2656250000003 z" fill="url('#E-PROT-1_gradient_9')" style="stroke:none"></path>
    <path d="m 289.0087824508462,288.8712819635089 c -11.3318698969114,0.106430430039 -22.4874143880491,3.1558742772423 -32.3124999999999,8.8125 0.023391619623,22.6783841986819 11.7910374848502,44.720210762201 32.8437500000042,56.8749999999978 21.0527125151547,12.1547892377951 46.0044973573459,11.318934362516 65.6562499999998,-5e-13 -22.6783841986841,-0.023391619619 -44.7202107622035,-11.791037484846 -56.8750000000025,-32.8437499999955 -5.9880211686176,-10.3715569008482 -8.8005802455075,-21.6743474022142 -8.7812500000001,-32.8437500000003 -0.1771031141501,2.297844264e-4 -0.3542278162053,-0.00166261591 -0.53125,3e-13 z" fill="url('#E-PROT-1_gradient_10')" style="stroke:none"></path>
    <path d="m 330.7199760378628,264.5779882524163 c -9.8669024181249,-5.5737634923063 -21.0526092640994,-8.5106398987829 -32.3896958597846,-8.5244011291496 -11.3189343625118,19.6517526426536 -12.1487673822455,44.6243573250852 0.00602185555,65.6770698402401 12.154789237797,21.0527125151536 34.1815962185375,32.8047333803803 56.8599804172221,32.8281249999995 -19.6283610230345,-11.359449836168 -32.8333198402396,-32.571443379953 -32.8333198402443,-56.8810218555425 2.1e-12,-11.9760423372393 3.2156476404538,-23.1708255835206 8.8170894230178,-32.8341468555454 -0.1534906881565,-0.088352557924 -0.3059389796056,-0.1785537757178 -0.4600759957605,-0.2656249999999 z" fill="url('#E-PROT-1_gradient_11')" style="stroke:none"></path>
    <circle cx="355" cy="355" fill="white" r="52"></circle><text x="355" y="355" dy=".3em" style="font-size: 32px" text-anchor="middle">239</text>
  </g>
</svg>
                            
                            <!-- <span style="position:absolute;">123</span> -->
                      </div>
                  </Card>
                  
                  <div v-if="publicaitionList.length>0" class="page-container">
                    <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                  </div>
                  <div style="text-align: center;"v-if="publicaitionList.length==0">
                    <p style="margin-top: 20px; color: #a7a7a7">Sorry, no projects found for search term <span style="color: #5bc0be">{{keyword}}</span> and the current set of active filters. Try with a different combination of search term and filters.</p>
                    <p style="margin: 20px 0; color: #a7a7a7; cursor: pointer">
                      If you were looking for a specific project and it was not found, it may still be held private. If you think it should be public you can request its publication <a style="color: #5bc0be" @click="gotoPublish">here</a>.
                    </p>
                    

                  </div>
              </Card>
          </Row>
      </div>
  </div>
</template>

<script>
  import NavBar from '@/components/Nav'
  import store from "@/store.js"
  var paramsFromLandingPage='';
  export default {
    name: 'archive',
    data(){
      return {
          keyword:'',
          selectTemp:'',
          searchInputLoading:false,
          fieldValue:'',
          containValue:'',
          loading:true,
          querySpecificFacetsLoading:false,
          highlightKeyword:'',
          HighlightKeywordSensitive:false,
          facetsURL: this.$store.state.baseApiURL + '/facet/projects',
          searchConfigURL: this.$store.state.baseURL + '/config/facets/config.json', 
          projectItemsConfigURL: this.$store.state.baseURL + '/config/projectItems/config.json',
          queryArchiveProjectListApi: this.$store.state.baseApiURL + '/search/projects',
          autoCompleteApi: this.$store.state.baseApiURL + '/search/autocomplete?keyword=',
          containItemSearch:'',
          fieldSelectors:[],
          currentPage:1,
          containSelectors:[{ //Need to be initial value to make sure "No match data" hint will not be shown.
              value: '',
              label: '',
              check: false,
              number: ''
          }],
          //containSelectors:[],
          filterCombination:[],
          sortType:'Date',
          publicaitionList:[],
          sortList:[
            {
                value: 'Accession',
                label: 'Accession'
            },
            {
                value: 'Title',
                label: 'Title'
            },
            {
                value: 'Relevance',
                label: 'Relevance'
            },
            {
                value: 'Submission Date',
                label: 'Submission Date'
            },
            {
                value: 'Publication Date',
                label: 'Publication Date'
            },
          ],
          page:0,
          pageSize:20,
          filter:'',
          sort:'',
          order:'DESC',
          total:0,
          facetsConfigRes:'',
          projectItemsConfigRes:'',
          hightlightMode:false,
          hightlightItemArray:[],
          tagArray:[],
          projectItemsSpecies:'',
          projectItemsProjectDescription:'',
          projectItemsPublicationDate:'',
          projectItemsSubmitters:'',
          normalQuery:{},
          autoCompleteArray:[],
          archive_logo: this.$store.state.baseURL + '/archive_logo.png',
      }
    },
    beforeRouteUpdate:function (to, from, next) {
      //console.log('to query',to.query);
      /*
      let filter = to.query.split('?')[1].split('filter');
      if(filter.length>1)
        filter.split("=");
      console.log('filter',filter);*/
        if(to.query.refresh){
           window.location = window.location.pathname
           next();
        }
        
        this.updateCondition(to.query);
        console.log('beforeRouteUpdate',to.query);
        this.queryArchiveProjectList(to.query);
        //this.$bus.$emit('submit-search', {params: to.params, query: to.query});
        next();
        
      
    },
    components: {
      NavBar
    },
    methods:{
      searchInputChange (query, splitBool) {
          if(splitBool){
            //console.log('searchInputChange',query);
            this.tadAdd(query);
            this.$refs.searchRef.setQuery(null);
          }

          if(query !== ''){
              console.log('query',query);
              this.searchInputLoading = false;
              this.$http
                  .get(this.autoCompleteApi + query)
                  .then(function(res){
                     this.autoCompleteArray=res.body;
                  },function(err){

                  });
          }
          else{
            this.autoCompleteArray = [];
          }
      },
      setFilter(){
          this.$http
            .get(this.facetsURL + '?dateGap=%2B1YEAR&facetPageSize=100')
            .then(function(res){
                //console.log('res.body._embedded',res.body._embedded);
                let facetsMap = res.body._embedded.facets;
                this.fieldSelectors = [];
                    let archiveObj = this.facetsConfigRes.body.archive;
                    for(let i in archiveObj){
                        let item = {
                            value: archiveObj[i].name,
                            label: archiveObj[i].name,
                            containItems:[]
                        }
                        for(let j in facetsMap){
                            if(facetsMap[j].field == i){
                              for(let k=0; k<facetsMap[j].values.length; k++){
                                  let containItem = {
                                      value: facetsMap[j].values[k].value,
                                      label: facetsMap[j].values[k].value,
                                      check: false,
                                      number: facetsMap[j].values[k].count
                                  }
                                  item.containItems.push(containItem);
                              }
                              break;
                            }
                        }
                        this.fieldSelectors.push(item);
                    }
                    this.fieldValue = this.fieldSelectors[0].value;
                    //console.log( this.fieldSelectors[0].value);
                    //console.log('this.fieldValue',this.fieldValue);
                    this.containSelectors = this.fieldSelectors[0].containItems;
            },function(err){

            });
      },
      setSearchCondition(){
          let condition='';       
          for(let i=0; i<this.filterCombination.length; i++){
            for(let j in this.facetsConfigRes.body.archive){
              if(this.facetsConfigRes.body.archive[j].name == this.filterCombination[i].field){
                   condition += j+'=='+this.filterCombination[i].contains+','
                break;
              }
            }
          }
          this.filter = condition.replace(/,$/gi,'');
          console.log(this.filter)
      },
      queryArchiveProjectList(q){
          this.publicaitionList = [];
          this.loading = true;
          let query = q || this.$route.query;
          query.dateGap = '+1YEAR';
          let pageSizeFound = false;
          for(let i in query){
              if(i == 'pageSize'){
                  pageSizeFound = true;
                  break;
              }
          }
          if(!pageSizeFound)
            query.pageSize = this.pageSize;

          if(this.keyword)
            this.hightlightMode = true;
          else{
            //for highlight mode
            this.hightlightMode = false;
            query.keyword ='*:*';
          }
          //console.log(encodeURIComponent('*:*'));
          //console.log('search query',query);
          this.$http
            .get(this.queryArchiveProjectListApi,{params: query})
            .then(function(res){
              this.total = res.body.page.totalElements;
                this.loading = false;
                if(res.body._embedded && res.body._embedded.compactprojects){
                    this.setHighlightKeywords();
                    let projectsList = res.body._embedded.compactprojects;
                    console.log('projectsList',projectsList);
                      for(let i=0; i<projectsList.length; i++){
                          let item = {
                              accession: projectsList[i].accession,
                              title: projectsList[i].title,
                              organisms: projectsList[i].organisms, //for show more species link in UI
                              species: projectsList[i].organisms,
                              projectDescription: projectsList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                              publicationDate: projectsList[i].publicationDate,
                              projectTags: projectsList[i].projectTags,
                              submissionType: projectsList[i].submissionType,
                              hightlightItemArray:[],
                          }
                          if(item.species.length>3){
                            item.species=item.species.slice(0,4)
                          }
                          //for submitters:
                          item.submitters='';
                          for(let j=0; j< projectsList[i].submitters.length; j++){
                              item.submitters += (projectsList[i].submitters[j]+',');
                              //if no need to hightlight, it could be removed.
                              // let hightlightItem={
                              //     name:this.projectItemsConfigRes[j],
                              //     content:item.submitters.replace(/,$/gi,'')
                              // }
                              // item.hightlightItemArray.push(hightlightItem);
                          }
                          item.submitters = item.submitters.replace(/,$/gi,'')

                          for(let j in projectsList[i].highlights){
                              let content='';
                              for(let k=0; k<projectsList[i].highlights[j].length;k++){
                                //let temp = projectsList[i].highlights[j].k;
                                //console.log(projectsList[i].highlights[j][k]);
                                content += (projectsList[i].highlights[j][k]+'').replace(/<(\w+|\/\w+)>/g,'')+',';
                              }
                              let hightlightItem={
                                  name:this.projectItemsConfigRes[j],
                                  content:content.replace(/,$/gi,'')
                              }
                              item.hightlightItemArray.push(hightlightItem);
                          }
                          this.projectItemsSpecies = this.projectItemsConfigRes['organisms'];
                          this.projectItemsProjectDescription = this.projectItemsConfigRes['projectDescription'];
                          this.projectItemsPublicationDate = this.projectItemsConfigRes['publicationDate'];
                          this.projectItemsSubmitters = this.projectItemsConfigRes['submitters'];
                          this.publicaitionList.push(item);  
                      }
                      console.log('this.publicaitionList', this.publicaitionList);
                }
                else{

                  this.$Message.error({content:'No results', duration:1});
                }
                
            },function(err){

            });
           
      },
      queryChange(query){
        if(query === ''){
            for(let i=0; i<this.fieldSelectors.length; i++){
                if(this.fieldSelectors[i].value == this.fieldValue){
                    this.containSelectors = this.fieldSelectors[i].containItems;
                    break;
                }
            }
        }
      },
      gotoDetails(id){
          this.$router.push({name:'dataset',params:{id:id}});
      },
      setHighlightKeywords(){
          if(this.keyword)
            this.highlightKeyword = this.keyword.split(',');
          //console.log('this.highlightKeyword',this.highlightKeyword);
      },
      querySpecificFacets(keyword){
          if(this.containSelectors[0] && !this.containSelectors[0].value || this.containValue == keyword)
            return;
         
          if(keyword.length<4 && keyword.length>0) {
              this.querySpecificFacetsLoading = true;
              for(let i=0; i<this.fieldSelectors.length; i++){
                //console.log('aaa');
                  if(this.fieldSelectors[i].value == this.fieldValue){
                      let itemArray=[];
                      var re = new RegExp(keyword,'i');
                      for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                          if(this.fieldSelectors[i].containItems[j].value.match(re)){
                              let item = {
                                  value: this.fieldSelectors[i].containItems[j].value,
                                  label: this.fieldSelectors[i].containItems[j].label,
                                  check: false,
                                  number: this.fieldSelectors[i].containItems[j].number,
                              }
                              itemArray.push(item);
                          }
                      }
                      this.containSelectors=itemArray;
                      if(this.containSelectors.length>0){
                          this.querySpecificFacetsLoading = false;
                          break;
                      }
                      else{
                          for(let i in this.facetsConfigRes.body.archive){
                              if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                                  this.$http
                                    .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                                    .then(function(res){
                                        //console.log(res.body._embedded);
                                         if(res.body._embedded && res.body._embedded.facets){
                                              let facetsArray = res.body._embedded.facets;
                                              let fieldFind = false;
                                              for(let j=0; j<facetsArray.length; j++){
                                                //console.log('ddd');
                                                  if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                                      fieldFind = true;
                                                      this.querySpecificFacetsLoading = false;
                                                      let itemArray = [];
                                                      for(let k=0; k<facetsArray[j].values.length; k++){
                                                        //console.log('eee');
                                                            let item = {
                                                                value: facetsArray[j].values[k].value,
                                                                label: facetsArray[j].values[k].value,
                                                                check: false,
                                                                number: facetsArray[j].values[k].count,
                                                            }
                                                            itemArray.push(item);
                                                      }
                                                      this.containSelectors = itemArray;
                                                  }
                                              }
                                              if(!fieldFind){
                                                  this.querySpecificFacetsLoading = false;
                                              }
                                         }
                                    },function(err){
                                        this.querySpecificFacetsLoading = false;
                                    });
                                  break;
                              }
                          }
                      }
                  }
              }
          }
          else if(keyword.length>=4) { 
              this.querySpecificFacetsLoading = true;
              for(let i in this.facetsConfigRes.body.archive){
                  if(this.facetsConfigRes.body.archive[i].name == this.fieldValue){
                      this.$http
                        .get(this.facetsURL + '?dateGap=%2B1YEAR' + '&filter='+i+'=='+keyword)
                        .then(function(res){
                            //console.log(res.body._embedded);
                             if(res.body._embedded && res.body._embedded.facets){
                                  let facetsArray = res.body._embedded.facets;
                                  let fieldFind = false;
                                  for(let j=0; j<facetsArray.length; j++){
                                    //console.log('ddd');
                                      if(this.facetsConfigRes.body.archive[facetsArray[j].field] && this.facetsConfigRes.body.archive[facetsArray[j].field].name == this.fieldValue && facetsArray[j].values.length>0){
                                          fieldFind = true;
                                          this.querySpecificFacetsLoading = false;
                                          let itemArray = [];
                                          for(let k=0; k<facetsArray[j].values.length; k++){
                                            //console.log('eee');
                                                let item = {
                                                    value: facetsArray[j].values[k].value,
                                                    label: facetsArray[j].values[k].value,
                                                    check: false,
                                                    number: facetsArray[j].values[k].count,
                                                }
                                                itemArray.push(item);
                                          }
                                          this.containSelectors = itemArray;
                                      }
                                  }
                                  if(!fieldFind){
                                      this.querySpecificFacetsLoading = false;
                                  }
                             }
                        },function(err){
                            this.querySpecificFacetsLoading = false;
                        });
                      break;
                  }
              }
          }
      },
      containDropdownOpen(open){
          //console.log( this.$refs.containRef);
          //console.log('aaaaaa');
          if(!open && this.$refs.containRef.isFocused){
            this.$refs.containRef.toggleMenu();
            //this.$Message.success({content:'repeated item', duration:1});
          }
      },
      searchInputLoadingDropdownOpen(open){
        console.log('open',open)
          if(open){
              window.addEventListener('mousedown', this.searchInputBlur, false);
              window.addEventListener('touchstart', this.searchInputBlur, false);
          }
          else{
            window.removeEventListener('mousedown', this.searchInputBlur, false);
            window.removeEventListener('touchstart', this.searchInputBlur, false);
          }
      },
      searchInputBlur(e){
        this.$nextTick(()=>{
            e.target.click();
        });
      },
      keywordChange(keyword){
        /*
        if(keyword == ';'){
          this.keyword = ''
          console.log(123);
          return;
        }
        if(keyword.charAt(keyword.length-1) ==';')
          console.log(keyword);*/
      },
      autoCompleteFilter (value, option) {
          return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      conditionChange(index,condition){
        this.filterCombination[index].condition = condition;
        this.setSearchCondition();
      },
      fieldChange(){
          console.log('fieldChange');
        for(let i in this.fieldSelectors){
          if(this.fieldSelectors[i].value == this.fieldValue){
              /*
              this.containSelectors=[{ //Need to be initial value to make sure "No match data" hint will not be shown.
                  value: '',
                  label: '',
                  check: false,
                  number: ''
              }],*/
             //console.log('fieldChange his.fieldValue', this.fieldValue);
              //console.log('fieldChange this.containSelectors',this.containSelectors);
              this.containSelectors = this.fieldSelectors[i].containItems
              this.containValue='';
              this.$refs.containRef.setQuery(null);
              break;
          }
        }
      },
      containChange(){
        console.log('containChange');
          if(this.containValue){
              this.$refs.containRef.toggleMenu();
              let filterCombinationFound =false;
              for(let j=0; j<this.filterCombination.length; j++){
                  if(this.filterCombination[j].field == this.fieldValue && this.filterCombination[j].contains == this.containValue){
                    filterCombinationFound = true;
                    //this.$Message.success({content:'repeated item', duration:1});
                    break;
                  }
              }
              if(!filterCombinationFound){
                  let item={
                      condition:'And',
                      field:this.fieldValue,
                      contains:this.containValue
                  };
                  this.filterCombination.push(item);
                  this.setSearchCondition();
              }
          }
      },
      tadAdd(item){
        this.tagArray.push(item);
        this.setKeywords();
      },
      tagDelete(event, name){
          const index = this.tagArray.indexOf(name);
          this.tagArray.splice(index, 1);
          this.setKeywords();
      },
      setKeywords(){
          this.keyword='';
          for(let i=0; i<this.tagArray.length; i++){
              this.keyword += this.tagArray[i]+',';
          }
          this.keyword = this.keyword.replace(/,$/gi,'');
      },
      conditionDelete(index,item){
        this.filterCombination.splice(index,1);
        this.$refs.containRef.setQuery(null);
        this.setSearchCondition();
        /*
          for(let i=0; i<this.fieldSelectors.length; i++){
              if(this.fieldSelectors[i].value == item.field){
                  for(let j=0; j<this.fieldSelectors[i].containItems.length; j++){
                    if(this.fieldSelectors[i].containItems[j].value == item.contains){
                        this.fieldSelectors[i].containItems[j].check =false;
                        break;
                    }
                  }
                  break;
              }
          }
        */
      },
      keywordSearch(value){

        //console.log('this.keyword',this.keyword);
        //this.keyword = value;
      },
      submitSearch(){
        let temp = this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').value;
        if(temp && this.tagArray.length == 0){
          this.tadAdd(temp);
          this.$refs.searchRef.setQuery(null);
        }
        this.$router.push({name: 'archive', query: this.query});
        //this.$Message.success({content:'new result', duration:1});
      },
      pageChange(page){
          this.page = page-1;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      pageSizeChange(size){
          this.pageSize = size;
          this.setFilter();
          this.$router.push({name: 'archive', query: this.query});
      },
      sortChange(type){
        console.log(type);
        if(type == 'Title')
          this.sort = 'project_title'
        else if(type == 'Accession')
          this.sort = 'accession'
        else if(type == 'Relevance')
          this.sort = 'score'
        else if(type == 'Submission Date')
          this.sort = 'submission_date';
        else if(type == 'Publication Date')
          this.sort = 'publication_date';
       
        this.setFilter();
        this.$router.push({name: 'archive', query: this.query});
      },
      orderChange(type){
        this.order = type;
        this.setFilter();
        this.$router.push({name: 'archive', query: this.query});
      },
      updateCondition(q){
          let query = q || this.$route.query;
          for(let i in query){
              if(i == 'keyword'){
                  this.tagArray=[];
                  if(query[i]){
                      let keywordArray = query[i].split(',');
                      for(let i=0; i<keywordArray.length;i++){
                          this.tadAdd(keywordArray[i]);
                      }
                  }
              }
              else if(i == 'filter'){
                if(query[i]){
                    console.log(query[i])
                    let filterArray = query[i].split(',');
                    console.log('filterArray',filterArray);
                    this.filterCombination=[];
                      for(let i=0; i<filterArray.length;i++){
                          let facetsArray = filterArray[i].split('==')
                          let item={
                              condition:'And',
                              field: this.facetsConfigRes.body.archive[facetsArray[0]].name,     
                              contains:facetsArray[1]
                          };
                          console.log('test',item)
                          this.filterCombination.push(item);
                          //this.tadAdd(keywordArray[i]);
                      }
                }
              }
              else if(i =='page'){
                this.currentPage = parseInt(query[i])+1;
                //console.log(this.currentPage );
              }
              else if(i =='pageSize'){
                  let tempPageSize = parseInt(query[i]);
                  if(tempPageSize == 10 || tempPageSize == 20 || tempPageSize == 30 || tempPageSize == 40)
                    this.pageSize = parseInt(query[i]);
                  else 
                    this.pageSize = 20;
              }
          }
          //console.log();
        //this.normalQuery = {keyword:this.keyword, page:0, pageSize:20}
      },
      searchInputListener(){
          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keydown',(e)=>{
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  //this.searchInputChange(',');
              }
          });

          this.$refs.searchRef.$el.querySelector('.ivu-select-selection .ivu-select-input').addEventListener('keyup',(e)=>{
           // console.log('123');
           
              if(e.keyCode == 13 || e.keyCode == 188){
                  e.preventDefault();
                  e.stopPropagation();
                  if(e.target.value)
                    this.searchInputChange(e.target.value, true);
              }
          });
      },
      // queryFormatter(query){
      //     console.log('query',query);
      //     let queryTemp = '?';
      //     for(let i in query){
      //         if(query[i] && i == 'keyword'){
      //             queryTemp = queryTemp + i + '=='+query[i]
      //         }
      //         else if(query[i] && i == 'filter'){
      //           console.log('query[i]',query[i]);
      //         }
      //     }
      // },
      queryConfig(){
          this.$http
            .get(this.searchConfigURL)
            .then(function(facetsConfigRes){
                this.facetsConfigRes = facetsConfigRes;
                this.$http
                  .get(this.projectItemsConfigURL)
                  .then(function(projectItemsConfigRes){
                      this.projectItemsConfigRes = projectItemsConfigRes.body.projectItems;
                      console.log('this.projectItemsConfigRes',this.projectItemsConfigRes);
                      this.setFilter();
                      this.updateCondition();
                      this.queryArchiveProjectList();
                  },function(err){

                  });
            },function(err){

            });
      },
      searchByLabel(filter){

        this.tagArray =[];
        this.setKeywords();
        this.filter = filter
       
        this.$router.push({name: 'archive', query: this.query});
        console.log(this.query);
      },
      gotoPublish(){
        if(this.keyword.match(/PXD/))
          this.$router.push({name:'publish',params:{id:this.keyword}, query:{r:'other'}});
        else
          this.$Message.error({content:'Wrong Accession', duration:1});
      }
    },

    watch: {
      filterCombination: function (val) {
          //combine keyword (this.keyword) and filters together (val)
          //this.submitSearch();
      },

    },
    computed:{
      //this variable is not used anymore and only for updating this.normalQuery;
      query:function(){
          //let keyword= this.keyword? 'keyword='+this.keyword+'&' : '';
          //let filter = this.filter? 'filter='+this.filter+'&' : '';
          //let page='page='+this.page+'&';
          //let pageSize='pageSize='+this.pageSize;
          let normalQuery = {}
          for(let i=0; i<this.tagArray.length; i++){

          }
          if(this.keyword)
            normalQuery.keyword = this.keyword;

          if(this.filter)
            normalQuery.filter = this.filter;
          if(this.sort)
            normalQuery.sortFields = this.sort;
          if(this.order)
            normalQuery.sortDirection = this.order;
          normalQuery.page = this.page;
          normalQuery.pageSize = this.pageSize;
          console.log('this.normalQuery',this.normalQuery);
          //return '?'+keyword+filter+page+pageSize;
          return normalQuery;
          
      }
    },
    mounted: function(){
      this.queryConfig();
      //this.updateCondition();//move into queryConfig function
      //this.queryArchiveProjectList();//move into queryConfig function
      //this.setFilter();//move into queryConfig function
      this.searchInputListener();
    },
    created(){
      
    },
    beforeDestroy(){
          
    },
    beforeRouteEnter(to,from,next){
      //console.log('from',from);
      if(from.name == 'landingpage' && from.params.keyword)
        paramsFromLandingPage = from.params.keyword;
      
      next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  
  .archive-container{
    width: 100%;
   
  }
  .browse-data-container{
    width: 95%;
    margin:0 auto;
    padding: 90px 0;
  }
  .search-filter{
    display: flex;
    margin-bottom: 2rem;
    justify-content: space-between;
  }
  .search-row{
    margin-bottom: 20px;
  }
  .search-condition:not(.first){
    display: inline-block;
    padding-left: 8px;
    border-left: 1px solid #e9eaec;
  }
  .search-input{
    text-align: center;
    margin-bottom: 10px;
  }
  .search-input-wrapper{
    position: relative;
  }
  .search-input-wrapper .fake-input{
    padding-right: 32px;
    border-radius: 3px !important;
        font-size: 14px;
    padding: 6px 7px;
    height: 36px;
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 1.5;
        border: 1px solid #5bc0be;
            color: #495060;
                background-color: #fcfcfc;
    background-image: none;
    cursor: text;
    text-align:left;
  }
  .search-input-wrapper .tag-wrapper{
    display: inline-block;
    width: 100%
   /* position: absolute;*/
  }

  .search-input-wrapper .tag-wrapper .tag-in-search-input:hover{
      opacity: 1 !important;
  }
  .search-input-wrapper .tag-wrapper .tag-in-search-input{
      background: none !important;
  }
  .search-input-wrapper .tag-wrapper .ivu-select{
      width: auto
  }

  .refine-name{
    font-size: 12px;
  }
  .tag-container{
    display: inline-block;
  }
  .page-container{
    text-align: center;
  }
  .filter-condition{
    display: inline-block;
    margin-top: 5px; 
  }
  .search-condition-container{
    display: inline-block;
  }
  .search-condition-container .ivu-tag{
    overflow: visible !important;
    z-index: 2 !important;
    opacity: 1 !important;
    height: 30px;
    line-height: 30px;
  }
  .search-condition-container a{
    border:none;
  }
  .search-condition-container .ivu-select-dropdown .ivu-dropdown-menu{
    min-width: 50px;
  }
  .resource-list-title-container{
    display: flex;
    justify-content: space-between;
  }
  .sort-action{
    font-size: 12px;
    font-weight: normal;
    color: #495060;
    border:none;
  }
  .search-button a{
        padding: 8px 10px;
        font-size: 12px;
        width: 100%;
        margin-bottom: 0;
        margin-top: 5px;
        /*padding: 20px 85px;
        font-size: 24px;*/
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .resource-item{
      margin-bottom: 20px;
    }
    .resource-item .project-info{
      font-weight: 400;
    }
    .resource-id{
      font-size: 14px;
      margin-right: 2px;
      color:#444;
    }
    .resource-id:hover{
      color:#5bc0be;
    }
    .resource-title{
      font-weight: bold;
    }
    .detailed-resouce{
      margin-left: 5px;
    }
    .biological-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #5bc0be;
        border-radius: 3px;
    }
    .biomedical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #bd7edc;
        border-radius: 3px;
    }
    .highlighted-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #e2c94c;
        border-radius: 3px;
    }
    .technical-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #6acaef;
        border-radius: 3px;
    }
    .gray-dataset-button{
        padding: 2px 3px;
        font-size: 12px;
        margin-bottom: 0;
        /*padding: 20px 85px;
        font-size: 24px;*/
        background-color: #999c9c;
        border-radius: 3px;
    }
    .dataset-wrapper{
      margin-right: 5px;
    }
    .search-item-input-wrapper{
      position: absolute;
      top:5px;
      width: 100%;
      text-align: center;
      padding-bottom: 5px;
      border-bottom: 1px solid rgb(200,200,200,0.5);
    }
    /*
    .archive-search-input{
      margin-bottom: 10px;
    }*/
    .dropdown-action{
      width: 50px;
    }
    .separator{
      margin: 0 5px;
    }
    .sortOption{
      display: flex;
      margin-left: 5px;
    }
    .matched-items{
      color: #948d8d;
    }
    .readMore{
      display: inline;
    }
    .sort-wrapper{
      display:flex;
      align-items: center;
    }
    .sortOption .order-action{
      border-bottom:none;
      color:#444;
    }
    .sortOption .order-action:hover{
      color:#5bc0be;

    }
</style>

<style>
    .page .ivu-select-dropdown-list{
      margin-left: 0 !important;
    }
    /*
    .archive-search-input input{
      border-radius: 3px !important;
      margin-bottom: 0 !important;
    }
    .archive-search-input input:focus{
      border:none !important;
      box-shadow: none !important;
    }
    .archive-search-input .ivu-select-dropdown{
      text-align: left;
    }*/
    .search-item-input input{
      margin-bottom: 0 !important;
    }
    .filter-selector .ivu-select-item-selected{
      color: rgba(91, 192, 190, 0.9) !important;
      background: inherit !important;
    }
    .filter-selector .ivu-checkbox-wrapper{
      width: 100% !important;
      margin: 0 auto !important;
    }
    .filter-selector .ivu-select-input{
      margin-bottom: 0;
      box-shadow: none;
    }
    .filter-selector .ivu-select-input:focus{
          border: none;
          background:none !important;
    }
    .filter-selector .ivu-tag{
      background: none ;
    }
    .filter-selector .ivu-select-item-selected::after{
      line-height: 0.8 !important;
      font-size: 22px;
      margin-right: 5px;
      float:left;
      display: none !important; 
    }
    .tag-container .ivu-tag-border.ivu-tag-closable:after{
        /*display: none !important;*/
    }
    .filter-selector .ivu-select-input{
      height: 30px;
      line-height: 30px;
    }
    .filter-selector .ivu-tag{
      display: none;
      margin:2px 4px 2px 0;
    }
    .filter-selector .ivu-select-selection{
      border-radius: 3px;
    }
    .filter-selector.input-search-needed .ivu-select-dropdown{
      width: 200px !important;
      left:243px !important;
    }
    .filter-selector .ivu-icon-ios-close-empty{
      display: none;
    }
    .filter-selector .ivu-select-selection{
      height: 30px !important;
      line-height: 30px !important;
    }
    .sortOption .ivu-select-selection{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 17px !important;
      line-height: 17px !important;
    }
    .sortOption .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder{
      height: 18px !important;
      line-height: 18px !important;
    }
    .sortOption .ivu-select-selection .ivu-select-selected-value{
      font-weight: normal !important;

    }
    .sortOption .ivu-select-dropdown{
      width:140px!important;
    }
    .sortOption.page .ivu-select-dropdown{
      width:90px!important;
    }
    .sortOption .ivu-select-dropdown .ivu-select-item{
      font-weight: normal !important;

    }
    .resource-item .readMore p{
      display: inline !important;
    }
    .resource-item .readMore span{
      display: inline !important;
    }
    .resource-item .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
      padding-left: 0px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .resource-item .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header > i{
      margin-right: 0px !important;
    }
    .resource-item .ivu-collapse{
      border:none;
      background: none;
    }
    .resource-item .more-action{
      color: #444;
    }
    .resource-item .more-action:hover{
      color:#5bc0be;
    }
    .resource-item .ivu-collapse-content > .ivu-collapse-content-box{
      padding-top: 0;
      padding-bottom: 0;
    }
    .search-input .tag-input .ivu-input{
      width: 100%;
      height: 29px;
      line-height: 32px;
      padding: 0 0 0 4px;
      display: inline-block;
      font-size: 14px;
      outline: 0;
      border: none !important;
      box-sizing: border-box;
      color: #495060;
      background-color: transparent;
      position: relative;
      margin:0 !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection{
      border:none !important;
      box-shadow:none !important;
      background: none;
      padding:0;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input:focus{
      border:none !important;
      box-shadow:none !important;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-selection input{
      border:none !important;
      box-shadow:none !important;
      background: none;
    }
    .search-input-wrapper .tag-wrapper .ivu-select .ivu-select-dropdown{
      /*display: none;*//******this will be removed when autocomplete function needed********/
    }
    .sortOption.page .ivu-page-total{
      display: none;
    }
    .sortOption.page .ivu-page>li{
      display: none;
    }
    .sortOption.page .ivu-page{
      display: flex;
    }
    .sortOption.page .ivu-page-options-sizer{
      display: flex;
      align-items: center;
    }
    .sortOption.page .ivu-page-options{
      margin-left: 5px;
    }
    .archive-container .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      font-size: 12px;
    }
    .archive-container .ivu-select-single .ivu-select-selection .ivu-select-input{
      font-size: 12px;
      top: 0;
    }
</style>
