export class MemoryUtil {
	constructor() {}
	static sizeOf(obj) {
		let bytes = 0;
		if (obj !== null && obj !== undefined) {
			switch (typeof obj) {
				case 'number':
					bytes += 8;
					break;
				case 'string':
					bytes += obj.length * 2;
					break;
				case 'boolean':
					bytes += 4;
					break;
				case 'object':
					let objClass = Object.prototype.toString.call(obj).slice(8, -1);
					if (obj.byteLength) {
						bytes += obj.byteLength;
					} else if (objClass === 'Object' || objClass === 'Array') {
						for (let key in obj) {
							if (!obj.hasOwnProperty(key)) {
								continue;
							}
							const child = obj[key];
							bytes += MemoryUtil.sizeOf(child);
						}
					} else {
						bytes += obj.toString().length * 2;
					}
					break;
				default:
					bytes += 0;
			}
		}
		return bytes;
	}
	static formatByteSize(bytes) {
		if (bytes < 1024) {
			return bytes + ' bytes';
		} else if (bytes < 1048576) {
			return (bytes / 1024).toFixed(3) + ' KiB';
		} else if (bytes < 1073741824) {
			return (bytes / 1048576).toFixed(3) + ' MiB';
		} else {
			return (bytes / 1073741824).toFixed(3) + ' GiB';
		}
	}
	static memorySizeOf(obj) {
		let bytes = MemoryUtil.sizeOf(obj);
		return MemoryUtil.formatByteSize(bytes);
	}
}
