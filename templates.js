!function(){var l=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["tmpl-add-form"]=l({compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:l.nullContext||{},r=a.helperMissing,i=l.escapeExpression;return'\n  <div id="dropzone" class="center"><form action="/api/upload/" class="dropzone needsclick" id="geo-upload">\n      <div style="display:none">\n              <input type="hidden" name="csrfmiddlewaretoken" value="'+i((s=null!=(s=a.csrftoken||(null!=n?n.csrftoken:n))?s:r,"function"==typeof s?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n     </div>\n     <div style="display:none">\n              <input type="hidden" name="callback" value="geoblacklightq.tasks.workflow.resetSolrIndex"/>\n     </div>\n  <div class="dz-message needsclick center">\n    <strong>Drop zip files here or click to upload.</strong>\n  </div>\n</form></div>\n<script>\n      Dropzone.autoDiscover = false;\n      $("#dropzone").dropzone({\n          maxFilesize: 10000,\n          uploadMultiple: false,\n          addRemoveLinks: true\n          acceptedFiles: ".zip"\n      });\n      $("#dropzone").dropzone.on("complete", function(file) {\n          $("#dropzone").dropzone.removeFile(file);\n      });\n<\/script>\n<h3> Example Add Task </h3>\n<form id="addTaskForm" class="form-stacked">\n    <fieldset>\n    <div class="col-md-4">\n        <div class="form-group">\n            <label for="x"> x </label>\n            <input type="x" name="x" class="form-control input-sm" id="x" value='+i((s=null!=(s=a.x||(null!=n?n.x:n))?s:r,"function"==typeof s?s.call(o,{name:"x",hash:{},data:t}):s))+'>\n        </div>\n        <div class="form-group">\n            <label for="y"> y </label>\n            <input type="y" name="y" class="form-control input-sm" id="y" value='+i((s=null!=(s=a.y||(null!=n?n.y:n))?s:r,"function"==typeof s?s.call(o,{name:"y",hash:{},data:t}):s))+'>\n        </div>\n        <button id="addTask" class="btn btn-info-outline btn-primary" type="button">Add Task</button>\n    </div>\n    </fieldset>\n</form>\n<div class="col-md-6"><pre id="task_result"></pre></div>\n'},useData:!0}),n["tmpl-tr"]=l({compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:l.nullContext||{},r=a.helperMissing,i=l.escapeExpression;return'<tr><td><a href="#" onclick="showResult(\''+i((s=null!=(s=a.result||(null!=n?n.result:n))?s:r,"function"==typeof s?s.call(o,{name:"result",hash:{},data:t}):s))+"');return false;\" >"+i((s=null!=(s=a.task_name||(null!=n?n.task_name:n))?s:r,"function"==typeof s?s.call(o,{name:"task_name",hash:{},data:t}):s))+"</a></td><td>"+i((s=null!=(s=a.timestamp||(null!=n?n.timestamp:n))?s:r,"function"==typeof s?s.call(o,{name:"timestamp",hash:{},data:t}):s))+"</td><td>"+i((a.json_metatags||n&&n.json_metatags||r).call(o,null!=n?n.tags:n,{name:"json_metatags",hash:{},data:t}))+"</td></tr>\n"},useData:!0}),n["tmpl-user"]=l({compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:l.nullContext||{},r=a.helperMissing,i="function",d=l.escapeExpression;return'      <h2>User Profile</h2>\n      <div id="user_profile">\n          <div id="photo" class="col-md-2" style="width:200px ">\n            <img src="'+d((s=null!=(s=a.gravator_url||(null!=n?n.gravator_url:n))?s:r,typeof s===i?s.call(o,{name:"gravator_url",hash:{},data:t}):s))+'?s=180&d=mm"><br><br>\n            <a href="https://en.gravatar.com/" target="_blank" style="clear:both;">Profile Image</a><br><br>\n            <a id="reset_password" style="clear:both;">Reset Password</a>\n          </div>\n          <form  id="view_form" class="form-horizontal col-md-4" onsubmit="return edit_user();">\n              <div class="form-group">\n                <label class="col-md-3 control-label">Username</label>\n                  <div class="col-md-09">\n                <p class="form-control-static">'+d((s=null!=(s=a.username||(null!=n?n.username:n))?s:r,typeof s===i?s.call(o,{name:"username",hash:{},data:t}):s))+'</p>\n                </div>\n            </div>\n             <div class="form-group">\n                  <label class="col-md-3 control-label">Name</label>\n                    <div class="col-md-09">\n                  <p class="form-control-static">'+d((s=null!=(s=a.name||(null!=n?n.name:n))?s:r,typeof s===i?s.call(o,{name:"name",hash:{},data:t}):s))+'</p>\n                  </div>\n            </div>\n              <div class="form-group">\n                <label class="col-md-3 control-label">Email</label>\n                  <div class="col-md-09">\n                    <p class="form-control-static">'+d((s=null!=(s=a.email||(null!=n?n.email:n))?s:r,typeof s===i?s.call(o,{name:"email",hash:{},data:t}):s))+'</p>\n                 </div>\n             </div>\n             <button type="submit" id="form_submit" class="btn btn-default pull-right" style="margin-right:40px;">Edit</button>\n         </form>\n          <form class="col-md-4" id="user_form" onsubmit="return submit_user();">\n              <div style="display:none">\n                  <input type="hidden" name="csrfmiddlewaretoken" value="'+d((s=null!=(s=a.csrftoken||(null!=n?n.csrftoken:n))?s:r,typeof s===i?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n             </div>\n              <div class="form-group">\n                 <label for="first_name">First Name</label>\n                  <input type="text" class="form-control" name="first_name" placeholder="John" value="'+d((s=null!=(s=a.first_name||(null!=n?n.first_name:n))?s:r,typeof s===i?s.call(o,{name:"first_name",hash:{},data:t}):s))+'">\n             </div>\n              <div class="form-group">\n                   <label for="last_name">Last Name</label>\n                    <input type="text" class="form-control" name="last_name" placeholder="Doe" value="'+d((s=null!=(s=a.last_name||(null!=n?n.last_name:n))?s:r,typeof s===i?s.call(o,{name:"last_name",hash:{},data:t}):s))+'">\n               </div>\n              <div class="form-group">\n                 <label for="email">Email address</label>\n                  <input type="email" class="form-control" name="email" placeholder="Enter email" value="'+d((s=null!=(s=a.email||(null!=n?n.email:n))?s:r,typeof s===i?s.call(o,{name:"email",hash:{},data:t}):s))+'">\n             </div>\n             <button type="submit" id="form_submit1" class="btn btn-default pull-right">Update</button>\n         </form>\n         <div class="row" style="width:100%;clear:both;"></div>\n          <form class="form-inline" id="pass_form" onsubmit="return set_password();" style="display:none">\n            <div style="display:none">\n                    <input type="hidden" name="csrfmiddlewaretoken" value="'+d((s=null!=(s=a.csrftoken||(null!=n?n.csrftoken:n))?s:r,typeof s===i?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n           </div>\n            <div class="form-group">\n             <label for="password">New Password</label>\n              <input type="password" class="form-control" name="password" placeholder="New Password">\n           </div>\n            <div class="form-group">\n             <label for="password2">Retype New Password</label>\n              <input type="password" class="form-control" name="password2" placeholder="Retype New Password">\n           </div>\n           <button type="submit" class="btn btn-default">Set Password</button>\n         </form>\n     </div>\n'},useData:!0})}();
