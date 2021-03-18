/**
 * 深拷贝数组
 * @param arr
 */
function copyArray(arr){
  return arr.map((e) => {
    if(typeof e==='object'){
      return Object.assign({},e);
    }else{
      return e;
    }
  });
}
/**
 * 深拷贝对象
 * @param object
 */
function deepCopy(obj) {
  var result = Array.isArray(obj) ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        if(obj[key] !== null){
          result[key] = deepCopy(obj[key]);   //递归复制
        }else{
          result[key] = null
        }
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
/**
 * 字符串判空
 * @param letiable
 * @returns {boolean}
 */
function isEmptyString(letiable){
  if (letiable === null || letiable === undefined || letiable === '') {
    return true;
  }
  return false;
}
/**
 * 判断对象为空
 * @returns {boolean}
 */
function isEmpty(obj){
  if (obj == undefined || obj == "" || JSON.stringify(obj) == '[]' || JSON.stringify(obj) == '{}' || obj.length == 0 || obj == "undefined") {
    return true;
  }
  return false;
}

/**
   * 设置sessionStorage
   * @param name sessionStorage的名称
   * @param content sessionStorage的值
*/
//获取sessionStorage存储数据
function getCache(name){
  if (!name) return
  return window.sessionStorage.getItem(name)
}

//设置sessionStorage存储数据
function setCache(name, content){
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    window.sessionStorage.setItem(name, content)
}

//删除sessionStorage存储数据
function removeCache(name){
    if (!name) return
    window.sessionStorage.removeItem(name)
}

/**
   * 设置cookie
   * @param name cookie的名称
   * @param value cookie的值
   * @param day cookie的过期时间/天
*/
function setCookie(name, value, day) {
  if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    let expires = day * 24 * 60 * 60 * 1000;
    let date = new Date(+new Date()+expires);
    document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
  }else{
    document.cookie = name + "=" + escape(value);
  }
}

//获取cookie
function getCookie(name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

//删除Cookie
function delCookie(name) {
  this.setCookie(name, ' ', -1);
}

/**
 * @name: tableRowClassName
 * @describe: 隔行换色
 * @msg: 
 * @param {row,rowIndex} 
 * @return: String
 */
function tableRowClassName({row, rowIndex}){
  if (rowIndex%2 == 0) {
    return 'even-row';
  }
}

/**
* @describe: URL拼接
* @param: obj
* @return: String
*/
function toUrl(obj){
  let str = '?'
  let keys = Object.keys(obj)
  keys.forEach((key,index)=>{
    if(!obj[key]){
      obj[key] = ''
    }
    if(Object.prototype.toString.call(obj[key])=='[object Array]'){
      obj[key].map(item=>{
        str+=`${key}=${item}&`
      })
    }else{
      str+=`${key}=${obj[key]}&`
    }
  })
  return str.substring(0,str.length-1)
}
/**
* @describe: 搜索后改变当前页url参数
* @param: obj
*/
function locationQuery(obj){
  let str = '?'
  let hashStr = window.location.hash.split('?')[0]
  let keys = Object.keys(obj)
  keys.forEach((key)=>{
    if(Object.prototype.toString.call(obj[key])=='[object Array]'){
      obj[key].forEach(item=>{
        str+=`${key}=${item}&`
      })
    }else{
      if(obj[key]){
        str+=`${key}=${obj[key]}&`
      }
    }
  })
  window.location.hash = hashStr + str.substring(0,str.length-1)
}
/**
* @describe: 防止页面query参数过多时判断
* @param: obj,this.$route.query
*/
function queryParameter(obj,routeQuery){
  let query = Object.keys(routeQuery)
  let query_all = obj
  query.forEach((item)=>{
    if(query_all[item]){
      query_all[item](routeQuery[item])
    }
  })
}
/**
 * @name: debounce
 * @describe: 防抖
 * @param {func:要防抖的函数,threshold:时间间隔,execAsap在时间段的开始还是结束执行函数}
 * @retuen 包装好的函数
 */
function debounce (func, threshold, execAsap) { 
  var timeout; 
  return function debounced () { 
    var obj = this, args = arguments; 
    function delayed () { 
      if (!execAsap) {
        func.apply(obj, args); 
        timeout = null; 
      }
    }
    if (timeout) {
      clearTimeout(timeout); 
    }  
    else if (execAsap) {
      func.apply(obj, args); 
      timeout = setTimeout(delayed, threshold || 100);
    } 
  }
}
//浮点数加法运算
function FloatAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  return (arg1*m+arg2*m)/m;
}

//浮点数减法运算
function FloatSub(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>r2)?r1:r2;
  return ((arg1*m-arg2*m)/m).toFixed(n);
}

//浮点数乘法运算
function FloatMul(arg1,arg2)
{
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

//浮点数除法运算
function FloatDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  r1=Number(arg1.toString().replace(".",""));
  r2=Number(arg2.toString().replace(".",""));
  return (r1/r2)*Math.pow(10,t2-t1);
}
// 小数转百分比
function toPercentage(value){
  if(value){
    let m=0,s1=value.toString(),s2='100'
    if(s1.split(".")[1]){
      m+=s1.split(".")[1].length
    }
    return Number(s1.replace(".",""))*Number(s2)/Math.pow(10,m) + '%'
  }else{
    return '0%'
  }
}
/**
 * @name: trimSearchValue
 * @param [String] 
 * @return: String
 */
const trimSearchValue = (value)=>{
  if(value){
    let val = value
    let isNull = ( str )=>{
      if ( str == "" || str == null) return true;
      let regu = "^[ ]+$";
      let re = new RegExp(regu)
      return re.test(str)
    }
    if(isNull(val)){
      return ''
    }else{
      val = val.trim()
      val = val.replace(/\+/g,"%2B")
      val = val.replace(/\s+/g,"+")
      return val
    }
  }else{
    return ''
  }
}
export default{
  copyArray,
  isEmptyString,
  isEmpty,
  getCache,
  setCache,
  removeCache,
  setCookie,
  getCookie,
  delCookie,
  deepCopy,
  tableRowClassName,
  debounce,
  toUrl,
  queryParameter,
  locationQuery,
  FloatAdd,
  FloatSub,
  FloatMul,
  FloatDiv,
  toPercentage,
  trimSearchValue
}
