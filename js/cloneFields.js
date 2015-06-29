//================ Function: Create DIV ==================== //
function creator(id,tabindexVal)
{
	var divHtml="<div id='attachFile"+id+"' class='clonedAttachFile'><div>"
				+"<strong>Attachment<span class='subReportLabelId'>&nbsp;"+id+"</span> </strong>"
				+"</div>";
	
	if(tabindexVal==undefined)
	{
		tabindexVal='69';
	}
	
	var tabVal=parseInt(tabindexVal)+1;
	var tabButton=parseInt(tabindexVal)+2;
	
	if (id=='1')
	{
		divHtml+="<div><input type='file' id='subReports"+id+"' tabindex='"+tabVal+"' onchange='rmvButton();' size='80' value='' name='subReports' style='padding-right:4px;'>"
				+"<input type='button' tabindex='"+tabButton+"' onclick=\"deleteDIV(\'clonedAttachFile\', \'"+id+"\');\" id='btnRemoveAttachFile"+id+"' value='Remove SubReport' class='RemoveFile BTN' style='display:none;'/>";
	}
	
	else
	{
		divHtml+="<div><input type='file' id='subReports"+id+"' tabindex='"+tabVal+"' onchange='rmvButton();' size='80' value='' name='subReports' style='padding-right:4px;'>"
				+"<input type='button' tabindex='"+tabButton+"' onclick=\"deleteDIV(\'clonedAttachFile\', \'"+id+"\');\" id='btnRemoveAttachFile"+id+"' value='Remove SubReport' class='RemoveFile BTN'/>";
	}
				
	divHtml+="</div></div>";
				
	return divHtml;
}



//================ Function: Clone DIV ==================== //
function cloneDIV (clonedFormDiv, buttonClass)
{
	var currentNum = $('.'+clonedFormDiv).length;
	var newNum  = currentNum + 1;
	
	if(newNum>=1)
	{
		var tabindexVal=$("#btnRemoveAttachFile"+currentNum).attr("tabindex");
		$('#btnAdd').val('Add another SubReport');
	}
	
	$("fieldset .List").append(creator(newNum,tabindexVal));
	
	if(newNum==50){
		$('#btnAdd').attr('disabled','disabled').css('opacity','0.5');
	}
}

//================ Function: Enable/Disable Button==================== //
function rmvButton(){
	//console.log($('#subReports1').val());
	//console.log($('#btnRemoveattachFile1'));
	if($('#subReports1').val()!='')
	{
		$('#btnRemoveAttachFile1').removeAttr('style');
		$('#btnRemoveAttachFile1').css('display','inline');
	}
}

//================ Function: deleteDIV ==================== //

function deleteDIV (clonedFormDiv,currentID)
{
	var attrSpecialName=$('#attachFile'+currentID).attr('id'); //take the "id" where the div has the class clonedFormDiv

	var attrName=escapeStr(attrSpecialName); //take the id without special characters and nums (i.e. idName[0])
	
	$('#'+attrName+currentID).remove();
	
	var i=1;
	
	var tabindexVal=70;
	
	$('.'+clonedFormDiv).each(function(){
	
		var attrSpecialId=$(this).attr('id');
			
		var attrId=escapeStr(attrSpecialId);
					
		$(this).attr('id',attrId+i);
					
		$(this).find('.subReportLabelId').each (function(){
			$(this).html('&nbsp;'+i);
		});		
		
		$(this).find('input[type="file"]').each (function(){
			
			var attrSpecialId=$(this).attr('id');
				
			var attrId=escapeStr(attrSpecialId);
				
			$(this).attr('id',attrId+i);
				
			var attrSpecialNameAttr=$(this).attr('name');
				
			var attrNameAttr=escapeStr(attrSpecialNameAttr);
				
			$(this).attr('name',attrNameAttr);
			
			var attrSpecialNameAttr=$(this).attr('tabindex');
				
			var attrNameAttr=escapeStr(attrSpecialNameAttr);
				
			$(this).attr('tabindex',tabindexVal);

		});
		
		$(this).find('input[type="button"]').each (function(){
		
			tabindexVal++;
			
			if(i==1)
				{
					if($('#subReports1').val()=='')
					{
						$(this).before('<input id="btnRemoveAttachFile'+i+'" tabindex="'+tabindexVal+'" class="RemoveFile BTN" type="button" onclick="deleteDIV(\'clonedAttachFile\',\''+i+'\');" value="Remove SubReport" style="display:none;"/>');
						$(this).remove();
					}
					
					else
					{
						$(this).before('<input id="btnRemoveAttachFile'+i+'" tabindex="'+tabindexVal+'" class="RemoveFile BTN" type="button" onclick="deleteDIV(\'clonedAttachFile\',\''+i+'\');" value="Remove SubReport"/>');
						$(this).remove();
					}
				}
				else
				{
				
					$(this).before('<input id="btnRemoveAttachFile'+i+'" tabindex="'+tabindexVal+'" class="RemoveFile BTN" type="button" onclick="deleteDIV(\'clonedAttachFile\',\''+i+'\');"value="Remove SubReport"/>');
					$(this).remove();
				}
			
			
		});
		i=i+1;
		tabindexVal++;
	});
	
	var currentNum = $('.'+clonedFormDiv).length;
	
	if(currentNum<=1)
	{
		$('#btnAdd').val('Add SubReport');
	}
	
	if (currentNum<50)
	{
		$('#btnAdd').removeAttr('disabled').removeAttr('style');
	}
}


function escapeStr(str) {
	if (str) {
		return str.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@9^0-9])/g,'')
	} else {
		return str;
	}
}