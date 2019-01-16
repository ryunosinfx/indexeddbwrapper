const ua = navigator.userAgent.replace(/[\.0-9]+/g, "x");
const domain = window.location;
export default {
	dbName: "IDBWrapper",
	ua: ua,
	domain: domain,
	keypathName: "pk"
}