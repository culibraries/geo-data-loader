!function(){var n=Handlebars.template,l=Handlebars.templates=Handlebars.templates||{};l["tmpl-add-form"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<h3> Example Add Task </h3>\n<form id="addTaskForm" class="form-stacked">\n    <fieldset>\n    <div class="col-md-4">\n        <div class="form-group">\n            <label for="x"> x </label>\n            <input type="x" name="x" class="form-control input-sm" id="x" value='+d((s=null!=(s=a.x||(null!=l?l.x:l))?s:i,"function"==typeof s?s.call(o,{name:"x",hash:{},data:t}):s))+'>\n        </div>\n        <div class="form-group">\n            <label for="y"> y </label>\n            <input type="y" name="y" class="form-control input-sm" id="y" value='+d((s=null!=(s=a.y||(null!=l?l.y:l))?s:i,"function"==typeof s?s.call(o,{name:"y",hash:{},data:t}):s))+'>\n        </div>\n        <button id="addTask" class="btn btn-info-outline btn-primary" type="button">Add Task</button>\n    </div>\n    </fieldset>\n</form>\n<div class="col-md-6"><pre id="task_result"></pre></div>\n'},useData:!0}),l["tmpl-dropzone"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<div id="dropzone" class="center">\n  <form id="dropzone1" action="/api/upload/" class="dropzone needsclick" >\n    <div style="display:none">\n      <input type="hidden" name="csrfmiddlewaretoken" value="'+d((s=null!=(s=a.csrftoken||(null!=l?l.csrftoken:l))?s:i,"function"==typeof s?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n    </div>\n    <div style="display:none">\n      <input type="hidden" name="callback" value="'+d((s=null!=(s=a.task||(null!=l?l.task:l))?s:i,"function"==typeof s?s.call(o,{name:"task",hash:{},data:t}):s))+'"/>\n    </div>\n    <div style="display:none">\n      <input type="hidden" name="tags" value="'+d((s=null!=(s=a.tags||(null!=l?l.tags:l))?s:i,"function"==typeof s?s.call(o,{name:"tags",hash:{},data:t}):s))+'"/>\n    </div>\n    <div class="dz-message needsclick center">\n      <strong>Drop zip files here or click to upload.</strong>\n    </div>\n  </form>\n</div>\n<script>\n      Dropzone.autoDiscover = false;\n      $("#dropzone1").dropzone({\n          url: "/api/upload/",\n          maxFilesize: 10000,\n          uploadMultiple: false,\n          addRemoveLinks: true,\n          acceptedFiles: ".zip",\n          init: function() {\n            this.on("complete", function(file) {\n              this.removeFile(file);\n            });\n            this.on("success",function(file,response){\n              console.log(response);\n              load_task_history(user_task_url);\n              showChildResult(response[0].callback.response.result_url);\n            });\n            this.on("error", function(file){\n              if (!file.accepted){alert("File must be a zipfile.");}\n              this.removeFile(file);\n            });\n          }\n      });\n<\/script>\n'},useData:!0}),l["tmpl-geolibrary-new"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o,i=n.escapeExpression,d=n.lambda;return'<div class="">\n  <div class="row">\n    <div class="col-sm-6" >\n      <h3>XML File</h3>\n      <textarea rows=60 id="xmlfilexml"></textarea>\n      <a href="'+i((o=null!=(o=a.urlxmlfgdc||(null!=l?l.urlxmlfgdc:l))?o:a.helperMissing,"function"==typeof o?o.call(null!=l?l:n.nullContext||{},{name:"urlxmlfgdc",hash:{},data:t}):o))+'">FGDC XML</a>\n    </div>\n    <div class="col-sm-6">\n      <h3>Geoblacklight Schema</h3>\n     <form id="geoblacklightform" action="" class="" >\n       <div style="display:none">\n         <input type="hidden" name="dct_references_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_references_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="uuid" value="'+i(d(null!=(s=null!=l?l.data:l)?s.uuid:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="dc_identifier_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_identifier_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="layer_id_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.layer_id_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="dc_language_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_language_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="dct_provenance_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_provenance_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="dct_type_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_type_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="layer_slug_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.layer_slug_s:s,l))+'"/>\n       </div>\n       <div style="display:none">\n         <input type="hidden" name="dc_type_s" value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_type_s:s,l))+'"/>\n       </div>\n       <div class="form-group">\n         <label for="dc_title_s" >Title</label>\n         <input type="text" class="form-control" name="dc_title_s"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_title_s:s,l))+'"/>\n       </div>\n         <div class="form-group">\n           <label for="dc_description_s">Description</label>\n           <textarea name="dc_description_s" class="form-control" rows="10" cols="60">'+i(d(null!=(s=null!=l?l.data:l)?s.dc_description_s:s,l))+'</textarea>\n         </div>\n           <div class="form-group">\n             <label for="dc_rights_s">Rights</label>\n             <select name="dc_rights_s" class="form-control" value='+i(d(null!=(s=null!=l?l.data:l)?s.dc_rights_s:s,l))+'>\n                 <option value="Public">Public</option>\n                 <option value="Restricted">Restricted</option>\n             </select>\n          </div>\n          <div class="form-group">\n             <label for="layer_geom_type_s">Geometry Type</label>\n             <select class="form-control" name="layer_geom_type_s" value='+i(d(null!=(s=null!=l?l.data:l)?s.layer_geom_type_s:s,l))+'>\n                 <option value="Polygon">Polygon</option>\n                 <option value="Raster">Raster</option>\n                 <option value="Point">Point</option>\n                 <option value="Line">Line</option>\n                 <option value="Image">Image</option>\n                 <option value="Mixed">Mixed</option>\n                 <option value="Paper Map">Paper Map</option>\n             </select>\n           </div>\n           <div class="form-group">\n              <label for="dc_format_s">File Format</label>\n              <select  class="form-control" name="dc_format_s" value='+i(d(null!=(s=null!=l?l.data:l)?s.dc_format_s:s,l))+'>\n                  <option value="Shapefile">Shapefile</option>\n                  <option value="GeoTiff">GeoTiff</option>\n                  <option value="Scanned Map">Scanned Map</option>\n                  <option value="File">File</option>\n              </select>\n            </div>\n           <div class="form-group">\n             <label for="dc_publisher_s">Publisher</label>\n             <input class="form-control" type="text" name="dc_publisher_s"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_publisher_s:s,l))+'"/>\n          </div>\n\n            <div class="form-group">\n                <label for="dct_issued_s">Date Issued</label>\n                <input class="form-control" type="text" name="dct_issued_s"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_issued_s:s,l))+'"/>\n             </div>\n             <div class="form-group">\n               <label for="dc_creator_sm1">Creator List</label>\n               <input class="form-control" type="text" name="dc_creator_sm1"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_creator_sm1:s,l))+'"/>\n            </div>\n            <div class="form-group">\n              <label for="dc_subject_sm1">Subject List</label>\n              <input class="form-control" type="text" name="dc_subject_sm1"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dc_subject_sm1:s,l))+'"/>\n           </div>\n           <div class="form-group">\n             <label for="dct_temporal_sm1">Temporal List</label>\n             <input class="form-control" type="text" name="dct_temporal_sm1"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_temporal_sm1:s,l))+'"/>\n          </div>\n          <div class="form-group">\n            <label for="dct_spatial_sm1">Spatial List</label>\n            <input class="form-control" type="text" name="dct_spatial_sm1"value="'+i(d(null!=(s=null!=l?l.data:l)?s.dct_spatial_sm1:s,l))+'"/>\n         </div>\n\n         <button class="btn btn-primary" type="button" id="getblight">Get Schema</button>\n     </form>\n\n    </div>\n\n</div>\n</div>\n<script>\n/*\n  var container = document.getElementById("jsoneditor");\n  var options = {};\n  var editor = new JSONEditor(container, options);\n  editor.set(jsonData)\n*/\n<\/script>\n'},useData:!0}),l["tmpl-main-geoedit"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){return'<div>\n<div class="form-inline" style="margin-bottom:5px">\n<label class="control-label" for="ssearch">Search</label>\n<input type="text" class="form-control" name="ssearch" id="search" style="min-width:50%;max-width:60%">\n<button class="btn btn-primary" id="submitSearch">Search</button>\n</div>\n<div id="paginate-div" class="col-md-8" style="text-align:center"></div>\n<table class="table table-bordered" id=\'editmeta\'>\n              <tr>\n                  <th>GeoLibrary Indexed Metadata</th>\n                  <th>\n                    <button class="btn btn-primary" onclick="reIndexAll()">Index All</button>\n                  </th>\n              </tr>\n              <tbody id=\'tablebody\'>\n              </tbody>\n</table>\n<div id="paginate-div-bt" style="text-align:center"></div>\n'},useData:!0}),l["tmpl-main-tr"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<tr><td>\n<div>\n    <label style="margin-right:15px">\n        Title:</label><span><em>'+d((s=null!=(s=a.dc_title_s||(null!=l?l.dc_title_s:l))?s:i,"function"==typeof s?s.call(o,{name:"dc_title_s",hash:{},data:t}):s))+'</em></span><br>\n    <label style="margin-right:15px"> Description:</label><span>'+d((s=null!=(s=a.dc_description_s||(null!=l?l.dc_description_s:l))?s:i,"function"==typeof s?s.call(o,{name:"dc_description_s",hash:{},data:t}):s))+'</span><br>\n\n</div>\n</td>\n<td>\n    <button class="btn btn-primary" onclick="editMetadata(\''+d((s=null!=(s=a._id||(null!=l?l._id:l))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+"')\">Edit</button>\n</td>\n</tr>\n"},useData:!0}),l["tmpl-modalAppMetadata"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title" id="myModalLabel">'+d((s=null!=(s=a.modal_name||(null!=l?l.modal_name:l))?s:i,"function"==typeof s?s.call(o,{name:"modal_name",hash:{},data:t}):s))+'</h3>\n      </div>\n      <div class="modal-body">\n        <textarea  id="myMetadataModalbody" rows="30" cols="" style="width:100%;padding:10px;">'+d((s=null!=(s=a.modal_data||(null!=l?l.modal_data:l))?s:i,"function"==typeof s?s.call(o,{name:"modal_data",hash:{},data:t}):s))+'</textarea>\n      </div>\n      <div class="modal-footer">\n          <div id=ModalFooter style="float:right;">\n              <button type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Cancel</button>\n              <button class="btn btn-primary" onclick="saveMetadata(\''+d((s=null!=(s=a._id||(null!=l?l._id:l))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+"')\">Update Index</button>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n"},useData:!0}),l["tmpl-modalAppTaskResult"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h3 class="modal-title" id="myModalLabel">'+d((s=null!=(s=a.modal_name||(null!=l?l.modal_name:l))?s:i,"function"==typeof s?s.call(o,{name:"modal_name",hash:{},data:t}):s))+'</h3>\n      </div>\n      <div class="modal-body">\n        <pre id="myModalbody">'+d((s=null!=(s=a.modal_data||(null!=l?l.modal_data:l))?s:i,"function"==typeof s?s.call(o,{name:"modal_data",hash:{},data:t}):s))+'</pre>\n      </div>\n      <div class="modal-footer">\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0}),l["tmpl-tr"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d=n.escapeExpression;return'<tr><td><a href="#" onclick="showResult(\''+d((s=null!=(s=a.result||(null!=l?l.result:l))?s:i,"function"==typeof s?s.call(o,{name:"result",hash:{},data:t}):s))+"');return false;\" >"+d((s=null!=(s=a.task_name||(null!=l?l.task_name:l))?s:i,"function"==typeof s?s.call(o,{name:"task_name",hash:{},data:t}):s))+"</a></td><td>"+d((s=null!=(s=a.timestamp||(null!=l?l.timestamp:l))?s:i,"function"==typeof s?s.call(o,{name:"timestamp",hash:{},data:t}):s))+"</td><td>"+d((a.json_metatags||l&&l.json_metatags||i).call(o,null!=l?l.tags:l,{name:"json_metatags",hash:{},data:t}))+"</td></tr>\n"},useData:!0}),l["tmpl-user"]=n({compiler:[7,">= 4.0.0"],main:function(n,l,a,e,t){var s,o=null!=l?l:n.nullContext||{},i=a.helperMissing,d="function",r=n.escapeExpression;return'      <h2>User Profile</h2>\n      <div id="user_profile">\n          <div id="photo" class="col-md-2" style="width:200px ">\n            <img src="'+r((s=null!=(s=a.gravator_url||(null!=l?l.gravator_url:l))?s:i,typeof s===d?s.call(o,{name:"gravator_url",hash:{},data:t}):s))+'?s=180&d=mm"><br><br>\n            <a href="https://en.gravatar.com/" target="_blank" style="clear:both;">Profile Image</a><br><br>\n            <a id="reset_password" style="clear:both;">Reset Password</a>\n          </div>\n          <form  id="view_form" class="form-horizontal col-md-4" onsubmit="return edit_user();">\n              <div class="form-group">\n                <label class="col-md-3 control-label">Username</label>\n                  <div class="col-md-09">\n                <p class="form-control-static">'+r((s=null!=(s=a.username||(null!=l?l.username:l))?s:i,typeof s===d?s.call(o,{name:"username",hash:{},data:t}):s))+'</p>\n                </div>\n            </div>\n             <div class="form-group">\n                  <label class="col-md-3 control-label">Name</label>\n                    <div class="col-md-09">\n                  <p class="form-control-static">'+r((s=null!=(s=a.name||(null!=l?l.name:l))?s:i,typeof s===d?s.call(o,{name:"name",hash:{},data:t}):s))+'</p>\n                  </div>\n            </div>\n              <div class="form-group">\n                <label class="col-md-3 control-label">Email</label>\n                  <div class="col-md-09">\n                    <p class="form-control-static">'+r((s=null!=(s=a.email||(null!=l?l.email:l))?s:i,typeof s===d?s.call(o,{name:"email",hash:{},data:t}):s))+'</p>\n                 </div>\n             </div>\n             <button type="submit" id="form_submit" class="btn btn-default pull-right" style="margin-right:40px;">Edit</button>\n         </form>\n          <form class="col-md-4" id="user_form" onsubmit="return submit_user();">\n              <div style="display:none">\n                  <input type="hidden" name="csrfmiddlewaretoken" value="'+r((s=null!=(s=a.csrftoken||(null!=l?l.csrftoken:l))?s:i,typeof s===d?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n             </div>\n              <div class="form-group">\n                 <label for="first_name">First Name</label>\n                  <input type="text" class="form-control" name="first_name" placeholder="John" value="'+r((s=null!=(s=a.first_name||(null!=l?l.first_name:l))?s:i,typeof s===d?s.call(o,{name:"first_name",hash:{},data:t}):s))+'">\n             </div>\n              <div class="form-group">\n                   <label for="last_name">Last Name</label>\n                    <input type="text" class="form-control" name="last_name" placeholder="Doe" value="'+r((s=null!=(s=a.last_name||(null!=l?l.last_name:l))?s:i,typeof s===d?s.call(o,{name:"last_name",hash:{},data:t}):s))+'">\n               </div>\n              <div class="form-group">\n                 <label for="email">Email address</label>\n                  <input type="email" class="form-control" name="email" placeholder="Enter email" value="'+r((s=null!=(s=a.email||(null!=l?l.email:l))?s:i,typeof s===d?s.call(o,{name:"email",hash:{},data:t}):s))+'">\n             </div>\n             <button type="submit" id="form_submit1" class="btn btn-default pull-right">Update</button>\n         </form>\n         <div class="row" style="width:100%;clear:both;"></div>\n          <form class="form-inline" id="pass_form" onsubmit="return set_password();" style="display:none">\n            <div style="display:none">\n                    <input type="hidden" name="csrfmiddlewaretoken" value="'+r((s=null!=(s=a.csrftoken||(null!=l?l.csrftoken:l))?s:i,typeof s===d?s.call(o,{name:"csrftoken",hash:{},data:t}):s))+'"/>\n           </div>\n            <div class="form-group">\n             <label for="password">New Password</label>\n              <input type="password" class="form-control" name="password" placeholder="New Password">\n           </div>\n            <div class="form-group">\n             <label for="password2">Retype New Password</label>\n              <input type="password" class="form-control" name="password2" placeholder="Retype New Password">\n           </div>\n           <button type="submit" class="btn btn-default">Set Password</button>\n         </form>\n     </div>\n'},useData:!0})}();
