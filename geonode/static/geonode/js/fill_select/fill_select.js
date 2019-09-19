var json_url = '/static/geonode/js/fill_select/metadata_list.json?format=json';
//var json_url = "https://rest-services.jrc.ec.europa.eu/services/d6biopamarest/d6biopama/get_imet_counts?format=json";

var iso3_url = 'https://rest-services.jrc.ec.europa.eu/services/h05ibex/ehabitat/get_country_list?format=json&epsg=4326&fields=iso3,name';
var countries = [];

var paSearch_url = "https://rest-services.jrc.ec.europa.eu/services/d6biopamarest/d6biopama/get_pa_search_region_iso3_name?format=json";
var paList;

var paSearch = '\
<div id="paRefId-collapse" class="collapse" style="background-color:#f8f8f8;padding:5px;">\
 <div class="card">\
      <div class="card-header">\
        <h5 class="modal-title" id="exampleModalLabel">Protected Areas WDPAID Search</h5>\
        <hr>\
      </div>\
      <div class="card-body">\
        <div class="row">\
            <label style="display:none;" for="paSearchReagion" class="col-form-label">ACP Region</label>\
            <select style="display:none;" class="form-control paSearchFilters" id="paSearchReagion">\
              <option value="">Global</option>\
              <option value="Caribbean">Caribbean</option>\
              <option value="Central America">Central America</option>\
              <option value="South America">South America</option>\
              <option value="Eastern Africa">Eastern Africa</option>\
              <option value="Middle Africa">Middle Africa</option>\
              <option value="Southern Africa">Southern Africa</option>\
              <option value="Western Africa">Western Africa</option>\
            </select>\
            <label for="paSearchCountry">Country</label>\
            <input type="text" class="form-control paSearchFilters" id="paSearchCountry" placeholder="Search a country"/>\
            <label for="paSearchName">Protected Area name</label>\
            <input type="text" class="form-control paSearchFilters" id="paSearchName" placeholder="Search by name (min 3 chars)"/>\
        </div>\
        <hr>\
        <div class="row">\
          <button id="startSearch" type="button" class="btn btn-success" >Filter</button>\
          <button id="clearSearch" type="button" class="btn btn-warning" >Clear</button>\
          <img id="spinner_pa" src="/static/geonode/img/spinner_pa.gif" style="width:50px;"/>\
        </div>\
      </div>\
      <div class="card-footer">\
        <table id="paSearchResult" class="table table-striped table-sm table-hover"><thead><tr><th>wdpaid</th><th>Name</th><th>Country</th><th>Region</th></tr></thead><tbody></tbody></table>\
      </div>\
 </div>\
</div>';

