const ua = navigator.userAgent.replace(/[\.0-9]+/g, 'x');
const domain = window.location;
export default {
	systemDbName: 'IDBWrapperSys',
	cacheObName: 'cacheTimes',
	dbName: 'IDBWrapper',
	ua: ua,
	domain: domain,
	keypathName: 'pk'
};
