$(function() {

    //Customize by setting base_url to cybercom/api docker application
    base_url = "/api";
    //No other alterations is need to get the standard applicaiton running!
    login_url = base_url + "/api-auth/login/?next=";
    logout_url = base_url + "/api-auth/logout/?next=";
    user_task_url = base_url + "/queue/usertasks/.json?page_size=10";
    user_url = base_url + "/user/?format=json";
    prevlink=null;nextlink=null;
    zipurl="zipfile.zip"
    geoschema={};
    set_auth(base_url,login_url);
    $("#aprofile").click(function(){activaTab('profile')})
    $("#alogout").click(function(){window.location = logout_url.concat(document.URL);})
    load_task_history(user_task_url);
    $('#prevlink').click(function(){load_task_history(prevlink);});
    $('#nextlink').click(function(){load_task_history(nextlink);});
    Handlebars.registerHelper('json_metatags', function(context) {
                if (typeof context !== 'undefined') {
                    return JSON.stringify(context).replace(/"/g,'').replace(/\[/g,'').replace(/\]/g,'').replace(/,/g,', ');
                }else{
                    return ""
                }
    });
    load_metadata();
    load_dropzone("geoblacklightq.tasks.workflow.geoLibraryLoader","geoLibraryLoader");
    jsonData = {};
    //load_example_task();
});//End of Document Ready
function load_metadata(){
    main_tmpl= Handlebars.templates['tmpl-main-geoedit'];

    $('#dataitems').empty();
    $('#dataitems').append(main_tmpl({}));
    catalog_url= '/api/catalog/data/catalog/geoportal/.json?page_size=0';
    $('#tablebody').empty();
    $('#submitSearch').click(function(){run_search();})
    $("#search").keyup(function(event){
        if(event.keyCode == 13){
            run_search();
        }
    });
    $.getJSON(catalog_url,function(data){
        tr_templates = Handlebars.templates['tmpl-main-tr'];
        $.each(data.results,function(idx,item){
            console.log(item);
            $('#tablebody').append(tr_templates(item));
        });

    });
}
function run_search(){
    $('#tablebody').empty();
    search = $('#search').val();
    if (search=="" || search=="*"){
        catalog_url= '/api/catalog/data/catalog/geoportal/.json?page_size=0';
    } else{
        catalog_url= '/api/catalog/data/catalog/geoportal/.json?query={"filter":{"$text":{"$search":"'+ search +'"}}}&page_size=0';
    }

    $.getJSON(catalog_url,function(data){
        tr_templates = Handlebars.templates['tmpl-main-tr'];
        $.each(data.results,function(idx,item){
            console.log(item);
            $('#tablebody').append(tr_templates(item));
        });

    });
}
function editMetadata(catalog_id){
    $('#modals').empty();
    task_template = Handlebars.templates['tmpl-modalAppMetadata']
    url = '/api/catalog/data/catalog/geoportal/' + catalog_id ;
    $.getJSON(url + "/.json" , function(data){
        delete data._id;
        json_data = JSON.stringify(objectWithKeySorted(data),null, 4);
        tmpdata = {"_id":catalog_id,"modal_data":json_data,"modal_name":data.dc_title_s};
        $('#modals').append(task_template(tmpdata));
        $("#myModal").modal('show');
    });

}
function saveMetadata(catalog_id){
    try {
        data= JSON.parse($("#myMetadataModalbody").val());
    }catch(err) {
        alert(err.message);
        return;
    }
    if (catalog_id != ''){
        data._id=catalog_id;
    }
    url = '/api/catalog/data/catalog/geoportal/.json';
    $.postJSON(url,data);
    setTimeout('', 3000);
    reIndexAll();
    $("#myModal").modal('hide');
}

function reIndexAll(){
    url = '/api/catalog/data/catalog/geoportal/.json?page_size=0';
    $.getJSON(url, function(data){
        index_data= $.map(data.results,function(n,i){
            n.id=n._id;delete n._id;delete n.id; return n;
        });
        postdata = $.getCYBERCOM_JSON_OBJECT("geoblacklightq.tasks.workflow.resetSolrIndex");
        postdata.args=[index_data];
        taskurl='/api/queue/run/geoblacklightq.tasks.workflow.resetSolrIndex/';
        //(url, data, callback,fail)
        $.postJSON(taskurl,postdata,reIndexCallback)
        //json_data = JSON.stringify(index_data,null, 4);
        //$("#myModalbody").html(json_data);
        //$("#myModalbody").urlize();
        //$("#myModal").modal('show');
    });
}
function poll_layers(url){
    $.getJSON(url,function(data){
        status = check_status(data);
        if (status=="PENDING"){
            setTimeout(function() { poll_layers(url); }, 3000);
        };
        if (status=="SUCCESS"){
            select_tmpl = Handlebars.templates['tmpl-geoserver-select']
            layers=[];
            $.each(data.result.result,function(idx,itm){
                itm.objct_string = JSON.stringify(itm);
                layers.push(itm);
            });
            $("#geolayers").append(select_tmpl({"layers":layers}));
        };
        if (status=="FAILURE"){
            alert("Task Failure occured load Geoserver Layers. Please try again.");
        };
    })
}
function loadGeoServerMetadata(data,textStatus,xhr){
    poll_layers(data.result_url);

}
function reIndexCallback(data,textStatus,xhr){
    url = data.result_url
    showChildResult(url);
    //alert("Updated Solr Index");
}
function load_dropzone(task,tags){
  dropzone_tmpl = Handlebars.templates['tmpl-dropzone']
  $('#home').empty()
  $('#home').append(dropzone_tmpl({"csrftoken":getCookie('csrftoken'),"task":task,"tags":tags}))
}
function load_example_task(){
    addtask_template = Handlebars.templates['tmpl-add-form']
    $('#home').empty()
    $('#home').append(addtask_template({"x":10,"y":10,"csrftoken":getCookie('csrftoken')}))
    $('#addTask').click(function(){run_example_task();})

}
function run_example_task(){
    add_url = "/api/queue/run/geoblacklightq.tasks.tasks.add/.json"
    task_name = "geoblacklightq.tasks.tasks.add"
    form_data=$('#addTaskForm').serializeObject()
    cybercom_submit_task(add_url,task_name,[parseInt(form_data.x),parseInt(form_data.y)],{},"task_result")
}
function submit_user(){
    console.log(user_url)
    $.post( user_url,$('#user_form').serializeObject(),function(data){
        data.csrftoken = getCookie('csrftoken')
        $('#profile').empty();
        //source = $('#user-template').html()
        //user_template = Handlebars.compile(source);
        user_template = Handlebars.templates['tmpl-user']
        $('#profile').append(user_template(data))
        $('#user_form').hide()
        $('#view_form').show()
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
    })
    .fail(function(){ alert("Error Occured on User Update.")});
    //$('#user_form').hide()
    //$('#view_form').show()
    //var formData = JSON.parse($("#user_form").serializeArray());
    //console.log(formData);
    return false;
}
function edit_user(){
    $('#user_form').show()
    $('#view_form').hide()
    return false;
}
function set_password(){
    pass = $('#pass_form').serializeObject()
    if (pass.password !== pass.password2){
        alert("Passwords were not identical")
        return false;

    }
    $.post( user_url,$('#pass_form').serializeObject(),function(data){
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
        alert(JSON.stringify(data))
    })
    .fail(function(){ alert("Error Occured on Password Reset.")});
    return false;
}
function set_auth(base_url,login_url){
    $.getJSON( base_url + "/user/.json",function(data){
        $('#user').html(data['username'].concat( ' <span class="caret"></span> '));
        $("#user").append($('<img style="border-radius:80px;">').attr("src",data['gravator_url'] + "?s=40&d=mm") );
        data.csrftoken = getCookie('csrftoken')
        //source = $('#user-template').html()
        //user_template = Handlebars.compile(source);
        user_template = Handlebars.templates['tmpl-user']
        $('#profile').append(user_template(data))
        $('#user_form').hide()
        $('#view_form').show()
        $('#reset_password').click(function(){$('#pass_form').toggle(!$('#pass_form').is(':visible'));});
    })
    .fail(function() {
        var slink = login_url.concat(document.URL);
        window.location = slink
    });
}
function activaTab(tab){
    $('a[href="#' + tab + '"]').tab('show')
};
function load_task_history(url){
    $.getJSON(url, function(data){
    prevlink = data.previous;
    nextlink = data.next;
    if (prevlink == null){$('#li_prevlink').addClass("disabled");} else {$('#li_prevlink').removeClass("disabled");};
    if (nextlink == null){$('#li_nextlink').addClass("disabled");} else {$('#li_nextlink').removeClass("disabled");};
    setTaskDisplay(data);
    //source = $('#tr-template').html();
    //tr_template = Handlebars.compile(source);
    tr_template = Handlebars.templates['tmpl-tr']
    $('#result_tbody').html("")//clear table
    $.each(data.results, function(i, item) {
        temp=item.task_name.split('.')
        item['task_name']= temp[temp.length-1]
        item.timestamp = item.timestamp.substring(0,19).replace('T',' ')
        $('#result_tbody').append(tr_template(item))
    });
    });
}
function setTaskDisplay(data){
    if (data.count <= data.meta.page_size){
        $('#task_count').text('Task 1 - ' + data.count +  ' Total ' + data.count );
    }else{
        rec_start = data.meta.page_size*data.meta.page - data.meta.page_size +1;
        rec_end = "";
        if(data.meta.page_size*data.meta.page >= data.count){
            rec_end = data.count;
        }else{
            rec_end = data.meta.page_size*data.meta.page;
        }
        $('#task_count').text('Task ' + rec_start + ' - ' + rec_end  +  ' Total ' + data.count )
    }

}
function showResult(url){

  $('#modals').empty();
  task_template = Handlebars.templates['tmpl-modalAppTaskResult']
  $.getJSON(url + ".json" , function(data){
      json_data = JSON.stringify(data,null, 4);
      tmpdata = {"modal_data":json_data,"modal_name":"Task Result"}
      $('#modals').append(task_template(tmpdata))
      //$("#myModalbody").show()
      //$("#myMetadataModalbody").hide()
      //$("#myModalLabel").text("Task Result")
      //$("#myModalbody").html(json_data);
      $("#myModalbody").urlize();
      $("#myModal").modal('show');
  });
}
//Cybercommons task result showResult()
function showChildResult(url){
  $('#modals').empty();
  task_template = Handlebars.templates['tmpl-modalAppTaskResult']
  tmpdata = {"modal_name":"Task Result"}
  $('#modals').append(task_template(tmpdata))
  console.log("showChildResult");
  $('#myModalbody').empty();
  $("#myModal").modal('show');
  $("#myModalbody").html("Checking Workflow status");
  cybercom_poll(url + ".json","myModalbody");
}
//Cybercommons example submit add task.
function cybercom_submit_task(task_url,task_name,task_args,task_kwargs,html_result){
    //"cybercomq.tasks.tasks.add"
    //get and set task_data
    task_data = $.getCYBERCOM_JSON_OBJECT(task_name);
    task_data.args=task_args;
    task_data.kwargs=task_kwargs;
    //call add task and poll for status
    $.postJSON(task_url,task_data,function(data){
            cybercom_poll(data.result_url,html_result);
            load_task_history(user_task_url);
    });
}

function loadxmlLoad(url,textarea_id){
  console.log("here")
  $.ajax({
    type: "GET",
    url: url,
    cache: false,
    dataType: "xml",
    success: function(xml) {
        //console.log("success:",url,textarea_id)
        //console.log(xml);
        //before='<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:output omit-xml-declaration="yes" indent="yes"/>'
        //after = '</xsl:stylesheet>'
        var xmlText = new XMLSerializer().serializeToString(xml);

        $('#' + textarea_id).text(xmlText);
    },
  })

}

function serilize_formdata(formid){
  data=$('#geoblacklightform').serializeObject()
  data.dc_creator_sm = data.dc_creator_sm1.split('|')
  data.dc_subject_sm = data.dc_subject_sm1.split('|')
  data.dct_temporal_sm = data.dct_temporal_sm1.split('|')
  data.dct_spatial_sm =data.dct_spatial_sm1.split('|')
  geoserver_layers = JSON.parse(data.geoserver_layers);
  delete data.geoserver_layers
  delete data.dct_spatial_sm1
  delete data.dct_temporal_sm1
  delete data.dc_subject_sm1
  delete data.dc_creator_sm1
  data.dc_identifier_s = "https://geo.colorado.edu/" + geoserver_layers.name.split(':')[1]
  data.layer_slug_s = "cub:" + geoserver_layers.name.split(':')[1]
  data.solr_geom = geoserver_layers.boundbox
  data.dct_references_s = "{\"http://schema.org/downloadUrl\":\"https://geo.colorado.edu/apps/geolibrary/datasets/" + zipurl +  "\",\"http://www.opengis.net/def/serviceType/ogc/wfs\":\"https://geo.colorado.edu/geoserver/geocolorado/wfs\",\"http://www.opengis.net/def/serviceType/ogc/wms\":\"https://geo.colorado.edu/geoserver/geocolorado/wms\"}"
  data.uuid = "https://geo.colorado.edu/" + geoserver_layers.name.split(':')[1]
  data.layer_id_s = geoserver_layers.name.split(':')[1]
  data.dc_type_s = "Dataset"
  delete data.dct_type_s
  $('#modals').empty();
  task_template = Handlebars.templates['tmpl-modalAppMetadata']
  json_data = JSON.stringify(objectWithKeySorted(data),null, 4);
  tmpdata = {"modal_data":json_data,"modal_name":data.dc_title_s};
  $('#modals').append(task_template(tmpdata));
  $("#myModal").modal('show');

}
//Example general display status to console.log. Used in cybercom_poll!
//Customize tomake success, fail, and pending functions. This is general status function!
function general_status(data,html_result){
    //console.log(JSON.stringify(data.result,null, 4));

    if (data.result.hasOwnProperty('geoblacklightschema')){
      urlxmlfgdc=""
      if (data.result.xml.urls.length>0){
        urlxmlfgdc=data.result.xml.urls[0]
      }
      if (data.result.hasOwnProperty('zipurl')){
          zipurl = data.result.zipurl
        }
      console.log(zipurl);
      jsonData = data.result.geoblacklightschema;
      $('#dropzone').hide()
      url="https://geo.colorado.edu/geoserver/rest/workspaces/geocolorado/datastores.json"
      //$.getJSON(url,function(data){
      //  alert(JSON.stringify(data,null,indent=4));
        //geoserver/rest/workspaces/geocolorado/datastores/Boulder_Co_Tracts/featuretypes/Boulder_Co_Tracts.json
        geolibrary_tmpl = Handlebars.templates['tmpl-geolibrary-new']
        geoschema = data.result.geoblacklightschema
        geoschema.dc_creator_sm1 = geoschema.dc_creator_sm.join('|')
        geoschema.dc_subject_sm1 = geoschema.dc_subject_sm.join('|')
        geoschema.dct_temporal_sm1 = geoschema.dct_temporal_sm.join('|')
        geoschema.dct_spatial_sm1 =geoschema.dct_spatial_sm.join('|')
        $('#home').append(geolibrary_tmpl({"data":geoschema,"urlxmlfgdc":urlxmlfgdc}))
        console.log("xmlurl: ", urlxmlfgdc);
        loadxmlLoad(urlxmlfgdc,"xmlfilexml");
        $('#getblight').click(function(){serilize_formdata("geoblacklightform");});
        //get geoserver data
        postdata = $.getCYBERCOM_JSON_OBJECT("geoblacklightq.tasks.geoserver.geoserverGetWorkspaceMetadata");
        taskurl='/api/queue/run/geoblacklightq.tasks.geoserver.geoserverGetWorkspaceMetadata/';
        //(url, data, callback,fail)
        $.postJSON(taskurl,postdata,loadGeoServerMetadata)
      //})
    }
    if (data.result.hasOwnProperty('children')){
      //console.log('childrenresult')
      children_poll(data.result.children,html_result)
    } else if ( data.hasOwnProperty('children') ){
      //console.log('children');
      children_poll(data.children,html_result);
    }
    $('#' + html_result).append(JSON.stringify(data.result,null, 4));
}
function children_poll(children,html_result){
  if (children.length>0){
      //console.log('children yes [[[]]]')
      url =base_url + "/queue/task/" + children[0][0][0] + "/.json";
      //console.log(url);
      cybercom_poll(url,html_result);
  }
}
function general_wait(data,html_result){
  $('#' + html_result).append(JSON.stringify(data.result,null, 4));
}
function check_status(data){
  if (data.hasOwnProperty('status')){
    return data.status
  } else if ( data.result.hasOwnProperty('status') ){
    return data.result.status;
  }
}
//Cybercommons polling task status
function cybercom_poll(url,html_result){
    //console.log(url,html_result);
    $.getJSON( url , function(data) {
            //console.log("Result: ",data);
            status = check_status(data);
            if (status=="PENDING"){
                //cybercom_pending used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                general_wait(data,html_result);
                //Set timeout to 3 seconds
                setTimeout(function() { cybercom_poll(url,html_result); }, 3000);
            };
            if (status=="SUCCESS"){
                //cybercom_success used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                //          $('#task_result').urlize();
                general_status(data,html_result);
            };
            if (status=="FAILURE"){
                //cybercom_fail used to adjust html items to allow user response
                //Example: $('#task_result').empty();$('#task_result').append("<pre>" + JSON.stringify(data.result,null, 4) + "</pre>");
                general_wait(data,html_result);
            };
       });
}
//Default JSON object to submit to cybercommons api task queue
$.getCYBERCOM_JSON_OBJECT = function(task_name){
    return {"function": task_name,"queue": "celery","args":[],"kwargs":{},"tags":[]};
}
//postJSON is custom call for post to cybercommons api
$.postJSON = function(url, data, callback,fail) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback,
        'error':fail,
        'beforeSend':function(xhr, settings){
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    });
}

function objectWithKeySorted(object) {
  var result = {};
  _.forEach(Object.keys(object).sort(), function(key) {
    result[key] = object[key];
  });
  return result;
}
//Used to serialize form object to get form data
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}
//add links to http and https items
jQuery.fn.urlize = function() {
    if (this.length > 0) {
        this.each(function(i, obj){
            // making links active
            var x = $(obj).html();
            var list = x.match( /\b(http:\/\/|www\.|http:\/\/www\.)[^ <]{2,200}\b/g );
            if (list) {
                for ( i = 0; i < list.length; i++ ) {
                    var prot = list[i].indexOf('http://') === 0 || list[i].indexOf('https://') === 0 ? '' : 'http://';
                    x = x.replace( list[i], "<a target='_blank' href='" + prot + list[i] + "'>"+ list[i] + "</a>" );
                }

            }
            $(obj).html(x);
        });
    }
};
//get cookie Value
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
