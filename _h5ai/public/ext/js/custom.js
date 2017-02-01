$(document).ready(function(){
	setTimeout(function(){ 
		getDiskSpace(); 
		initContextMenu();
	}, 500);
});

function getDiskSpace(){
	var freeSpace = 0;
	var totalSpace = 0;
	var usedSpace = 0;
	$.post('/_h5ai/public/ext/php/class-disk-space.php', { }, function(result) {
		result = JSON.parse(result); 
	   	freeSpace = bytesToSize(result.free); 
	   	totalSpace = bytesToSize(result.total); 
		usedSpace = totalSpace - freeSpace;

	   	var percent = Math.round(usedSpace / totalSpace * 100, 2);

	   	$("#disk-space-progress-bar").attr("aria-valuenow", percent);
	   	$("#disk-space-progress-bar").width(percent + "%");
		$("#disk-space-progress-bar").text(percent + " %");
		$("#disk-space-progress-bar-label").text("Espace utilisé: " + usedSpace + " GB / " + totalSpace + " GB (" + freeSpace + " GB restants)" );
	});
}

function bytesToSize(bytes) {
   if (bytes == 0) return 0;
   var i = 3 //Convert Bytes to GigaBytes;
   return Math.round(bytes / Math.pow(1024, i), 2);
};

function deleteFiles(target) {
	$.post('/_h5ai/public/ext/php/class-delete.php', { target: target }, function(result) {
		jsonResult = JSON.parse(result);
		if(jsonResult.deleted){
			location.reload();
		} 
	});
}

function isFile(pathname) {
    return pathname
        .split('/').pop()
        .split('.').length > 1;
}

function downloadFiles(target) {
	var params = { _action: "download", _as: "archive.zip", _type: "shell-zip", _baseHref: target, _hrefs: "" };
	
	if(isFile(target)){
		window.open(target, '_blank');
		return;
	} else {
		params._as = target.split('/')[target.split('/').length - 2] + ".zip";
	}

	var resource = "?";

    $("#downloadFormPoster").remove();
     $("<div id='downloadFormPoster' style='display: none;'><iframe name='downloadFormPosterIframe'></iframe></div>").appendTo('body');
     $("<form action='" + resource + "' target='downloadFormPosterIframe' method='post'>" +
      "<input type='hidden' name='action' value='" + params._action + "'/>" +
      "<input type='hidden' name='as' value='" + params._as + "'/>" +
      "<input type='hidden' name='type' value='" + params._type + "'/>" +
      "<input type='hidden' name='baseHref' value='" + params._baseHref + "'/>" +
      "<input type='hidden' name='hrefs' value='" + params._hrefs + "'/>" +
      "</form>")
      .appendTo("#downloadFormPoster")
      .submit();
}

function initContextMenu() {
	$.contextMenu({
        selector: '#items .item', 
        items: {
            //"newfolder": {name: "Nouveau dossier", icon: "addfolder"},
            //"newfile": {name: "Ajouter un fichier", icon: "addfile"},
            //"separateur1": "---------",
            "delete": {name: "Supprimer", icon: "delete", 
            	callback: function(key, options) {
		        	if(key == "delete"){
		    			var target = $(options.$trigger[0]).find("a").attr("href");
		        		deleteFiles(target);
		        	}
		        }
		    },
            //"rename": {name: "Renommer", icon: "rename"},
            "separateur2": "---------",
            "download": {name: "Télécharger", icon: "download", 
            	callback: function(key, options) {
		        	if(key == "download"){
		    			var target = $(options.$trigger[0]).find("a").attr("href");
		        		downloadFiles(target);
		        	}
		        }
        	}
        }
    });

}