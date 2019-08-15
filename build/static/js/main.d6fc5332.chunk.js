(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{181:function(e,t,n){e.exports=n(360)},360:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(8),s=n.n(o),i=n(17),u=n(18),l=n(20),c=n(19),p=n(21),m=n(31),d=n(24),h=n(50),f=function(e){return e.children},g=n(10),E=n(168),S=n(365),y=n(367),T=n(103),v=n(29),A=n.n(v),b=function(e){return{type:"AUTH_SUCCESS",user:e}},_=function(e){return{type:"AUTH_FAIL",error:e}},k=function(){return localStorage.removeItem("user"),{type:"AUTH_LOGOUT"}},I=function(e){return function(t){setTimeout(function(){t(k())},1e3*e)}},O=a.a.createElement(g.a,{type:"loading",style:{fontSize:24},spin:!0}),N=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){e||n.props.onAuth(t.username,t.password)}),n.props.history.push("/")},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=null;this.props.error&&(e=a.a.createElement("p",null,this.props.error.message));var t=this.props.form.getFieldDecorator;return a.a.createElement("div",null,e,this.props.loading?a.a.createElement(E.a,{indicator:O}):a.a.createElement(S.a,{onSubmit:this.handleSubmit,className:"login-form"},a.a.createElement(S.a.Item,null,t("username",{rules:[{required:!0,message:"Please input your username!"}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Username"}))),a.a.createElement(S.a.Item,null,t("password",{rules:[{required:!0,message:"Please input your Password!"}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"Password"}))),a.a.createElement(S.a.Item,null,a.a.createElement(T.a,{type:"primary",htmlType:"submit",style:{marginRight:"10px"}},"Login"),"Or",a.a.createElement(m.c,{style:{marginRight:"10px"},to:"/signup/"}," signup"))))}}]),t}(a.a.Component),j=S.a.create()(N),w=Object(d.b)(function(e){return{loading:e.loading,error:e.error,user_username:e.username}},function(e){return{onAuth:function(t,n){return e(function(e,t){return function(n){n({type:"AUTH_START"}),A.a.post("http://0.0.0.0:8000/rest-auth/login/",{username:e,password:t}).then(function(t){var r={token:t.data.key,username:e,userId:t.data.user,is_student:t.data.user_type.is_student,is_teacher:t.data.user_type.is_teacher,expirationDate:new Date((new Date).getTime()+36e5)};localStorage.setItem("user",JSON.stringify(r)),n(b(r)),n(I(3600))}).catch(function(e){n(_(e))})}}(t,n))}}})(j),C=n(79),G=n(175),D=n.n(G),L=C.a.Option,x=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).state={confirmDirty:!1},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFieldsAndScroll(function(e,t){if(!e){var r=!1;console.log(t.userType),"student"===t.userType&&(r=!0),n.props.onAuth(t.username,t.email,t.password,t.confirm,r),console.log(t.username,t.email,t.password,t.confirm,r)}})},n.handleConfirmBlur=function(e){var t=e.target.value;n.setState({confirmDirty:n.state.confirmDirty||!!t})},n.compareToFirstPassword=function(e,t,r){var a=n.props.form;t&&t!==a.getFieldValue("password")?r("Two passwords that you enter is inconsistent!"):r()},n.validateToNextPassword=function(e,t,r){var a=n.props.form;t&&n.state.confirmDirty&&a.validateFields(["confirm"],{force:!0}),r()},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props.form.getFieldDecorator;return a.a.createElement(S.a,{onSubmit:this.handleSubmit},a.a.createElement(S.a.Item,null,e("username",{rules:[{required:!0,message:"Please input your username!"}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Username"}))),a.a.createElement(S.a.Item,{label:"E-mail"},e("email",{rules:[{type:"email",message:"The input is not valid E-mail!"},{required:!0,message:"Please input your E-mail!"}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"mail",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"Email"}))),a.a.createElement(S.a.Item,{label:"Password",hasFeedback:!0},e("password",{rules:[{required:!0,message:"Please input your password!"},{validator:this.validateToNextPassword}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"Password"}))),a.a.createElement(S.a.Item,{label:"Confirm Password",hasFeedback:!0},e("confirm",{rules:[{required:!0,message:"Please confirm your password!"},{validator:this.compareToFirstPassword}]})(a.a.createElement(y.a,{prefix:a.a.createElement(g.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"Password",onBlur:this.handleConfirmBlur}))),a.a.createElement(S.a.Item,{label:"Select a user type",hasFeedback:!0},e("userType",{rules:[{required:!0,message:"Please select a user!"}]})(a.a.createElement(C.a,{placeholder:"Select a user type"},a.a.createElement(L,{value:"student"},"Student"),a.a.createElement(L,{value:"teacher"},"Teacher")))),a.a.createElement(D.a,null),a.a.createElement(S.a.Item,null,a.a.createElement(T.a,{type:"primary",htmlType:"submit",style:{marginRight:"10px"}},"Signup"),"Or",a.a.createElement(m.c,{style:{marginRight:"10px"},to:"/login/"}," login")))}}]),t}(a.a.Component),F=S.a.create()(x),R=Object(d.b)(function(e){return{loading:e.loading,error:e.error}},function(e){return{onAuth:function(t,n,r,a,o){return e(function(e,t,n,r,a){return function(o){o({type:"AUTH_START"});var s={username:e,email:t,password1:n,password2:r,is_student:a,is_teacher:!a};A.a.post("http://0.0.0.0:8000/rest-auth/registration/",s).then(function(t){var n={token:t.data.key,username:e,userId:t.data.user,is_student:a,is_teacher:!a,expirationDate:new Date((new Date).getTime()+36e5)};localStorage.setItem("user",JSON.stringify(n)),o(b(n)),o(I(3600))}).catch(function(e){o(_(e))})}}(t,n,r,a,o))}}})(F),M=n(371),P=n(364),q=n(366),U=function(e){return a.a.createElement(q.a,{type:"circle",percent:e.grade,width:80})},H=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){void 0!==this.props.token&&null!==this.props.token&&this.props.getGradedASNTS(this.props.username,this.props.token)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.token!==this.props.token&&void 0!==e.token&&null!==e.token&&this.props.getGradedASNTS(e.username,e.token)}},{key:"render",value:function(){return a.a.createElement(f,null,this.props.loading?a.a.createElement(M.a,{active:!0}):a.a.createElement(f,null,a.a.createElement("h1",null,"Hi ",this.props.username),a.a.createElement(P.a,{size:"large",dataSource:this.props.gradedAssignments,renderItem:function(e){return a.a.createElement(U,{key:e.id,grade:e.grade})}})))}}]),t}(a.a.PureComponent),B=Object(d.b)(function(e){return{token:e.auth.token,username:e.auth.username,gradedAssignments:e.gradedAssignments.assignments,loading:e.gradedAssignments.loading}},function(e){return{getGradedASNTS:function(t,n){return e(function(e,t){return function(n){n({type:"GET_GRADED_ASSIGNMENT_LIST_START"}),A.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(t)},A.a.get("http://0.0.0.0:8000/graded-assignments/?username=".concat(e)).then(function(e){var t=e.data;n(function(e){return{type:"GET_GRADED_ASSIGNMENTS_LIST_SUCCESS",assignments:e}}(t))}).catch(function(e){n({type:"GET_GRADED_ASSIGNMENTS_LIST_FAIL",error:e})})}}(t,n))}}})(H),z=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){void 0!==this.props.token&&null!==this.props.token&&this.props.getASNTS(this.props.token)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.token!==this.props.token&&void 0!==e.token&&null!==e.token&&this.props.getASNTS(e.token)}},{key:"renderItem",value:function(e){return a.a.createElement(m.b,{to:"/assignments/".concat(e.id)},a.a.createElement(P.a.Item,null,e.title))}},{key:"render",value:function(){var e=this;return a.a.createElement(f,null,this.props.loading?a.a.createElement(M.a,{active:!0}):a.a.createElement("div",null,a.a.createElement("h3",{style:{margin:"16px 0"}},"Assignment List"),a.a.createElement(P.a,{size:"large",bordered:!0,dataSource:this.props.assignments,renderItem:function(t){return e.renderItem(t)}})))}}]),t}(a.a.PureComponent),V=Object(d.b)(function(e){return{token:e.auth.token,assignments:e.assignments.assignments,loading:e.assignments.loading}},function(e){return{getASNTS:function(t){return e(function(e){return function(t){t({type:"GET_ASSIGNMENT_LIST_START"}),A.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(e)},A.a.get("http://0.0.0.0:8000/assignments/").then(function(e){var n=e.data;t(function(e){return{type:"GET_ASSIGNMENTS_LIST_SUCCESS",assignments:e}}(n))}).catch(function(e){var n;t({type:"GET_ASSIGNMENTS_LIST_FAIL",error:n})})}}(t))}}})(z),W=n(372),J=n(363),X=n(370),K=X.a.Step,Q=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).state={current:0},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"next",value:function(){var e=this.state.current+1;this.setState({current:e})}},{key:"prev",value:function(){var e=this.state.current-1;this.setState({current:e})}},{key:"render",value:function(){var e=this,t=this.state.current,n=this.props.questions;return a.a.createElement("div",null,a.a.createElement(X.a,{progressDot:!0,current:t},n.map(function(e,t){return a.a.createElement(K,{key:t})})),a.a.createElement("div",null,n[t]),a.a.createElement("div",null,t<n.length-1&&a.a.createElement(T.a,{type:"primary",onClick:function(){return e.next()}},"Next"),t===n.length-1&&a.a.createElement(T.a,{type:"primary",onClick:function(){return e.props.submit()}},"Submit"),t>0&&a.a.createElement(T.a,{style:{marginLeft:8},onClick:function(){return e.prev()}},"Previous")))}}]),t}(a.a.Component),$=n(369),Y=$.a.Group,Z={display:"block",height:"30px",lineHeight:"30px"},ee=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.questionId,n=this.props.usersAnswers;return a.a.createElement(Y,{onChange:function(n,r){return e.props.change(n,t)},value:void 0!==n[t]&&null!==n[t]?n[t]:null},this.props.choices.map(function(e,t){return a.a.createElement($.a,{style:Z,value:e,key:t},e)}))}}]),t}(a.a.Component),te={marginTop:"20px",marginBottom:"20px"},ne=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).state={usersAnswers:{}},n.onChange=function(e,t){var r=n.state.usersAnswers;r[t]=e.target.value,n.setState({usersAnswers:r})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){void 0!==this.props.token&&null!==this.props.token&&this.props.getASNTSDetail(this.props.token,this.props.match.params.id)}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){e.token!==this.props.token&&void 0!==e.token&&null!==e.token&&this.props.getASNTSDetail(e.token,this.props.match.params.id)}},{key:"handleSubmit",value:function(){W.a.success("Submitting your assignment!");var e=this.state.usersAnswers,t={username:this.props.username,asntId:this.props.currentAssignment.id,answers:e};this.props.createGradedASNT(this.props.token,t)}},{key:"render",value:function(){var e=this,t=this.props.currentAssignment,n=t.title,r=this.state.usersAnswers;return a.a.createElement(f,null,Object.keys(t).length>0?a.a.createElement(f,null,this.props.loading?a.a.createElement(M.a,{active:!0}):a.a.createElement(J.a,{title:n},a.a.createElement(Q,{submit:function(){return e.handleSubmit()},questions:t.questions.map(function(t){return a.a.createElement(J.a,{style:te,type:"inner",key:t.id,title:"".concat(t.order,". ").concat(t.question)},a.a.createElement(ee,{questionId:t.order,choices:t.choices,change:e.onChange,usersAnswers:r}))})}))):null)}}]),t}(a.a.Component),re=Object(d.b)(function(e){return{token:e.auth.token,currentAssignment:e.assignments.currentAssignment,loading:e.assignments.loading,username:e.auth.username}},function(e){return{getASNTSDetail:function(t,n){return e(function(e,t){return function(n){n({type:"GET_ASSIGNMENT_DETAIL_START"}),A.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(e)},A.a.get("http://0.0.0.0:8000/assignments/".concat(t,"/")).then(function(e){var t=e.data;n(function(e){return{type:"GET_ASSIGNMENT_DETAIL_SUCCESS",assignment:e}}(t))}).catch(function(e){var t;n({type:"GET_ASSIGNMENT_DETAIL_FAIL",error:t})})}}(t,n))},createGradedASNT:function(t,n){return e(function(e,t){return function(n){A.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(e)},A.a.post("http://0.0.0.0:8000/graded-assignments/create/",t).then(function(e){console.log("success")}).catch(function(e){})}}(t,n))}}})(ne),ae=n(361),oe=S.a.Item,se=0,ie=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).remove=function(e){var t=n.props.form,r=t.getFieldValue("keys");1!==r.length&&t.setFieldsValue({keys:r.filter(function(t){return t!==e})})},n.add=function(){var e=n.props.form,t=e.getFieldValue("keys").concat(++se);e.setFieldsValue({keys:t})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.form,n=t.getFieldDecorator,r=t.getFieldValue;n("keys",{initialValue:[]});var o=r("keys"),s=o.map(function(t,r){return a.a.createElement(oe,{label:0===r?"Choices":"",key:t},n("questions[".concat(e.props.id,"]choices[").concat(t,"]"),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input a choice to the question"}]})(a.a.createElement(y.a,{placeholder:"Answer choice"})),o.length>1?a.a.createElement(g.a,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===o.length,onClick:function(){return e.remove(t)}}):null)});return a.a.createElement(f,null,a.a.createElement(oe,{label:"Question: "},n("question[".concat(this.props.id,"]"),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"Please input a question"}]})(a.a.createElement(y.a,{placeholder:"Add a question"}))),a.a.createElement(oe,{label:"Answer: "},n("answers[".concat(this.props.id,"]"),{validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"Please input an answer to this question"}]})(a.a.createElement(y.a,{placeholder:"What is the answer?"}))),s,a.a.createElement(oe,null,a.a.createElement(T.a,{type:"dashed",onClick:this.add,style:{width:"60%"}},a.a.createElement(g.a,{type:"plus"})," Add an answer choice")))}}]),t}(a.a.Component),ue=S.a.Item,le=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(a)))).state={formCount:1},n.remove=function(){var e=n.state.formCount;n.setState({formCount:e-1})},n.add=function(){var e=n.state.formCount;n.setState({formCount:e+1})},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){if(!e){console.log("Received values of form: ",t);for(var r=[],a=0;a<t.questions.length;a+=1)r.push({title:t.question[a],choices:t.questions[a].choices.filter(function(e){return null!==e}),answer:t.answers[a]});var o={teacher:n.props.username,title:t.title,questions:r};n.props.createASNT(n.props.token,o)}})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){for(var e=this,t=this.props.form.getFieldDecorator,n=[],r=0;r<this.state.formCount;r+=1)n.push(a.a.createElement(f,{key:r},n.length>0?a.a.createElement(g.a,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:0===n.length,onClick:function(){return e.remove()}}):null,a.a.createElement(ie,Object.assign({id:r},this.props)),a.a.createElement(ae.a,null)));return a.a.createElement(S.a,{onSubmit:this.handleSubmit},a.a.createElement("h1",null,"Create an assignment"),a.a.createElement(ue,{label:"Title: "},t("title",{validateTrigger:["onChange","onBlur"],rules:[{required:!0,message:"Please input a title"}]})(a.a.createElement(y.a,{placeholder:"Add a title"}))),n,a.a.createElement(ue,null,a.a.createElement(T.a,{type:"secondary",onClick:this.add},a.a.createElement(g.a,{type:"plus"})," Add question")),a.a.createElement(ue,null,a.a.createElement(T.a,{type:"primary",htmlType:"submit"},"Submit")))}}]),t}(a.a.Component),ce=S.a.create()(le),pe=Object(d.b)(function(e){return{token:e.auth.token,username:e.auth.username,loading:e.assignments.loading}},function(e){return{createASNT:function(t,n){return e(function(e,t){return function(n){n({type:"CREATE_ASSIGNMENT_START"}),A.a.defaults.headers={"Content-Type":"application/json",Authorization:"Token ".concat(e)},A.a.post("http://0.0.0.0:8000/assignments/",t).then(function(e){var t;n({type:"CREATE_ASSIGNMENT_SUCCESS",assignment:t})}).catch(function(e){var t;n({type:"CREATE_ASSIGNMENT_FAIL",error:t})})}}(t,n))}}})(ce),me=function(){return a.a.createElement(f,null,a.a.createElement(h.a,{exact:!0,path:"/",component:V}),a.a.createElement(h.a,{exact:!0,path:"/create/",component:pe}),a.a.createElement(h.a,{exact:!0,path:"/login/",component:w}),a.a.createElement(h.a,{exact:!0,path:"/signup/",component:R}),a.a.createElement(h.a,{exact:!0,path:"/assignments/:id",component:re}),a.a.createElement(h.a,{exact:!0,path:"/profile/:id",component:B}))},de=(n(359),n(362)),he=n(131),fe=n(368),ge=de.a.Header,Ee=de.a.Content,Se=de.a.Footer,ye=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement(de.a,{className:"layout"},a.a.createElement(ge,null,a.a.createElement("div",{className:"logo"}),a.a.createElement(he.a,{theme:"dark",mode:"horizontal",defaultSelectedKeys:["2"],style:{lineHeight:"64px"}},this.props.isAuthenticated?a.a.createElement(he.a.Item,{key:"2",onClick:this.props.logout},"Logout"):a.a.createElement(he.a.Item,{key:"2"},a.a.createElement(m.b,{to:"/login"},"Login")))),a.a.createElement(Ee,{style:{padding:"0 50px"}},a.a.createElement(fe.a,{style:{margin:"16px 0"}},a.a.createElement(fe.a.Item,null,a.a.createElement(m.b,{to:"/"},"Home")),null!==this.props.token?a.a.createElement(fe.a.Item,null,a.a.createElement(m.b,{to:"/profile/".concat(this.props.userId)},"Profile")):null,null!==this.props.token&&this.props.is_teacher?a.a.createElement(fe.a.Item,null,a.a.createElement(m.b,{to:"/create"},"Create")):null),a.a.createElement("div",{style:{background:"#fff",padding:24,minHeight:280}},this.props.children)),a.a.createElement(Se,{style:{textAlign:"center"}},"Ant Design \xa92016 Created by Ant UED"))}}]),t}(a.a.Component),Te=Object(h.e)(Object(d.b)(function(e){return{userId:e.auth.userId,token:e.auth.token,is_teacher:e.auth.is_teacher}},function(e){return{logout:function(){return e(k())}}})(ye)),ve=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.onTryAutoSignup()}},{key:"render",value:function(){return a.a.createElement(m.a,null,a.a.createElement(Te,this.props,a.a.createElement(me,null)))}}]),t}(r.Component),Ae=Object(d.b)(function(e){return{isAuthenticated:null!==e.auth.token}},function(e){return{onTryAutoSignup:function(){return e(function(e){var t=JSON.parse(localStorage.getItem("user"));if(void 0===t||null===t)e(k());else{var n=new Date(t.expirationDate);n<=new Date?e(k()):(e(b(t)),e(I((n.getTime()-(new Date).getTime())/1e3)))}})}}})(ve);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var be=n(55),_e=n(178),ke=n(179),Ie=function(e,t){return Object(ke.a)({},e,t)},Oe={token:null,username:null,is_student:null,is_teacher:null,userId:null,error:null,loading:!1},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_START":return function(e,t){return Ie(e,{error:null,loading:!0})}(e);case"AUTH_SUCCESS":return function(e,t){return Ie(e,{token:t.user.token,username:t.user.username,is_student:t.user.is_student,is_teacher:t.user.is_teacher,userId:t.user.userId,error:null,loading:!1})}(e,t);case"AUTH_FAIL":return function(e,t){return Ie(e,{error:t.error,loading:!1})}(e,t);case"AUTH_LOGOUT":return function(e,t){return Ie(e,{token:null})}(e);default:return e}},je={assignments:[],currentAssignment:{},error:null,loading:!1},we=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:je,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ASSIGNMENT_LIST_START":return function(e,t){return Ie(e,{error:null,loading:!0})}(e);case"GET_ASSIGNMENTS_LIST_SUCCESS":return function(e,t){return Ie(e,{assignments:t.assignments,error:null,loading:!1})}(e,t);case"GET_ASSIGNMENTS_LIST_FAIL":return function(e,t){return Ie(e,{error:t.error,loading:!1})}(e,t);case"GET_ASSIGNMENT_DETAIL_START":return function(e,t){return Ie(e,{error:null,loading:!0})}(e);case"GET_ASSIGNMENT_DETAIL_SUCCESS":return function(e,t){return Ie(e,{currentAssignment:t.assignment,error:null,loading:!1})}(e,t);case"GET_ASSIGNMENT_DETAIL_FAIL":return function(e,t){return Ie(e,{error:t.error,loading:!1})}(e,t);case"CREATE_ASSIGNMENT_START":return function(e,t){return Ie(e,{error:null,loading:!0})}(e);case"CREATE_ASSIGNMENT_SUCCESS":return function(e,t){return Ie(e,{error:null,loading:!1})}(e);case"CREATE_ASSIGNMENT_FAIL":return function(e,t){return Ie(e,{error:t.error,loading:!1})}(e,t);default:return e}},Ce={assignments:[],error:null,loading:!1},Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_GRADED_ASSIGNMENT_LIST_START":return function(e,t){return Ie(e,{error:null,loading:!0})}(e);case"GET_GRADED_ASSIGNMENTS_LIST_SUCCESS":return function(e,t){return Ie(e,{assignments:t.assignments,error:null,loading:!1})}(e,t);case"GET_GRADED_ASSIGNMENTS_LIST_FAIL":return function(e,t){return Ie(e,{error:t.error,loading:!1})}(e,t);default:return e}},De=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||be.d,Le=Object(be.c)({auth:Ne,assignments:we,gradedAssignments:Ge}),xe=Object(be.e)(Le,De(Object(be.a)(_e.a))),Fe=a.a.createElement(d.a,{store:xe},a.a.createElement(Ae,null));s.a.render(Fe,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[181,1,2]]]);
//# sourceMappingURL=main.d6fc5332.chunk.js.map