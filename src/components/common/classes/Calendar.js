import moment from "moment-jalaali";

// eslint-disable-next-line import/no-anonymous-default-export
export default (year, month, day) => {
  if (year === undefined) {
    year = moment().format("jYYYY");
  }
  if (month === undefined) {
    month = moment().format("jM");
  }
  if (day === undefined) {
    day = moment().format("jD");
  }

  let selectedDay = moment(`${year}/${month}/${day}`, "jYYYY/jM/jD");

  return {
    makeMonthDays(end) {
      let array = [];
      for (var i = 0; i < end; i++) {
        array.push("1");
      }
      return array;
    },
    getDescription() {
      if (Events[year][`${month}/${day}`] !== undefined) {
        return Events[year][`${month}/${day}`];
      } else {
        return null;
      }
    },
    isHoliday() {
      if (Events[year][`${month}/${day}`] !== undefined) {
        return true;
      } else {
        return false;
      }
    },
    isRemezan() {
      let startMonthChecker = parseInt(Remezan[year][0].slice(0, 1));
      let startDayChecker = parseInt(Remezan[year][0].slice(2));
      let endMonthChecker = parseInt(Remezan[year][1].slice(0, 1));
      let endDayChecker = parseInt(Remezan[year][1].slice(2));
      if (startMonthChecker <= month && month <= endMonthChecker) {
        if (month !== startMonthChecker && month !== endMonthChecker) {
          return true;
        } else {
          if (month === startMonthChecker) {
            if (day >= startDayChecker) {
              return true;
            }
          } else {
            if (month === endMonthChecker) {
              if (day <= endDayChecker) {
                return true;
              }
            }
          }
        }
        return false;
      } else {
        return false;
      }
    },
    isPublicHoliday: () => {
      if (selectedDay.weekday() === 6) {
        return true;
      } else {
        return false;
      }
    },
    isComingDate: (date) => {
      let counter = 0;
      // eslint-disable-next-line array-callback-return
      date?.map((item) => {
        let changeData = moment(item, "YYYY/M/D");
        changeData.format("YYYY/M/D") === selectedDay.format("YYYY/M/D")
          ? (counter += 1)
          : // eslint-disable-next-line no-self-assign
            (counter = counter);
      });
      if (counter > 0) {
        return true;
      } else {
        return false;
      }
    },
    isToday: (date) => {
      let changeData = moment(date, "jYYYY-jM-jD");
      if (changeData.format("YYYY-M-D") === selectedDay.format("YYYY-M-D")) {
        return true;
      } else {
        return false;
      }
    },
    getType: (date) => {
      let counter = 0;
      let type = null;
      // eslint-disable-next-line array-callback-return
      date?.map((item) => {
        let changeData = moment(item.Date, "YYYY/M/D");
        changeData.format("YYYY/M/D") === selectedDay.format("YYYY/M/D")
          ? (type = item.UniqueType)
          : // eslint-disable-next-line no-self-assign
            (counter = counter);
      });
      if (type !== null) {
        return type;
      } else {
        return false;
      }
    },
    getDayNumber: () => {
      let selectedDay = moment(year, "jYYYY");
      selectedDay.jMonth(month);
      return selectedDay.weekday();
    },
    getFirstLastDayOfMonth() {
      moment.loadPersian({ dialect: "persian-modern" });
      let m = moment(year, "jYYYY");
      m.jMonth(month);
      let firstDayDate = parseInt(m.startOf("jWeek").format("jD"), 10);
      let endDayDate = parseInt(m.endOf("jMonth").format("jD"), 10);
      let firstDayName = m.startOf("jMonth").format("dddd");
      let endDayName = m.endOf("jMonth").format("dddd");
      let monthName = m.format("jMMMM");
      let startEnd = [
        {
          firstDay: { date: firstDayDate, name: firstDayName },
          endDay: { date: endDayDate, name: endDayName },
          month: monthName,
        },
      ];
      return startEnd;
    },
    getDayName: () => {
      let name = selectedDay.format("dddd");
      return name;
    },
    getMonthSelectedDays: (dataShows, month) => {
      return (
        dataShows
          // eslint-disable-next-line array-callback-return
          ?.map((item) => {
            moment.loadPersian({ dialect: "persian-modern" });
            let m = moment(item, "YYYY-MM-DD");
            let monthName = m.format("jMMMM");
            if (monthName === month) {
              return item;
            }
          })
          .filter((subject) => subject !== undefined)
      );
    },
    // Month: (a) => {
    //   return getMonth(a);
    // },
  };
};

