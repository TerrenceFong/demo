(function() {
	var datepicker = {}

	datepicker.getMonthData = function(year, month) {
		var ret = []
		
		if (!year || !month) {
			var today = new Date()
			year = today.getFullYear()
			month = today.getMonth() + 1
		}

		// 获取当月（1-31）
		var firstDay = new Date(year, month - 1, 1)
		console.log('firstDay', firstDay)
		// 当月第一天（0-6）
		var firstDayWeekDay = firstDay.getDay()
		console.log('firstDayWeekDay', firstDayWeekDay)
		// if (firstDayWeekDay === 0) firstDayWeekDay = 7

		year = firstDay.getFullYear()
		console.log('year', year)
		month = firstDay.getMonth() + 1
		console.log('month', month)

		// 上一个月的最后一天（1-31）
		// new Date(year, month, 0)  =>  越界自动退位，变成上一个月
		// 下一个月的第0天 => 上一个月的最后一天
		var lastDayOfLastMonth = new Date(year, month - 1, 0)
		console.log('lastDayOfLastMonth', lastDayOfLastMonth)
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate()
		console.log('lastDateOfLastMonth', lastDateOfLastMonth)

		// 计算当月的面板有几天是上一个月的
		// eg: 28, 29, 30, 31, 1, 2, 3
		var preMonthDayCount = firstDayWeekDay
		console.log('preMonthDayCount', preMonthDayCount)
		// var preMonthDayCount = firstDayWeekDay - 1

		// 获取当月的最后一天（1-31）
		// new Date(year, month, 0)  =>  越界自动退位，变成上一个月
		// 下一个月的第0天 => 上一个月的最后一天
		var lastDay = new Date(year, month, 0)
		console.log('lastDay', lastDay)
		var lastDate = lastDay.getDate()
		console.log('lastDate', lastDate)

		for (var i = 0; i < 7 * 6; i++) {
			var date = i + 1 - preMonthDayCount
			var showDate = date
			var thisMonth = month
			if (date <= 0) {
				// 上一月
				thisMonth = month - 1
				showDate = lastDateOfLastMonth + date
			} else if (date > lastDate) {
				// 下一月
				thisMonth = month + 1
				showDate = showDate - lastDate
			}

			if (thisMonth === 0) thisMonth = 12
			if (thisMonth === 13) thisMonth = 1

			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			})
		}

		return {
			year: year,
			month: month,
			days: ret
		}
	}

	window.datepicker = datepicker
})();