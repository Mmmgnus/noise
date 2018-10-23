export function Sheet(styleElement) {
	this.styleElement = styleElement;
	this.sheet = styleElement.sheet;
}

Sheet.prototype.addRule = function ({
	selector,
	rules,
	index
}) {
	var sheet = this.sheet;

	if ("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	} else if ("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
};

export function createStyleSheet () {
	var styleElement = document.createElement("style");

	// WebKit hack :(
	styleElement.appendChild(document.createTextNode(""));

	document.head.appendChild(styleElement);

	return new Sheet(styleElement);
}

export default createStyleSheet;