export const getCurrentTimeZone = () => {
    return (Date.now()-(Date.now()/1000/60/60/24|0)*24*60*60*1000)/1000
 }