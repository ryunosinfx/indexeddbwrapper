export class testUtil {
	constructor(msg) {
		this.frame = document.createElement('div');
		const titleRow = document.createElement('div');
		const title = document.createElement('h1');
		const hr = document.createElement('hr');
		title.textContent = msg;
		titleRow.appendChild(title);
		this.frame.appendChild(titleRow);
		this.frame.appendChild(hr);
		this.currentFrame = document.createElement('div');
		this.frame.appendChild(this.currentFrame);
	}
	createNewFrame() {
		const hr = document.createElement('hr');
		this.frame.appendChild(hr);
		this.currentFrame = document.createElement('div');
		this.frame.appendChild(this.currentFrame);
	}
	setTitle(titleText) {
		const title = document.createElement('h2');
		const hr = document.createElement('hr');
		title.textContent = titleText;
		this.currentFrame.appendChild(title);
		this.currentFrame.appendChild(hr);
	}
	logInfo(msg) {

	}
}