export class TestUtil {
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
		this.time = Date.now();
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
	log(level, time, msg) {
		const row = document.createElement('div');
		row.textContent = time + ' ' + level + ' ' + msg;
		this.currentFrame.appendChild(row);
	}
	getDuration() {
		const time = Date.now();
		const duration = time - this.time;
		this.time + time;
		return time + '/' + ("00000000000" + duration)
			.substring(-10);
	}
	info(msg) {
		this.log("[INFO]", this.getDuration(), msg);
	}
	warn(msg) {
		this.log("[WARN]", this.getDuration(), msg);
	}
	error(msg) {
		this.log("[ERROR]", this.getDuration(), msg);
	}
}