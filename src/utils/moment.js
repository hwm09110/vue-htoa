import moment from 'moment'

moment.locale('zh-cn')

/**
 * 格式化时间戳
 * @param {时间戳，毫秒} timestamp 
 * @param {格式} format 
 */
export function formatTimestamp(timestamp, format='YYYY-MM-DD HH:mm') {
  return moment(timestamp).format(format);
}

/**
 * 
 * @param {时间戳，毫秒} timestamp 
 */
export function relativeTime(timestamp) {
  let timeStr = ''
  let now = Math.ceil(Date.now() / 1000) //当前时间戳，单位秒
  let compareTime = Math.ceil(timestamp / 1000) //比对时间戳
  let diffTime = now - compareTime

  if(diffTime < 45) {
    timeStr = "刚刚"
  }else if(diffTime > 45 && diffTime < 90) {
    timeStr = "1分钟前"
  }else if(diffTime > 90 && diffTime < 45*60){
    timeStr =  `${Math.ceil(124/60)}分钟前`
  }else if(diffTime > 45*60 && diffTime < 90*60){
    timeStr =  `1小时前`
  }else if(diffTime > 90*60 && diffTime < 22*60*60){
    timeStr =  `${Math.ceil(diffTime/60/60)}小时前`
  }else{
    timeStr = formatTimestamp(timestamp, "YYYY年MM月DD日")
  }

  return timeStr
}

export function getTodayDate( format='YYYY-MM-DD'){
  return moment().format(format);
}

export function getYearDate(){
  return moment().format('YYYY');
}
//  时间戳(毫秒) 转 为 yyyy-mm-dd
export function getTimestampToYMD(dateStr){
  return moment(dateStr).format('YYYY-MM-DD')
}

// 时间戳(秒) 返回 2019-07-29 17:30:51
export function getTimestampToYMDHMS(dateStr){
  return moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
}
// 时间戳(秒) 返回 2019-07-29 17:30
export function getTimestampToYMDHM(dateStr){
  return moment(dateStr).format('YYYY-MM-DD HH:mm');
}

// 返回 2019年07月29日 星期一
export function getTodayAndWeek(){
  return moment().format('YYYY年MM月DD日 dddd');
}

//返回一个月有多少天 date 2019-08
export function getCountDaysByMonth(date){
  var curDate = new Date(date);
  // 获取当前月份
  var curMonth = curDate.getMonth();
  // 实际月份比curMonth大1，下面将月份设置为下一个月
  curDate.setMonth(curMonth+1);
  // 将日期设置为0，表示自动计算为上个月（这里指的是当前月份）的最后一天
  curDate.setDate(0);
  // 返回当前月份的天数
  return curDate.getDate();
}

// 获取某一年的所有自然周
export function getDateWeeksOfYear(year) {
  function formatDig(num){
      return num>9?''+num:'0'+num;
  }
  function formatDate(mill){
      var y=new Date(mill);
      let raws= [
          y.getFullYear(),
          formatDig(y.getMonth()+1),
          formatDig(y.getDate()),
          // y.getDay()||7
      ];
      // let format=['年','月','日 星期'];
      let format=['-','-'];
      return String.raw({raw:raws},...format);
  }
  function* createWeeks(year){
      const ONE_DAY=24*3600*1000;
      let start=new Date(year,0,1),
          end=new Date(year,11,31);
      let firstDay=start.getDay()|| 7,
          lastDay=end.getDay()||7;
      let startTime=+start,
          endTime=startTime+(7-firstDay)*ONE_DAY,
          _endTime=end-(7-lastDay)*ONE_DAY;
      yield [startTime,endTime];
      startTime=endTime+ONE_DAY;
      endTime=endTime+7*ONE_DAY;
      while(endTime<_endTime){
          yield [startTime,endTime];
          startTime=endTime+ONE_DAY;
          endTime=endTime+7*ONE_DAY;
      }
      yield [startTime,+end];
  }

  let index=1
  let j = 1
  let nowYear = year || new Date().getFullYear()
  let weekDates = []
  for(let i of createWeeks(nowYear)){
      let start=i[0],
          end=i[1];
      // console.log(`第${formatDig(index++)}周 ${formatDate(start)} - ${formatDate(end)}`)
      let item = {
        value: j++,
        label: `第${formatDig(index++)}周 ${formatDate(start)} - ${formatDate(end)}`,
        bdate: formatDate(start),
        edate: formatDate(end),
      }
      weekDates.push(item)
  }
  // console.log(weekDates)
  return weekDates
}

// 获取某年的某天是第几周
export function getWeekNumberOfYear(year, month, date) {
  /**
    * 判断年份是否为润年
    *
    * @param {Number} year
    */
  function isLeapYear(year) {
      return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
  }
  /**
    * 获取某一年份的某一月份的天数
    *
    * @param {Number} year
    * @param {Number} month
    */
  function getMonthDays(year, month) {
      return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
  }
    /**
    * 获取某年的某天是第几周
    * @param {Number} y
    * @param {Number} m
    * @param {Number} d
    * @returns {Number}
    */
  function getWeekNumber(y, m, d) {
      var now = new Date(y, m - 1, d),
          year = now.getFullYear(),
          month = now.getMonth(),
          days = now.getDate();
      //那一天是那一年中的第多少天
      for (var i = 0; i < month; i++) {
          days += getMonthDays(year, i);
      }
  
      //那一年第一天是星期几
      var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
  
      var week = null;
      if (yearFirstDay == 1) {
          week = Math.ceil(days / yearFirstDay);
      } else {
          days -= (7 - yearFirstDay + 1);
          week = Math.ceil(days / 7) + 1;
      }
  
      return week;
  }
  
  // console.log(getWeekNumber(2019, 2, 27))
  return getWeekNumber(year, month, date)
}

// 获取某个时间戳是周几
export function getWeekOfTimestamp(timestamp){
  return moment(timestamp).format('dddd');
}

// 获取某个日期(yyyy-mm-dd)是周几- 输出 数字 '1,2,3,4'
export function getWeekNumOfTimestamp(date){
  let daTe = new Date(date),
      time = daTe.getTime(),
      str ='';  
  switch(moment(time).format('dddd')){
    case '星期一':
        str ='1';
      break;
    case '星期二':
        str ='2';
      break;
    case '星期三':
        str ='3';
      break;      
    case '星期四':
        str ='4';
      break;
    case '星期五':
        str ='5';
      break;
    case '星期六':
        str ='6';
      break;       
    case '星期日':
        str ='7';
        break;             
  }
  return str;
}

// 计算两个日期，相隔的周数 2019-07-18,2019-07-28
export function WeeksBetw(date1,date2){
  //这里的date1、date2为日期的字符串
  //将date1,date2转换为Date对象
  var _dt1=new Date(date1);
  var _dt2=new Date(date2);
  var dt1=_dt1.getTime();
  var dt2=_dt2.getTime();
  return parseInt(Math.abs(dt1- dt2)/1000/60/60/24/7);//这里是计算天数,如果想获得周数则在该返回值上再除以7
}

