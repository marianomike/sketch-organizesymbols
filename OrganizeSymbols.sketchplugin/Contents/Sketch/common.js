
function alert(title, message){
	var app = [NSApplication sharedApplication];
	[app displayDialog:message withTitle:title];
}
