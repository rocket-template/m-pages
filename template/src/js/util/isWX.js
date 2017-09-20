/**
 * 判断是否是微信
 */

export default navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';