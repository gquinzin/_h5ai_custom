$(document).ready(function(){
	setTimeout(function(){ getDiskSpace(); }, 500);
});

function getDiskSpace(){
	var freeSpace = 0;
	var totalSpace = 0;
	$.post('/_h5ai/public/ext/php/free-space-command.php', { }, function(result) { 
	   freeSpace = bytesToSize(result); 
	   $.post('/_h5ai/public/ext/php/total-space-command.php', { }, function(result) { 
		   totalSpace = bytesToSize(result); 

		   var usedSpace = totalSpace - freeSpace;

		   var percent = Math.round(usedSpace / totalSpace * 100, 2);

		   	$("#disk-space-progress-bar").attr("aria-valuenow", percent);
		   	$("#disk-space-progress-bar").width(percent + "%");
			$("#disk-space-progress-bar").text(percent + " %");
			$("#disk-space-progress-bar-label").text("Espace utilisé: " + usedSpace + " GB / " + totalSpace + " GB (" + freeSpace + " GB restants)" );
		});
	});
}

function bytesToSize(bytes) {
   if (bytes == 0) return 0;
   var i = 3 //Convert Bytes to GigaBytes;
   return Math.round(bytes / Math.pow(1024, i), 2);
};