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
                    <div class="name">{{profileData.firstName}} {{profileData.lastName}}</div>
                    <div class="content">
                        <Row>
                            <!-- <Col span="12">
                                <Avatar class="avatar" icon="person" size="large" />
                            </Col> -->
                            <Col span="24">
                                <div class="info-wrapper">
                                    <div class="info-item">
                                        <span class="info-name">Title</span><span>{{profileData.title}}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-name">Email</span><span>{{profileData.email}}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-name">Affiliation</span><span>{{profileData.affiliation}}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-name">Country</span><span>{{profileData.country}}</span>
                                    </div>
                                    <div class="info-item">
                                        <span class="info-name">ORCID</span><span>{{profileData.orcid}}</span>
                                    </div>
                                   
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <!-- <div class="description">123</div> -->
                </Card>
                <div class="profile-button">
                    <a @click="gotoEditProfile">Edit</a>
                    <a @click="showPasswordModal">Change Password</a> 
                </div>
            </div>
            <div v-if="activeName == 'public_data'" class="content-wrapper">
                <div class="name-wrapper">
                    <span v-if="publicDataList.length>0">Public Data</span>
                    <span v-else>No Public Data</span>
                    <!-- <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a> -->
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
                        <router-link :to="{name:'privatedataset',  params: { id: item.accession}}">(More)</router-link>
                        <!-- <a @click="gotoDetails(item.accession)">(More)</a> -->
                      <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                    </p>
                    <p style="margin-top: 10px;">
                        <!-- <span class="project-info">{{projectItemsSubmissionDate}}: </span>
                        <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.submissionDate}}</text-highlight>-->
                        <span class="project-info">{{item.submissionDate}}</span>
                        <span>|</span>
                        <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                            {{item.accession}}
                        </router-link>
                        <span>|</span>
                        <router-link class="resource-id" :to="{name:'dataset',  params: { id: item.accession}}">
                            Pride 
                        </router-link>
                    </p>
                   <!--  <div class="action-group">
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
                    </div> -->
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
                <!-- <div class="page-container">
                  <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div> -->
            </div>
            <div v-if="activeName == 'private_data' && profileData.userAuthorities =='SUBMITTER'" class="content-wrapper">
                <div v-if="privateLoading" class="demo-spin-container">
                    <Spin size="large" fix></Spin>
                </div>
                <div v-else>
                    <div class="name-wrapper">
                        <span v-if="privateDataList.length>0">Private Data</span>
                        <span v-else>No Private Data</span>
                        <!-- <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a> -->
                    </div>
                    
                    <Card v-for="item in privateDataList" class="resource-item" v-bind:key = "item.accession">
                        <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
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
                            <router-link :to="{name:'privatedataset',  params: { id: item.accession}}">(More)</router-link>
                            <!-- <a @click="gotoDetails(item.accession)">(More)</a> -->
                          <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                        </p>
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemsSubmissionDate}}: </span>
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.submissionDate}}</text-highlight>-->
                            <span class="project-info">{{item.submissionDate}}</span>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
                                {{item.accession}}
                            </router-link>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
                                Pride 
                            </router-link>
                        </p>
                        <!--  <div class="action-group">
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
                        </div> -->
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
                    <!-- <div class="page-container">
                      <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </div> -->
                </div>
            </div>
            <div v-if="activeName == 'reviewer_submission' && profileData.userAuthorities =='REVIEWER' " class="content-wrapper">
                <div v-if="reviewLoading" class="demo-spin-container">
                    <Spin size="large" fix></Spin>
                </div>
                <div v-else>
                    <div class="name-wrapper">
                        <span v-if="reviewDataList.length>0">Review Submission</span>
                        <span v-else>No Review Data</span>
                        <!-- <a><Icon class="button-icon" type="close-round" size="12"></Icon>Delete All</a> -->
                    </div>
                    
                    <Card v-for="item in reviewDataList" class="resource-item" v-bind:key = "item.accession">
                        <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
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
                            <router-link :to="{name:'privatedataset',  params: { id: item.accession}}">(More)</router-link>
                            <!-- <a @click="gotoDetails(item.accession)">(More)</a> -->
                          <!--<read-more class="readMore" more-str="(More)" :text="item.projectDescription" link="#" less-str="Less" :max-chars="200"></read-more>-->
                        </p>
                        <p style="margin-top: 10px;">
                            <!-- <span class="project-info">{{projectItemssubmissionDate}}: </span>
                            <text-highlight :queries="highlightKeyword" :caseSensitive="HighlightKeywordSensitive">{{item.submissionDate}}</text-highlight>-->
                            <span class="project-info">{{item.submissionDate}}</span>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
                                {{item.accession}}
                            </router-link>
                            <span>|</span>
                            <router-link class="resource-id" :to="{name:'privatedataset',  params: { id: item.accession}}">
                                Pride 
                            </router-link>
                        </p>
                        <!--  <div class="action-group">
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
                        </div> -->
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
                    <!-- <div class="page-container">
                      <Page :total="total" :page-size="pageSize" :current="currentPage" size="small" show-sizer show-total class-name="page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </div> -->
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
              <FormItem prop="email">
                <Input type="text" v-model="formInline.email" placeholder="Email" disabled>
                <Icon type="ios-person-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="oldPassword">
                <Input type="password" v-model="formInline.oldPassword" placeholder="Old Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="newPassword">
                <Input type="password" v-model="formInline.newPassword" placeholder="New Password">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem prop="confirmedNewPassword">
                <Input type="password" v-model="formInline.confirmedNewPassword" placeholder="Confirmed New Password" @on-enter="changePassword('formInline')">
                <Icon type="ios-locked-outline" slot="prepend" size="14"></Icon>
                </Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="changePassword('formInline')" long>Confirm</Button>
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
            const errorInfo = {
                email:{
                    noneEmail:'Can not be empty',
                    unRegEmail:'Wrong Email Format',
                },
                password:{
                    nonePassword: 'Can not be empty',
                    invalidConfirmPassword:'Different Password Error'
                }
            };
            const emailCheck = (rule, value, callback) => {
                var pattern = /^.{1,}$/;
                console.log('emailCheck')
                if(!pattern.test(this.formInline.email)){
                    this.emailState = false;
                    return callback(new Error(errorInfo.email.noneEmail));
                }
                
                var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if(!pattern.test(this.formInline.email)){
                    this.emailState = false;
                    return callback(new Error(errorInfo.email.unRegEmail));
                }
                this.emailState = true;
                callback();
            };
            const passwordCheck = (rule, value, callback) => {
                var pattern = /^.{1,}$/;
                //var pattern = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
                //var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                if(!pattern.test(this.formInline.oldPassword)){
                    this.passwordState = false;
                    return callback(new Error(errorInfo.password.nonePassword));
                }

                this.passwordState=true;
                callback();
            };
            const newPasswordCheck = (rule, value, callback) => {
                var pattern = /^.{1,}$/;
                //var pattern = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$/;
                //var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                if(!pattern.test(this.formInline.newPassword)){
                    this.newPasswordState = false;
                    return callback(new Error(errorInfo.password.nonePassword));
                }

                else{
                    if(this.formInline.confirmedNewPassword!=''){
                        console.log(22222);
                        this.$refs['formInline'].validateField('confirmedNewPassword');
                    }
                
                    this.newPasswordState=true;
                    callback();
                }
            };
            const newPasswordRecheck = (rule, value, callback) => {
                var pattern = /^.{1,}$/;
                console.log('newPasswordRecheck')
                if(!pattern.test(this.formInline.confirmedNewPassword)){
                    this.confirmedNewPasswordState = false;
                    return callback(new Error(errorInfo.password.nonePassword));
                }
                else if(this.formInline.confirmedNewPassword != this.formInline.newPassword){
                    this.confirmedNewPasswordState = false;
                    return callback(new Error(errorInfo.password.invalidConfirmPassword));
                }
                this.confirmedNewPasswordState = true;
                callback(); 
            };
            return {
                source: '',
                activeName:'profile',
                landingPageJsonURL: this.$store.state.baseURL + '/static/landingPage/landing_page.json',
                privateSubmissionURL: this.$store.state.basePrivateURL + '/projects/private-submissions',
                publicSubmissionURL: this.$store.state.baseApiURL + '/projects/private', //use query to differ with private
                reviewSubmissionURL: this.$store.state.basePrivateURL + '/projects/reviewer-submissions',  
                changePasswordURL: this.$store.state.basePrivateURL + '/user/change-password',  
                viewProfileURL: this.$store.state.basePrivateURL + '/user/view-profile',
                tableList:[
                  {
                    label:'Profile',
                    value:'profile',
                    icon:'ios-paper'
                  },
                  // {
                  //   label:'Public Data',
                  //   value:'public_data',
                  //   icon:'stats-bars'
                  // },
                  {
                    label:'Private Data',
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
                profileLoading:false,
                publicDataList:[],
                privateDataList:[],
                reviewDataList:[],
                projectItemsSpecies:'',
                projectItemsProjectDescription:'',
                projectItemsSubmissionDate:'',
                hightlightMode:false,
                highlightKeyword:'',
                HighlightKeywordSensitive:false,
                publicaitionList:[{
                    accession: "PXD009959",
                    projectDescription: "To verify if CDKA;1 phosphorylates SWI1, recombinant proteins were prepared using E.coli system and in vitro kinase reactions we",
                    title:"SWI1 in vitro phosphorylation",
                    submissionDate:"2019-04-24",
                    projectTags:["Biological"],
                    species:["Arabidopsis thaliana (mouse-ear cress)","Escherichia coli"],
                    submissionType:'',
                }],
                formInline: {
                  email: '',
                  oldPassword: '',
                  newPassword:'',
                  confirmedNewPassword:''
                },
                ruleInline: {
                  // email: [
                  //   { required: true, validator: emailCheck, trigger: 'on-change' }
                  // ],
                  oldPassword: [
                    { required: true, validator: passwordCheck, trigger: 'on-change' }
                  ],
                  newPassword: [
                    { required: true, validator: newPasswordCheck, trigger: 'on-change' }
                  ],
                  confirmedNewPassword: [
                    { required: true, validator: newPasswordRecheck, trigger: 'on-change' }
                  ],
                },
                profileData:{ 
                    userAuthorities:'',
                    email:'',
                    title:'',
                    firstName:'',
                    lastName:'',
                    affiliation:'',
                    country:'',
                    orcid:'',
                    acceptedTermsOfUse:null,

                },
                newPasswordState:false,
                confirmedNewPasswordState:false,
                emailState:true,//we have the default email
                passwordState:false,
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
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        this.privateLoading = false;
                        if(res.body._embedded && res.body._embedded.projects){
                            let dataList = res.body._embedded.projects;
                            for(let i=0; i<dataList.length; i++){
                                let item = {
                                    accession: dataList[i].accession,
                                    title: dataList[i].title,
                                    projectDescription: dataList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                                    submissionDate: dataList[i].submissionDate,
                                }
                                this.privateDataList.push(item);
                            }
                            
                            //console.log('privateDataList',this.privateDataList);
                        }
                        else{
                            //this.$Message.error({content:'No Private Data', duration:1});
                        }
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Annotation Error', duration:1});
                      });
            },
            getPublicData(){
                 this.publicLoading = true;
                 this.$http
                      .get(this.publicSubmissionURL,{
                        headers: {
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        },
                        params:{
                            isPublic:true,
                        }
                      })
                      .then(function(res){
                        this.publicLoading = false;
                        let dataList = res.body;
                        for(let i=0; i<dataList.length; i++){
                            let item = {
                                accession: dataList[i].accession,
                                title: dataList[i].title,
                                projectDescription: dataList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                                submissionDate: dataList[i].submissionDate,
                            }
                            this.publicDataList.push(item);
                        }
                        
                        //console.log(this.publicDataList);
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
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        this.reviewLoading = false;
                        if(res.body._embedded && res.body._embedded.projects){
                            let dataList = res.body._embedded.projects;
                            for(let i=0; i<dataList.length; i++){
                                let item = {
                                    accession: dataList[i].accession,
                                    title: dataList[i].title,
                                    projectDescription: dataList[i].projectDescription.replace(/\s*$/g,"").slice(0,200) + '...',
                                    submissionDate: dataList[i].submissionDate,
                                }
                                this.reviewDataList.push(item);  
                            }
                        }
                        else{
                            //this.$Message.error({content:'No Review Data', duration:1});
                        }
                        
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                        }
                        this.$Message.error({content:'Review Data Error', duration:1});
                      });
            },
            getProfile(){
                this.profileLoading = true;
                this.$http
                      .get(this.viewProfileURL,{
                        headers: {
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                      })
                      .then(function(res){
                        console.log('res.body',res.body)
                        this.profileLoading = false;
                        this.profileData.userAuthorities = res.body.userAuthorities[0];
                        this.profileData.email = res.body.email;
                        this.profileData.title = res.body.title;
                        this.profileData.firstName = res.body.firstName;
                        this.profileData.lastName = res.body.lastName;
                        this.profileData.affiliation = res.body.affiliation;
                        this.profileData.country = res.body.country;
                        this.profileData.orcid = res.body.orcid;
                        this.profileData.acceptedTermsOfUse = res.body.acceptedTermsOfUse;

                        if(this.profileData.userAuthorities == 'SUBMITTER'){
                            this.getPrivateData();
                            for(let i=0; i<this.tableList.length; i++){
                                if(this.tableList[i].value == 'reviewer_submission'){
                                    this.tableList.splice(i,1)
                                    break;
                                }
                            }
                        }
                        else if(this.profileData.userAuthorities == 'REVIEWER'){
                            this.getReviewerSubmission();
                            for(let i=0; i<this.tableList.length; i++){
                                if(this.tableList[i].value == 'private_data'){
                                    this.tableList.splice(i,1)
                                    i--;
                                }
                                else if(this.tableList[i].value == 'public_data'){
                                    this.tableList.splice(i,1)
                                    i--;
                                }
                            }
                        }
                        console.log('this.profileData',this.profileData)
                      },function(err){
                        if(err.body.error == 'TOKEN_EXPIRED'){
                            this.logout();
                            this.$router.push({name:'login'});
                            this.$Message.error({content:'Expired, Please Login Again', duration:3});
                        }
                        else
                            this.$Message.error({content:'Get Profile Error', duration:3});
                      });
            },
            logout(){
                this.$store.commit('setUser',{username: '', token:''});  
                localStorage.setItem('username','');
                localStorage.setItem('token','');
                this.$router.push({name:'landingpage'})
            },
            gotoDetails(id){
                console.log("go to details")
                // this.$router.push({name:'dataset',params:{id:id}});
            },
            changePassword(name){
                if(this.confirmedNewPasswordState && this.newPasswordState && this.emailState && this.passwordState)  
                    this.submitChangePassword();
                else{
                    this.$refs[name].validate((valid) => {
                          if (valid) {
                                this.$Spin.show({
                                    render: (h) => {
                                      return h('div', [
                                        h('Icon', {
                                          'class': 'demo-spin-icon-load',
                                          props: {
                                            type: 'ios-loading',
                                            size: 18
                                          }
                                        }),
                                        h('div', 'Loading')
                                      ])
                                    }
                                });
                                this.submitChangePassword();
                          }
                          else{
                            console.log('valid error')
                          }
                    })
                }
            },
            submitChangePassword(){
                let query = {};
                query.ChangePassword = this.formInline
                this.$http
                    .post(this.changePasswordURL,query,{
                        headers: {
                          'Authorization':'Bearer '+ localStorage.getItem('token')
                        }
                    })
                    .then(function(res){
                          this.changePasswordModalBool=false;
                          this.$Message.success({ content: 'Password Change Success, Please Login again!' })
                          this.$Spin.hide()
                          this.$refs['formInline'].resetFields();
                          this.resetState();
                          this.logout();
                    },function(err){
                      this.$Spin.hide()
                      this.$Message.error({ content: 'Invalid Username or Password'});
                    });
            },
            showPasswordModal(){
                this.$refs['formInline'].resetFields();
                this.formInline.email = localStorage.getItem('username') || '';
                this.resetState();
                this.changePasswordModalBool=true;
            },
            resetState(){
                this.newPasswordState = false;
                this.confirmedNewPasswordState = false;
                this.emailState = true;
                this.passwordState = false;
            },
            gotoEditProfile(){
                this.$router.push({name:'editprofile'});
            }
        },
        mounted:function(){
              //this.getPrivateData();
              //this.getPublicData();
              //this.getReviewerSubmission();
              this.getProfile();
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
              let username = localStorage.getItem('username') || '';
              if(!username){
                vm.$Message.error({content:'Please Login', duration:2})
                vm.$router.push({name:'login'})
              }
            });
        }
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
        display: flex;
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
        margin-right: 5px;
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
        margin-top: 20px;
    }
    .profile .content .info-wrapper{
        display: flex;
        text-align: left;
        flex-direction: column;
    }
    .profile .content .info-wrapper .info-item{
        display: flex;
        font-size: 14px;
        align-items: center;
    }
    .profile .content .info-wrapper .info-item .info-name{
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 5px;
        width: 80px;
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
