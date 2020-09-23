// ==这是在script里面写的，和methods是同级==
function dateFilters (value) { // 这里的value是拿到json里面的关于时间的值
  var year = 24 * 60 * 60 * 1000 * 365// 拿到一年的毫秒数
  var month = 24 * 60 * 60 * 1000 * 30// 拿到一个月的毫秒数
  var day = 24 * 60 * 60 * 1000// 拿到一天的毫秒数
  var hour = 60 * 60 * 1000// 拿到一个小时的毫秒数
  var minute = 60 * 1000// 拿到一分钟的毫秒数

   	 // getTime()   返回从 1970 年 1 月 1 日至今的毫秒数
  var newDate = new Date().getTime()// 拿到1970年1月1日距当前的时间的毫秒数
  var time = new Date(value).getTime()// 拿到json里面的关于时间的值，计算1970.1.1距json给的时间的毫秒数
  var date = newDate - time// 计算两个时间的差值

 	 // 使用三目运算
  var years = parseInt(date / year) > 0 ? `${parseInt(date / year)}年前` : '' // 两个时间的差值，除以一年的毫秒数，看整数是否大于0，如果是的话就返回,当前的整数数据，如果不是,返回空。
  var months = parseInt(date / month) > 0 ? `${parseInt(date / month)}月前` : ''// 两个时间的差值，除以一月的毫秒数，看整数是否大于0，如果是的话就返回,当前的整数数据，如果不是,返回空。
  var days = parseInt(date / day) > 0 ? `${parseInt(date / day)}天前` : ''// 两个时间的差值，除以一天的毫秒数，看整数是否大于0，如果是的话就返回,当前的整数数据，如果不是,返回空。
  var hours = parseInt(date / hour) > 0 ? `${parseInt(date / hour)}小时前` : ''// 两个时间的差值，除以一小时的毫秒数，看整数是否大于0，如果是的话就返回,当前的整数数据，如果不是,返回空。
  var minutes = parseInt(date / minute) > 0 ? `${parseInt(date / minute)}分钟前` : ''// 两个时间的差值，除以一分钟的毫秒数，看整数是否大于0，如果是的话就返回,当前的整数数据，如果不是,返回空。

  if (years.length != 0) {
     	return years
  } else if (months.length != 0) {
     	return months
  } else if (days.length != 0) {
     	return days
  } else if (hours.length != 0) {
     	return hours
  } else if (minutes.length != 0) {
     	return minutes
  } else {
     	return parseInt((date) / 1000) > 0 ? `${parseInt((date) / 1000)}秒前` : ''
  }
}

// ==在template里面是这样的==(解释一下，==item.create_at是我获取json的时间==)

// { /* <div>{{item.create_at | dateFilters}}</div> */ }
export { dateFilters }
