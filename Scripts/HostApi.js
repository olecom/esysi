var HostApi = {
SessionCheck: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/SessionCheck',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
SessionCheckByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/SessionCheck',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
SessionCreate: function(UserName,Password,CompanyName)
{
    var response = $.ajax({
        data: {
            UserName:UserName,
			Password:Password,
			CompanyName:CompanyName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/SessionCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
SessionCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/SessionCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserModify: function(Id,Name,Login,Password,Role)
{
    var response = $.ajax({
        data: {
            Id:Id,
			Name:Name,
			Login:Login,
			Password:Password,
			Role:Role
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserModify',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserModifyByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserModify',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserAdd: function(Name,Login,Password,Role)
{
    var response = $.ajax({
        data: {
            Name:Name,
			Login:Login,
			Password:Password,
			Role:Role
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
UserAddByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/UserAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleAdd: function(Name)
{
    var response = $.ajax({
        data: {
            Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleAddByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleModify: function(Id,Name)
{
    var response = $.ajax({
        data: {
            Id:Id,
			Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleModify',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleModifyByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleModify',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleUserGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleUserGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RoleUserGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/RoleUserGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PrivilegeSet: function(id,idGrant,isAllow,isUser)
{
    var response = $.ajax({
        data: {
            id:id,
			idGrant:idGrant,
			isAllow:isAllow,
			isUser:isUser
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/PrivilegeSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PrivilegeSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/PrivilegeSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PrivilegeGetList: function(Id,isUser)
{
    var response = $.ajax({
        data: {
            Id:Id,
			isUser:isUser
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/PrivilegeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PrivilegeGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Auth/PrivilegeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormCreate: function(Name,ClassesIds)
{
    var response = $.ajax({
        data: {
            Name:Name,
			ClassesIds:ClassesIds
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassOfDataInputFormGetList2: function(IdDataInput)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/ClassOfDataInputFormGetList2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassOfDataInputFormGetList2ByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/ClassOfDataInputFormGetList2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassOfDataInputFormGetList: function(IdDataInput)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/ClassOfDataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassOfDataInputFormGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/ClassOfDataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordOfDataInputFormSave: function(Data,IdDataInput,IdClass,Id)
{
    var response = $.ajax({
        data: {
            Data:Data,
			IdDataInput:IdDataInput,
			IdClass:IdClass,
			Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordOfDataInputFormSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordOfDataInputFormSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordOfDataInputFormSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordDuplicate: function(IdRecord)
{
    var response = $.ajax({
        data: {
            IdRecord:IdRecord
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordDuplicateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyOfRecordGetList: function(IdRecord,IdDataInput)
{
    var response = $.ajax({
        data: {
            IdRecord:IdRecord,
			IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyOfRecordGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyOfRecordGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyOfRecordGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyOfClassGetList: function(IdClass,IdDataInput)
{
    var response = $.ajax({
        data: {
            IdClass:IdClass,
			IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyOfClassGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyOfClassGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyOfClassGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordOfDataInputFormGetList2: function(IdDataInputForm)
{
    var response = $.ajax({
        data: {
            IdDataInputForm:IdDataInputForm
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordOfDataInputFormGetList2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordOfDataInputFormGetList2ByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RecordOfDataInputFormGetList2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnModelGet2: function(IdDataInputForm)
{
    var response = $.ajax({
        data: {
            IdDataInputForm:IdDataInputForm
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnModelGet2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnModelGet2ByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnModelGet2',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormSetClass: function(IdDataInputForm,idClass,isContain)
{
    var response = $.ajax({
        data: {
            IdDataInputForm:IdDataInputForm,
			idClass:idClass,
			isContain:isContain
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormSetClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormSetClassByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormSetClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnFilterGetList: function(IdDataInput)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnFilterGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnFilterSet: function(IdDataInput,IdPropertyType,PropertyValue,PropertyTitle,PropertyFilterActive,ShowEmpty)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput,
			IdPropertyType:IdPropertyType,
			PropertyValue:PropertyValue,
			PropertyTitle:PropertyTitle,
			PropertyFilterActive:PropertyFilterActive,
			ShowEmpty:ShowEmpty
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnFilterSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnFilterSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnFilterSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnSettingGetList: function(IdDataInput)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnSettingGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnSettingGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnSettingGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnSettingSet: function(OrderIds,HiddenIds,IdDataInput)
{
    var response = $.ajax({
        data: {
            OrderIds:OrderIds,
			HiddenIds:HiddenIds,
			IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnSettingSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnSettingSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/DataInputFormColumnSettingSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RequiredFieldsOfDataInputFormGetList: function(IdDataInput)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RequiredFieldsOfDataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RequiredFieldsOfDataInputFormGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RequiredFieldsOfDataInputFormGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RequiredFieldsOfDataInputFormSet: function(IdDataInput,RequiredFieldIds,OrderFillingRecord)
{
    var response = $.ajax({
        data: {
            IdDataInput:IdDataInput,
			RequiredFieldIds:RequiredFieldIds,
			OrderFillingRecord:OrderFillingRecord
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RequiredFieldsOfDataInputFormSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RequiredFieldsOfDataInputFormSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/RequiredFieldsOfDataInputFormSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeForcedValuesGetList: function(IdDictionaryElement)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyTypeForcedValuesGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeForcedValuesGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/DataInput/PropertyTypeForcedValuesGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryModifyName: function(Id,Name)
{
    var response = $.ajax({
        data: {
            Id:Id,
			Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryModifyName',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryModifyNameByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryModifyName',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryCreate: function(Name)
{
    var response = $.ajax({
        data: {
            Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementsGetList: function(IdDictionary)
{
    var response = $.ajax({
        data: {
            IdDictionary:IdDictionary
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementsGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementsGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementsGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementGetTree: function(IdDictionary,IdDictionaryElementsSelected,PredefinedValues,DataInputFormId,RestrictionClassId,prefix)
{
    var response = $.ajax({
        data: {
            IdDictionary:IdDictionary,
			IdDictionaryElementsSelected:IdDictionaryElementsSelected,
			PredefinedValues:PredefinedValues,
			DataInputFormId:DataInputFormId,
			RestrictionClassId:RestrictionClassId,
			prefix:prefix
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementGetTreeByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioCreate: function(IdDictionaryElement,Value,IdRatioType)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement,
			Value:Value,
			IdRatioType:IdRatioType
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeAddToClass: function(IdClass,IdPropertyType)
{
    var response = $.ajax({
        data: {
            IdClass:IdClass,
			IdPropertyType:IdPropertyType
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeAddToClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeAddToClassByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeAddToClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeRemoveFromClass: function(IdClass,IdPropertyType)
{
    var response = $.ajax({
        data: {
            IdClass:IdClass,
			IdPropertyType:IdPropertyType
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeRemoveFromClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeRemoveFromClassByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeRemoveFromClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioDelete: function(IdRatio)
{
    var response = $.ajax({
        data: {
            IdRatio:IdRatio
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyGetListByClass: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyGetListByClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyGetListByClassByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyGetListByClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioGetListByDictionaryElement: function(IdDictionaryElement)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioGetListByDictionaryElement',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioGetListByDictionaryElementByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioGetListByDictionaryElement',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyGetListByRecord: function(IdRecord)
{
    var response = $.ajax({
        data: {
            IdRecord:IdRecord
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyGetListByRecord',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyGetListByRecordByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyGetListByRecord',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioEdit: function(IdRatio,Value)
{
    var response = $.ajax({
        data: {
            IdRatio:IdRatio,
			Value:Value
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioEdit',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioEditByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioEdit',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementCreate: function(IdParent,IdDictionary,Name)
{
    var response = $.ajax({
        data: {
            IdParent:IdParent,
			IdDictionary:IdDictionary,
			Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordCreate: function(IdDataInputForm,IdClass)
{
    var response = $.ajax({
        data: {
            IdDataInputForm:IdDataInputForm,
			IdClass:IdClass
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RecordCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RecordCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementsSetNewParent: function(IdDictionaryElement,IdParent)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement,
			IdParent:IdParent
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementsSetNewParent',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementsSetNewParentByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementsSetNewParent',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RecordDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RecordDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RecordDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementRename: function(IdDictionaryElement,Name)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement,
			Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementRename',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementRenameByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementRename',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeBaseGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeBaseGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeBaseGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeBaseGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeIsDictionaryGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeIsDictionaryGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeIsDictionaryGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeIsDictionaryGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeCreate: function(Name,BaseType,Alias)
{
    var response = $.ajax({
        data: {
            Name:Name,
			BaseType:BaseType,
			Alias:Alias
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeEdit: function(BaseType,Name,Id,Alias)
{
    var response = $.ajax({
        data: {
            BaseType:BaseType,
			Name:Name,
			Id:Id,
			Alias:Alias
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeEdit',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeEditByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeEdit',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassCreateByRecord: function(IdRecord,ClassName)
{
    var response = $.ajax({
        data: {
            IdRecord:IdRecord,
			ClassName:ClassName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassCreateByRecord',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassCreateByRecordByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassCreateByRecord',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassCreate: function(ClassName)
{
    var response = $.ajax({
        data: {
            ClassName:ClassName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassRename: function(Id,ClassName)
{
    var response = $.ajax({
        data: {
            Id:Id,
			ClassName:ClassName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassRename',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassRenameByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassRename',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassDelete: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ClassDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/ClassDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioSetToChild: function(IdDictionaryElement,IdRatio)
{
    var response = $.ajax({
        data: {
            IdDictionaryElement:IdDictionaryElement,
			IdRatio:IdRatio
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioSetToChild',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioSetToChildByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioSetToChild',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeDefaultValueSet: function(IdPropertyType,DefaultValue)
{
    var response = $.ajax({
        data: {
            IdPropertyType:IdPropertyType,
			DefaultValue:DefaultValue
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeDefaultValueSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
PropertyTypeDefaultValueSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/PropertyTypeDefaultValueSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementChangeOrder: function(IdRecord,UpDir)
{
    var response = $.ajax({
        data: {
            IdRecord:IdRecord,
			UpDir:UpDir
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementChangeOrder',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DictionaryElementChangeOrderByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/DictionaryElementChangeOrder',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioTypeGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioTypeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
RatioTypeGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Dictionaries/RatioTypeGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmCreateByReportBlock: function(ReportBlockId)
{
    var response = $.ajax({
        data: {
            ReportBlockId:ReportBlockId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmCreateByReportBlock',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmCreateByReportBlockByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmCreateByReportBlock',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
CellsExpressionForFlatRowBlockGetList: function(reportBlockFlatRowId,ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            reportBlockFlatRowId:reportBlockFlatRowId,
			ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/CellsExpressionForFlatRowBlockGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
CellsExpressionForFlatRowBlockGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/CellsExpressionForFlatRowBlockGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnGetList: function(DataInputFormId)
{
    var response = $.ajax({
        data: {
            DataInputFormId:DataInputFormId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/DataInputFormColumnGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
DataInputFormColumnGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/DataInputFormColumnGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockDelete: function(ReportBlockId)
{
    var response = $.ajax({
        data: {
            ReportBlockId:ReportBlockId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockColumnSave: function(ReportConfigurationId,ReportBlockId,Order,HeaderText,Alias,Expression,PostCountExpression,Sorting)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			ReportBlockId:ReportBlockId,
			Order:Order,
			HeaderText:HeaderText,
			Alias:Alias,
			Expression:Expression,
			PostCountExpression:PostCountExpression,
			Sorting:Sorting
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockColumnSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockColumnSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockColumnSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockRowSave: function(json)
{
    var response = $.ajax({
        data: {
            json:json
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockRowSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockRowSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockRowSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockGet: function(reportBlockId)
{
    var response = $.ajax({
        data: {
            reportBlockId:reportBlockId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockGetList: function(ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFlatBlockGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFlatBlockGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceAdd: function(ReportConfigurationId,DataInputFormId,FieldMain,FieldConnecting,LinkType,Order)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			DataInputFormId:DataInputFormId,
			FieldMain:FieldMain,
			FieldConnecting:FieldConnecting,
			LinkType:LinkType,
			Order:Order
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceAddByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceDelete: function(DataSourceId)
{
    var response = $.ajax({
        data: {
            DataSourceId:DataSourceId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceGetList: function(ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourceGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourceGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourcesColumnGetList: function(ReportConfigurationId,OnlyDict)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			OnlyDict:OnlyDict
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourcesColumnGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDataSourcesColumnGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDataSourcesColumnGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDelete: function(ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationBranchDuplicate: function(RootReportBlockId)
{
    var response = $.ajax({
        data: {
            RootReportBlockId:RootReportBlockId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationBranchDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationBranchDuplicateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationBranchDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDuplicate: function(ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationDuplicateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationDuplicate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationGet: function(ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationSave: function(ReportGroupId,ReportName,ReportForm,ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            ReportGroupId:ReportGroupId,
			ReportName:ReportName,
			ReportForm:ReportForm,
			ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockPutUnderReportBlock: function(ReportCrossBlockId,NewParentId)
{
    var response = $.ajax({
        data: {
            ReportCrossBlockId:ReportCrossBlockId,
			NewParentId:NewParentId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockPutUnderReportBlock',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockPutUnderReportBlockByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockPutUnderReportBlock',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockGet: function(Id)
{
    var response = $.ajax({
        data: {
            Id:Id
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockGetTree: function(ReportConfigurationId,ReportBlockAlgorithmId,ReportBlockType)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			ReportBlockAlgorithmId:ReportBlockAlgorithmId,
			ReportBlockType:ReportBlockType
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockGetTreeByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByClass: function(ReportConfigurationId,Id,ParentId,Type,Title,Value,SumAlias)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			Id:Id,
			ParentId:ParentId,
			Type:Type,
			Title:Title,
			Value:Value,
			SumAlias:SumAlias
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByClassByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByClass',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByDictionary: function(ReportConfigurationId,Id,ParentId,Type,Title,Function,Value,FilterClasses,DictionaryId,SumAlias)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			Id:Id,
			ParentId:ParentId,
			Type:Type,
			Title:Title,
			Function:Function,
			Value:Value,
			FilterClasses:FilterClasses,
			DictionaryId:DictionaryId,
			SumAlias:SumAlias
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByDictionary',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByDictionaryByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByDictionary',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockOrderChange: function(direction,idCrossReportBlock)
{
    var response = $.ajax({
        data: {
            direction:direction,
			idCrossReportBlock:idCrossReportBlock
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockOrderChange',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockOrderChangeByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockOrderChange',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByDate: function(ReportConfigurationId,Id,ParentId,Type,Title,SumAlias,AutoFilterAlias,DivideDateDelta,DivideDateMax,DivideDateMin)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			Id:Id,
			ParentId:ParentId,
			Type:Type,
			Title:Title,
			SumAlias:SumAlias,
			AutoFilterAlias:AutoFilterAlias,
			DivideDateDelta:DivideDateDelta,
			DivideDateMax:DivideDateMax,
			DivideDateMin:DivideDateMin
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByDate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByDateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSetByDate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSet: function(ReportConfigurationId,AlgorithmOwnerId,AlgorithmCalculationId,IdReportParameter,LinkReportBlockId,Id,ParentId,Type,Title,Order,Alias,DivideType,Expression,FilterExpression,DivideDateDelta,DivideDateMin,DivideDateMax,BindedFilters,PriorityExpression,Visible,TopInserting,DecreaseParent,SummExcept,FilterClasses,Koef,SummOnly)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			AlgorithmOwnerId:AlgorithmOwnerId,
			AlgorithmCalculationId:AlgorithmCalculationId,
			IdReportParameter:IdReportParameter,
			LinkReportBlockId:LinkReportBlockId,
			Id:Id,
			ParentId:ParentId,
			Type:Type,
			Title:Title,
			Order:Order,
			Alias:Alias,
			DivideType:DivideType,
			Expression:Expression,
			FilterExpression:FilterExpression,
			DivideDateDelta:DivideDateDelta,
			DivideDateMin:DivideDateMin,
			DivideDateMax:DivideDateMax,
			BindedFilters:BindedFilters,
			PriorityExpression:PriorityExpression,
			Visible:Visible,
			TopInserting:TopInserting,
			DecreaseParent:DecreaseParent,
			SummExcept:SummExcept,
			FilterClasses:FilterClasses,
			Koef:Koef,
			SummOnly:SummOnly
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockSetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockSet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockClearFromCalcucationParameters: function(ReportBlockId)
{
    var response = $.ajax({
        data: {
            ReportBlockId:ReportBlockId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockClearFromCalcucationParameters',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportCrossBlockClearFromCalcucationParametersByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportCrossBlockClearFromCalcucationParameters',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterDelete: function(ReportFilterId)
{
    var response = $.ajax({
        data: {
            ReportFilterId:ReportFilterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterExpressionSave: function(ReportConfigurationId,FilterExpression)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			FilterExpression:FilterExpression
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterExpressionSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterExpressionSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterExpressionSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterGetList: function(ReportConfigurationId,FilterType)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			FilterType:FilterType
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterSave: function(Dictionary,FilterName,FilterType,ParameterName,ReportConfigurationId)
{
    var response = $.ajax({
        data: {
            Dictionary:Dictionary,
			FilterName:FilterName,
			FilterType:FilterType,
			ParameterName:ParameterName,
			ReportConfigurationId:ReportConfigurationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportFilterSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportFilterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGet: function(reportOrderId)
{
    var response = $.ajax({
        data: {
            reportOrderId:reportOrderId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGetTree: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGetTreeByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGetTree',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGroupCreate: function(ReportGroup)
{
    var response = $.ajax({
        data: {
            ReportGroup:ReportGroup
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGroupCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGroupCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGroupCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGroupGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGroupGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportGroupGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportGroupGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderCreate: function(paramValues,reportConfigurationId,reportOrderName)
{
    var response = $.ajax({
        data: {
            paramValues:paramValues,
			reportConfigurationId:reportConfigurationId,
			reportOrderName:reportOrderName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderCreateByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderCreate',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderDelete: function(IdReportOrder)
{
    var response = $.ajax({
        data: {
            IdReportOrder:IdReportOrder
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderRefresh: function(IdReportOrder)
{
    var response = $.ajax({
        data: {
            IdReportOrder:IdReportOrder
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderRefresh',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderRefreshByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderRefresh',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportOrderGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportOrderGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterCalculatingGetList: function(ReportConfigurationId,ReportBlockAlgorithmId,IncludeFilters,IncludeAliases,ForReportBlocksId)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			ReportBlockAlgorithmId:ReportBlockAlgorithmId,
			IncludeFilters:IncludeFilters,
			IncludeAliases:IncludeAliases,
			ForReportBlocksId:ForReportBlocksId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterCalculatingGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterCalculatingGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterCalculatingGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterDelete: function(ReportParameterId)
{
    var response = $.ajax({
        data: {
            ReportParameterId:ReportParameterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterGet: function(reportParameterId)
{
    var response = $.ajax({
        data: {
            reportParameterId:reportParameterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterSave: function(Id,CalculationOrder,DictionaryId,Name,CalculationType,ReportParameterType,AggregateFunction,ArithmeticExpression,FilterExpression,Value,ReportBlockId,ReportConfigurationId,BindedFilterId,AlgorithmCalculationId)
{
    var response = $.ajax({
        data: {
            Id:Id,
			CalculationOrder:CalculationOrder,
			DictionaryId:DictionaryId,
			Name:Name,
			CalculationType:CalculationType,
			ReportParameterType:ReportParameterType,
			AggregateFunction:AggregateFunction,
			ArithmeticExpression:ArithmeticExpression,
			FilterExpression:FilterExpression,
			Value:Value,
			ReportBlockId:ReportBlockId,
			ReportConfigurationId:ReportConfigurationId,
			BindedFilterId:BindedFilterId,
			AlgorithmCalculationId:AlgorithmCalculationId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportParameterSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportParameterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterDelete: function(ReportBindedFilterId)
{
    var response = $.ajax({
        data: {
            ReportBindedFilterId:ReportBindedFilterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterGet: function(ReportBindedFilterId)
{
    var response = $.ajax({
        data: {
            ReportBindedFilterId:ReportBindedFilterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterGetByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterGet',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterSave: function(BindedFilterId,Name,Expression)
{
    var response = $.ajax({
        data: {
            BindedFilterId:BindedFilterId,
			Name:Name,
			Expression:Expression
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterParameterGetList: function(ReportBindedFilterId)
{
    var response = $.ajax({
        data: {
            ReportBindedFilterId:ReportBindedFilterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterParameterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterParameterGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterParameterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterParameterAdd: function(BindedFilterId,ReportParameterId)
{
    var response = $.ajax({
        data: {
            BindedFilterId:BindedFilterId,
			ReportParameterId:ReportParameterId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterParameterAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBindedFilterParameterAddByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBindedFilterParameterAdd',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmSave: function(ReportBlockAlgorithmId,Name)
{
    var response = $.ajax({
        data: {
            ReportBlockAlgorithmId:ReportBlockAlgorithmId,
			Name:Name
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmSaveByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmSave',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmParameterGetList: function(ReportReportBlockAlgorithmId)
{
    var response = $.ajax({
        data: {
            ReportReportBlockAlgorithmId:ReportReportBlockAlgorithmId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmParameterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmParameterGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmParameterGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmDelete: function(ReportReportBlockAlgorithmId)
{
    var response = $.ajax({
        data: {
            ReportReportBlockAlgorithmId:ReportReportBlockAlgorithmId
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportBlockAlgorithmDeleteByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportBlockAlgorithmDelete',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationAliasesGetList: function(ReportConfigurationId,PropertyTypeCode)
{
    var response = $.ajax({
        data: {
            ReportConfigurationId:ReportConfigurationId,
			PropertyTypeCode:PropertyTypeCode
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationAliasesGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
ReportConfigurationAliasesGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/Reporting/ReportConfigurationAliasesGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
SiteRegister: function(CaptchaConfirm,FirstName,LastName,Password,EMail,PhoneNumber,CompanyName)
{
    var response = $.ajax({
        data: {
            CaptchaConfirm:CaptchaConfirm,
			FirstName:FirstName,
			LastName:LastName,
			Password:Password,
			EMail:EMail,
			PhoneNumber:PhoneNumber,
			CompanyName:CompanyName
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/SiteRegister',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
SiteRegisterByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/SiteRegister',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
GetKey: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/GetKey',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
GetKeyByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/GetKey',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
MenuItemGetList: function()
{
    var response = $.ajax({
        data: {
            
        },
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/MenuItemGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
},
MenuItemGetListByObj: function(passData)
{
    var response = $.ajax({
        data: passData,
        dataType: 'json',
        type: 'POST',
        cache: false,
        url: 'http://' + config.domain + '/api/SiteManagerConfig/MenuItemGetList',
        async: false
    }).responseText;
    response = jQuery.parseJSON(response);

    if (response.Success) {
	    return response.Data;	
    } else {
	    throw response.Comment || response.Message + ' ' + response.ExceptionMessage + ' ' + response.ExceptionType + ' ' + response.StackTrace;
    }
}
};