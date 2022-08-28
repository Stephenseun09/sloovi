export function convertTimeToSecs(time) {
 const split = time.split(':')
 const secs = (+split[0]) * 60 * 60 + (+split[1]) * 60;
 return secs
}