$('document').ready(function(){

  //populate iso3 country list
  $.getJSON(iso3_url, function (data) {
      $.each(data.records,function(idx, obj){
        countries.push({label:obj["name"],value:obj["iso3"]+'-'+obj["name"]});
      });
  });

  // wdpaid autofill
  pa_fill = function(elem){
    // $('.paSearch_wdpaid').on('click',function(){
      var meta = [];
      //console.log($(elem.html()));
      $($(elem)).find('div').each(function(){
        meta.push( $(this).html() );
      })
      console.log(meta);
//      $('#id_resource-paRefId').val( $(elem).html());
      $('#id_resource-paRefId').val( meta.join('|') );
//      $('#paRefId_tag').html( $(elem).html() );
      $('#paRefId_tag').html( meta.join('<br>') );
      $(window).scrollTop($('#paRefId_tag').offset().top - 200 );
      $('#paRefId_tag').effect('shake');
      $('#paRefId-collapse').collapse('toggle');
    // });
  }

  // FUNCTIOn search pa
  searchPA = function(region,iso3,name){
    $('#paSearchResult tbody').empty();
    $('#spinner_pa').show();

    if( typeof paList != 'undefined'){
      paList.clear();
    }
    $.getJSON( paSearch_url + '&a_region='+region+'&b_iso3='+iso3+'&c_name='+name,function(data){
      $.each(data.records,function(idx,obj){
        //$('#paSearchResult tbody').append('<tr><td><div class="btn btn-info paSearch_wdpaid">'+obj["wdpaid"]+'</div></td><td>'+obj["orig_name"]+'</td><th>'+obj["country_name"]+'</td><td>'+obj["intermediate_region_name"]+'</td></tr>');
        paList.row.add([
          '<button type="button" class="btn btn-info paSearch_wdpaid" onclick="pa_fill($(this));">\
          <div>'+obj["wdpaid"]+'</div>\
          <div style="display:none;">'+obj["orig_name"]+'</div>\
          <div style="display:none;">'+obj["country_name"]+'</div>\
          <div style="display:none;">'+obj["intermediate_region_name"]+'</div>\
          </button>',
          obj["orig_name"], obj["country_name"], obj["intermediate_region_name"]
        ]).draw();
      });
      $('#spinner_pa').hide();

    })
  }

  // prefill added extra metadata fields with select options from json file
  $.ajax({
      url: json_url,
      dataType: "json",
      success: function(data) {
        console.log(data);
        $.each(data.records,function(idx,obj){
          var elem_id = '#id_resource-'+obj['id'];
          var elem_sel_id = 'id_resource_select-'+obj['id'];

          //$('#id_resource-'+obj['id']).val(obj['value']);
          var select = $('<select id="'+elem_sel_id+'" class="form-control"/>');
          $.each(obj['options'],function(ix,ob){
            select.append('<option value="'+ob['value']+'">'+ob['label']+'</option>');
          });
          select.append('<option value="" >- Remove -</option>');
          select.prepend('<option value="none" disabled selected="true">- Select one -</option>');
          $(elem_id).after(select);
          var prefill = $(elem_id).val();
          if(prefill!=""){
            $('#'+elem_sel_id).val(prefill);
          }
          $(elem_id).hide();
          select.on('change mouseenter mouseleave',function(){
            $(elem_id).val($(this).val());
          });
          //alert(obj['label']+'|'+obj['value']);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
          //do some error handling
          alert(jqXHR);
          alert(textStatus);
          alert(errorThrown);
      }
  });

  // replace PA Reference ID with JSON API calling rest services to fill data with updated services Reference
  $('#id_resource-paRefId').hide();

//  $('#id_resource-paRefId').after('<button type="button" id="searchPA_API" class="btn btn-info" data-toggle="collapse" href="#paRefId-collapse">Search PA</button>');
  var wdpaid_ref = $('#id_resource-paRefId').val().split('|').join('<br>');
  $('#id_resource-paRefId').before( '<div class="btn btn-success"><i class="fa fa-leaf"> wdpaid <div id="paRefId_tag">'+wdpaid_ref+'</div></i></div><br>' );
  $('#id_resource-paRefId').after('<button type="button" id="searchPA_API" class="btn btn-info" data-toggle="collapse" href="#paRefId-collapse"><i class="fa fa-arrows-alt"></i> Search PA</button>\
  <button type="button" id="clear_pa_ref" class="btn btn-warning">x Remove PA</button>');
  if( $('#mdeditor_form').length > 0){
    $('#mdeditor_form').after(paSearch);
  }else{
    $('#clear_pa_ref').after(paSearch);
  }
  $('#paSearchResult').hide();
  $('#spinner_pa').hide();

  paList = $('#paSearchResult').DataTable({});

  $('#paSearchCountry').autocomplete({
    source: countries,
    minLength: 1,
    delay: 100
  });

  $('#startSearch').on('click',function(){
   //searchPA( $('#paSearchReagion').val(), $('#paSearchCountry').val(), $('#paSearchName').val() );
   searchPA( '', $('#paSearchCountry').val().split('-')[0], $('#paSearchName').val() );
   $('#paSearchResult').show();
  });

  $('#clearSearch').on('click',function(){
    $('#paSearchResult tbody').empty();
    $('#paSearchResult').hide();
    paList.clear();
  });

  $('#clear_pa_ref').on('click',function(){
    $('#id_resource-paRefId').val('');
    $('#paRefId_tag').html('None');
  });

  // $('#searchPA_API').on('click',function(){
  //   console.log('TODO: show popup with search filters and call rest-service API to retireve wdpaid and names matching the filters.');
  // })


});
