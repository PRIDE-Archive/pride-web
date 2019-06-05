<template>
    <div class="submit-data-container">
        <div class="panel nav"><NavBar page="landingpage"/></div>
        <div class="content-container">
            <Affix :offset-top="20">
                <div class="menu-wrapper">
                    <Menu mode="vertical" :active-name="activeName" @on-select="menuSlect">
                        <MenuItem v-for="item in tableList" :name="item.value" :key="item.value">
                            <Icon :type="item.icon"></Icon>{{item.label}}
                        </MenuItem>
                    </Menu>
                </div>
            </Affix>
            <div v-if="activeName == 'profile'" class="content-wrapper">
                <Card class="profile">
                    <div class="name">Yasset</div>
                    <div class="content">
                        <Row>
                            <Col span="12">
                                <Avatar class="avatar" icon="person" size="large" />
                            </Col>
                            <Col span="12">
                                <div class="info-wrapper">
                                    <div class="info-left">
                                        <div><span class="info-item">Email</span></div>
                                        <div><span class="info-item">Affiliation</span></div>
                                        <div><span class="info-item">OrcID</span></div>
                                        <div><span class="info-item">Public profile</span></div>
                                        <div><span class="info-item">Home page</span></div>
                                    </div>
                                    <div class="info-right">
                                        <div><a>XXXX</a></div>
                                        <div><span>XXXX</span></div>
                                        <div><a>XXXX</a></div>
                                        <div><a>XXXX</a></div>
                                        <div><a>XXXX</a></div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div class="description">123</div>
                </Card>
                <div class="profile-button">
                    <a @click="changePasswordModalBool = true">Change Password</a>
                </div>
            </div>
            <div v-if="activeName == 'public_data'" class="content-wrapper">
                <div class="name-wrapper">
                    <span>Public Data</span>
                    <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a>
                </div>
                <div class="demo-spin-container">
                    <Spin size="large" v-if="publicLoading"></Spin>
                </div>
                <Card v-for="item in publicDataList" class="resource-item" v-bind:key = "item.accession">
                <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight>
                </router-link>
                <!-- <span v-if="item.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight></p> 
                <p>
                    <span class="project-info">{{projectItemsSpecies}}: </span> 
                    <span v-for="item in item.species">
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight>
                    </span>
                </p> -->
                <p style="margin-top: 10px;">
                    <!-- <span class="project-info">{{projectItemsProjectDescription}}: </span> -->
                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.projectDescription}}</text-highlight>
                    <a @click="gotoDetails(item.accession)">(More)</a>
                  <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                </p>
                <p style="margin-top: 10px;">
                    <!-- <span class="project-info">{{projectItemsPublicationDate}}: </span>
                    <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.publicationDate}}</text-highlight>-->
                    <span class="project-info">{{item.publicationDate}}</span>
                    <span>|</span>
                    <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                        {{item.accession}}
                    </router-link>
                    <span>|</span>
                    <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                        Pride 
                    </router-link>
                </p>
                <div class="action-group">
                    <div class="left">
                        <a>Cite</a>
                        <a>Watch</a>
                        <a>Delete</a>
                    </div>
                    <div class="right">
                        <a class="cite"><Icon class="button-icon" type="social-twitch" size="12"></Icon>Cite</a>
                        <a class="watch"><Icon class="button-icon" type="eye" size="14"></Icon>Watch</a>
                        <a class="delete"><Icon class="button-icon" type="close-round" size="12"></Icon>Delete</a>
                    </div>
                </div>
               <!--  <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in item.projectTags" :key="index">
                    <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)">
                       <Icon type="ios-pricetag"></Icon>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset
                    </a>
                    <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)">
                       <Icon type="ios-pricetag"></Icon>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                    </a>
                    <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)">
                       <Icon type="ios-pricetag"></Icon>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                    </a>
                    <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)">
                       <Icon type="ios-pricetag"></Icon>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                    </a>
                    <a v-else class="button gray-dataset-button" href="javascript:void(0)">
                       <Icon type="ios-pricetag"></Icon>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>{{datesetItem}} Dataset</DropdownItem>
                    </DropdownMenu>
                </Dropdown> -->
                <Collapse v-if="hightlightMode">
                    <Panel>
                        <span>Matched Items</span>
                        <p class="matched-items" v-for="highlightItem in item.hightlightItemArray" slot="content">
                            <span class="project-info">{{highlightItem.name}}: </span>
                           <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                        </p>
                    </Panel>
                </Collapse>
                </Card>
                <div class="page-container">
                  <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </div>
            <div v-if="activeName == 'private_data'" class="content-wrapper">
                <div v-if="privateLoading" class="demo-spin-container">
                    <Spin size="large" fix></Spin>
                </div>
                <div v-else>
                    <div class="name-wrapper">
                        <span>Private Data</span>
                        <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a>
                    </div>
                    
                    <Card v-for="item in privateDataList" class="resource-item" v-bind:key = "item.accession">
                        <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight>
                        </router-link>
                        <!-- <span v-if="item.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                        <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight></p> 
                        <p>
                            <span class="project-info">{{projectItemsSpecies}}: </span> 
                            <span v-for="item in item.species">
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight>
                            </span>
                        </p> -->
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemsProjectDescription}}: </span> -->
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.projectDescription}}</text-highlight>
                            <a @click="gotoDetails(item.accession)">(More)</a>
                          <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                        </p>
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemsPublicationDate}}: </span>
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.publicationDate}}</text-highlight>-->
                            <span class="project-info">{{item.publicationDate}}</span>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                                {{item.accession}}
                            </router-link>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                                Pride 
                            </router-link>
                        </p>
                        <div class="action-group">
                            <div class="left">
                                <a>Cite</a>
                                <a>Watch</a>
                                <a>Delete</a>
                            </div>
                            <div class="right">
                                <a class="cite"><Icon class="button-icon" type="social-twitch" size="12"></Icon>Cite</a>
                                <a class="watch"><Icon class="button-icon" type="eye" size="14"></Icon>Watch</a>
                                <a class="delete"><Icon class="button-icon" type="close-round" size="12"></Icon>Delete</a>
                            </div>
                        </div>
                       <!--  <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in item.projectTags" :key="index">
                            <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else class="button gray-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>{{datesetItem}} Dataset</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> -->
                        <Collapse v-if="hightlightMode">
                            <Panel>
                                <span>Matched Items</span>
                                <p class="matched-items" v-for="highlightItem in item.hightlightItemArray" slot="content">
                                    <span class="project-info">{{highlightItem.name}}: </span>
                                   <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                                </p>
                            </Panel>
                        </Collapse>
                    </Card>
                    <div class="page-container">
                      <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </div>
                </div>
            </div>
            <div v-if="activeName == 'reviewer_submission'" class="content-wrapper">
                <div v-if="reviewLoading" class="demo-spin-container">
                    <Spin size="large" fix></Spin>
                </div>
                <div v-else>
                    <div class="name-wrapper">
                        <span>Review Submission</span>
                        <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a>
                    </div>
                    
                    <Card v-for="item in reviewDataList" class="resource-item" v-bind:key = "item.accession">
                        <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight>
                        </router-link>
                        <!-- <span v-if="item.submissionType == 'COMPLETE'"><Icon type="checkmark-round"></Icon></span> 
                        <p class="resource-title"><text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.title}}</text-highlight></p> 
                        <p>
                            <span class="project-info">{{projectItemsSpecies}}: </span> 
                            <span v-for="item in item.species">
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item}}</text-highlight>
                            </span>
                        </p> -->
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemsProjectDescription}}: </span> -->
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.projectDescription}}</text-highlight>
                            <a @click="gotoDetails(item.accession)">(More)</a>
                          <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                        </p>
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemsPublicationDate}}: </span>
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.publicationDate}}</text-highlight>-->
                            <span class="project-info">{{item.publicationDate}}</span>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                                {{item.accession}}
                            </router-link>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                                Pride 
                            </router-link>
                        </p>
                        <div class="action-group">
                            <div class="left">
                                <a>Cite</a>
                                <a>Watch</a>
                                <a>Delete</a>
                            </div>
                            <div class="right">
                                <a class="cite"><Icon class="button-icon" type="social-twitch" size="12"></Icon>Cite</a>
                                <a class="watch"><Icon class="button-icon" type="eye" size="14"></Icon>Watch</a>
                                <a class="delete"><Icon class="button-icon" type="close-round" size="12"></Icon>Delete</a>
                            </div>
                        </div>
                       <!--  <Dropdown class="dataset-wrapper" v-for="(datesetItem, index) in item.projectTags" :key="index">
                            <a v-if="datesetItem == 'Biological'" class="button biological-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Biomedical'" class="button biomedical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Highlighted'" class="button highlighted-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else-if="datesetItem == 'Technical'" class="button technical-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <a v-else class="button gray-dataset-button" href="javascript:void(0)">
                               <Icon type="ios-pricetag"></Icon>
                                <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{datesetItem}}</text-highlight> Dataset Dataset
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>{{datesetItem}} Dataset</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> -->
                        <Collapse v-if="hightlightMode">
                            <Panel>
                                <span>Matched Items</span>
                                <p class="matched-items" v-for="highlightItem in item.hightlightItemArray" slot="content">
                                    <span class="project-info">{{highlightItem.name}}: </span>
                                   <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{highlightItem.content}}</text-highlight>
                                </p>
                            </Panel>
                        </Collapse>
                    </Card>
                    <div class="page-container">
                      <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            v-model="changePasswordModalBool"
            title="Change Password"
            :mask-closable="true"
            :footer-hide="true"
            :closable="false"
            scrollable>
            <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
              <FormItem prop="user">
                <Input type="text" v-model="formInline.email" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="changePassword" long>Confirm</Button>
              </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import NavBar from '@/components/ebi/Nav'
    import store from "@/store/store.js"
    export default {
        data () {
            return {
                source: '',
                activeName:'profile',
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json',
                privateSubmissionURL: this.$store.state.baseApiURL + '/my-private-submissions',
                reviewSubmissionURL: this.$store.state.baseApiURL + '/reviewer-submissions',  
                tableList:[
                  {
                    label:'Edit Profile',
                    value:'profile',
                    icon:'ios-paper'
                  },
                  {
                    label:'Public Datasets',
                    value:'public_data',
                    icon:'stats-bars'
                  },
                  {
                    label:'Private Datasets',
                    value:'private_data',
                    icon:'ios-analytics'
                  },
                  {
                    label:'Review Submission',
                    value:'reviewer_submission',
                    icon:'eye'
                  },
                  // {
                  //   label:'Settings',
                  //   value:'settings',
                  //   icon:'gear-a'
                  // },
                ],
                changePasswordModalBool:false,
                privateLoading:false,
                publicLoading:false,
                reviewLoading:false,
                publicDataList:[],
                privateDataList:[],
                reviewDataList:[],
                projectItemsSpecies:'',
                projectItemsProjectDescription:'',
                projectItemsPublicationDate:'',
                hightlightMode:false,
                highlightKeyword:'',
                HighlightKeywordSensitive:false,
                publicaitionList:[{
                    accession: "PXD009959",
                    projectDescription: "To verify if CDKA;1 phosphorylates SWI1, recombinant proteins were prepared using E.coli system and in vitro kinase reactions we",
                    title:"SWI1 in vitro phosphorylation",
                    publicationDate:"2019-04-24",
                    projectTags:["Biological"],
                    species:["Arabidopsis thaliana (mouse-ear cress)","Escherichia coli"],
                    submissionType:'',
                }],
                formInline: {
                  user: '',
                  password: ''
                },
                ruleInline: {
                  user: [
                    { required: true, message: 'Please input username', trigger: 'blur' }
                  ],
                  password: [
                    { required: true, message: 'Please input password', trigger: 'blur' },
                    { type: 'string', min: 5, message: 'At least 5 words', trigger: 'blur' }
                  ]
                },
                page:0,
                pageSize:20,
                total:0,
                currentPage:1,
            }
        },
        components: {
            NavBar,
        },
        methods:{
            menuSlect(name){
                this.activeName = name;
                console.log(name)

            },
            pageChange(page){
              this.page = page-1;
              //this.setFilter();
              //this.$router.push({name: 'archive', query: this.query});
            },
            pageSizeChange(size){
              this.pageSize = size;
              //this.setFilter();
              //this.$router.push({name: 'archive', query: this.query});
            },
            getPrivateData(){
                 this.privateLoading = true;
                 this.$http
                      .get(this.privateSubmissionURL,{
                        headers: {
                          'Authorization':'Bearer '+ sessionStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        this.privateLoading = false;
                        let dataList = res.body;
                        for(let i=0; i<dataList.length; i++){
                            let item = {
                                accession: dataList[i].accession,
                                title: dataList[i].title,
                                projectDescription: dataList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                                publicationDate: dataList[i].publicationDate,
                            }
                            this.privateDataList.push(item);
                        }
                        
                        console.log(this.privateDataList);
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Annotation Error', duration:1});
                      });
            },
            getReviewerSubmission(){
                this.reviewLoading = true;
                this.$http
                      .get(this.reviewSubmissionURL,{
                        headers: {
                          'Authorization':'Bearer '+ sessionStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        this.reviewLoading = false;
                        let dataList = res.body;
                        console.log(res)
                        for(let i=0; i<dataList.length; i++){
                            let item = {
                                accession: dataList[i].accession,
                                title: dataList[i].title,
                                projectDescription: dataList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                                publicationDate: dataList[i].publicationDate,
                            }
                            this.reviewDataList.push(item);
                        }
                        console.log(this.reviewDataList);
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Annotation Error', duration:1});
                      });
            },
            logout(){
                //this.$store.commit('setUser',{username: '', token:''});  
                sessionStorage.setItem('username','');
                sessionStorage.setItem('token','');
                this.$router.push({name:'landingpage'})
            },
            gotoDetails(id){
                console.log("go to details")
                // this.$router.push({name:'dataset',params:{id:id}});
            },
            changePassword(){
                this.changePasswordModalBool = true;
            }
        },
        mounted:function(){
              this.getPrivateData();
              this.getReviewerSubmission();
        },
    }
</script>
<style>

</style>
<style scoped>
    .submit-data-container{
        width:100%;
        height: 100%;
        background: white;
    }
    .menu-wrapper .ivu-menu-vertical{
        min-width: 100px;
    }
    .markdown-wrapper{
        margin-left: 240px;
    }
    .content-container{
        display: flex;
        padding: 50px 0 200px 0px;
        /*padding: 0 0 200px 0px;*/
        margin: 0 auto;
        min-height: calc(100vh - 400px);
    }
    .markdown-body{
        display: inline-block;
    }
    .menu-wrapper .ivu-menu-vertical{
        min-width: 100px;
        width: 200px !important;
        height: 100%;
        /*background-color: */
    }
    .ivu-menu{
        z-index: 100;
    }
    .content-wrapper{
        min-height: calc(100vh - 50px);
        flex:1;
        padding: 0px 24px;
    }
    .content-wrapper .name-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding-left: 2px;
    }
    .content-wrapper .name-wrapper span{
        font-size: 20px;
    }
    .content-wrapper .name-wrapper a{
        color: #f8f8f8;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 700;
        background-color: #ed3f14;
        border-radius: 3px;
        text-decoration:none;
        border-bottom: none;
        text-align: center;
    }
    .content-wrapper .name-wrapper a:hover{
        opacity:0.8;
    }
    .action-group{
        display: flex;
        justify-content: space-between;
        margin-top:10px;
    }
    .action-group div{
        display: flex;
    }
    .action-group .left a{
        margin-right: 5px;
    }
    .action-group .right a:nth-child(1){
        background-color: #5bc0be !important; 
        border-radius: 3px 0 0 3px !important;
    }
    .action-group .right a:nth-child(2){
        border-radius: 0 !important;
        background-color: #ef7731 !important;  
    }
    .action-group .right a:nth-child(3){
        border-radius: 0 3px 3px 0 !important;
        background-color: #ed3f14 !important;
    }
    .action-group a{
        color: #f8f8f8;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        text-decoration:none;
        border-bottom: none;
        width: 80px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .profile-button{
        margin-top: 20px;
    }
    .profile-button a{
        color: #f8f8f8;
        padding: 4px 10px;
        font-size: 12px;
        font-weight: 700;
        background-color: #5bc0be;
        border-radius: 3px;
        text-decoration:none;
        border-bottom: none;
        width: 140px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .button-icon{
        margin-right: 5px;
    }
    .avatar-wrapper{
        padding: 0 0 10px 20px;
    }
    .avatar-wrapper .name{
        margin-left: 10px;
    }
    .profile{
        padding: 20px;
    }
    .profile .name{
        font-size: 20px;
    }
    .profile .description{
        padding-top:20px;
        border-top: 1px solid #eaecef;
    }
    .profile .content{
        padding: 10px 0;
        margin: 20px 0;
    }
    .profile .content .info-wrapper{
        display: flex;
        text-align: left;
    }
    .profile .content .info-wrapper .info-left{
        font-weight: bold;
    }
    .profile .content .info-wrapper .info-right{
        margin-left: 20px;
    }
    .profile .content .info .info-item{
        font-weight: bold;
        margin-right: 20px;
    }
    .profile .content .avatar{
        width: 120px;
        height: 120px;
        line-height: 120px;
        border-radius: 120px;
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
    }
    .resource-title{
      font-weight: bold;
    }
    .page-container{
        text-align: center;
    }
    .demo-spin-container{
        display: inline-block;
        width: 100%;
        height: 100px;
        position: relative;
    }
    @media (min-width: 768px) {
        .content-container{
            width: 750px;
        }
    }
    @media (min-width: 992px) {
        .content-container{
            width: 970px;
        }
    }
    @media (min-width: 1200px) {
        .content-container{
            width: 1170px;
        }
    }
    @media (min-width: 1600px) {
        .content-container{
            width: 1552px;
        }
    }
</style>