// function getMonth(a) {
//   return "Jun";
// }

const Remezan = {
  1400: ["1/25", "2/22"],
  1401: ["1/13", "2/11"],
  1402: ["1/3", "1/31"],
};
const Events = {
  1401: {
    "1/1": "جشن نوروز",
    "1/2": "عید نوروز",
    "1/3": "عید نوروز",
    "1/4": "عید نوروز",
    "1/12": "روز جمهوری اسلامی ایران",
    "1/13": "جشن سیزده به در",
    "2/3": "شهادت حضرت علی علیه السلام",
    "2/13": "عید سعید فطر",
    "2/14": "تعطیل به مناسبت عید سعید فطر",
    "3/6": "شهادت امام جعفر صادق علیه السلام",
    "3/14": "رحلت حضرت امام خمینی",
    "3/15": "قیام 15 خرداد",
    "4/19": "عید سعید قربان",
    "4/27": "عید سعید غدیر خم",
    "5/16": "تاسوعای حسینی",
    "5/17": "عاشورای حسینی",
    "6/26": "اربعین حسینی",
    "7/3": "رحلت رسول اکرم؛شهادت امام حسن مجتبی علیه السلام",
    "7/5": "شهادت امام رضا علیه السلام",
    "7/13": "شهادت امام حسن عسکری علیه السلام",
    "7/22": "میلاد رسول اکرم و امام جعفر صادق علیه السلام",
    "10/6": "شهادت حضرت فاطمه زهرا سلام الله علیها",
    "11/15": "ولادت امام علی علیه السلام و روز پدر",
    "11/22": "پیروزی انقلاب اسلامی",
    "11/29": "مبعث رسول اکرم",
    "12/17": "ولادت حضرت قائم عجل الله تعالی فرجه و جشن نیمه شعبان",
    "12/19": "روز ملی شدن صنعت نفت ایران",
  },
  1402: {
    "1/1": "عید نوروز",
    "1/2": "عید نوروز",
    "1/3": "عید نوروز",
    "1/4": "عید نوروز",
    "1/12": "روز جمهوری اسلامی ایران",
    "1/13": "جشن سیزده به در",
    "1/24": "شهادت حضرت علی علیه السلام",
    "2/2": "عید سعید فطر",
    "2/3": "تعطیل به مناسبت عید سعید فطر",
    "2/26": "شهادت امام جعفر صادق علیه السلام",
    "3/14": "رحلت حضرت امام خمینی",
    "3/15": "قیام 15 خرداد",
    "4/8": "عید سعید قربان",
    "4/16": "عید سعید غدیر خم",
    "5/6": "تاسوعای حسینی",
    "5/7": "عاشورای حسینی",
    "6/15": "اربعین حسینی",
    "6/23": "رحلت رسول اکرم؛شهادت امام حسن مجتبی علیه السلام",
    "6/25": "شهادت امام رضا علیه السلام",
    "7/2": "شهادت امام حسن عسکری علیه السلام",
    "7/11": "میلاد رسول اکرم و امام جعفر صادق علیه السلام",
    "9/26": "شهادت حضرت فاطمه زهرا سلام الله علیها",
    "11/6": "ولادت امام علی علیه السلام و روز پدر",
    "11/20": "مبعث رسول اکرم",
    "11/22": "پیروزی انقلاب اسلامی",
    "12/7": "ولادت حضرت قائم عجل الله تعالی فرجه و جشن نیمه شعبان",
    "12/29": "روز ملی شدن صنعت نفت ایران",
  },
};
