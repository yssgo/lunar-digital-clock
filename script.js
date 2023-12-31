// http://blog.kurien.co.kr/516 댓글에서 소개한
// http://onfaf.tistory.com/87 에서 얻은 소스
'use strict';
function mkint(d) {
  return parseInt(d);
}
function mkstr(x){
  return ""+x;
}
function mknum(x){
  return x*1;
}
let zpad = (d,wid) => mkstr(d).padStart(wid,'0');
/////////////////////////////////////////////////////////////////////////////////////////////////////
// 양/음력 만년달력에 관한 소스입니다.
// by Albeniz

// 1881-2050년까지의 음력 데이터
let LunarTable = new Array(
    "1212122322121", "1212121221220", "1121121222120", "2112132122122", "2112112121220",
    "2121211212120", "2212321121212", "2122121121210", "2122121212120", "1232122121212",
    "1212121221220", "1121123221222", "1121121212220", "1212112121220", "2121231212121",
    "2221211212120", "1221212121210", "2123221212121", "2121212212120", "1211212232212",
    "1211212122210", "2121121212220", "1212132112212", "2212112112210", "2212211212120",
    "1221412121212", "1212122121210", "2112212122120", "1231212122212", "1211212122210",
    "2121123122122", "2121121122120", "2212112112120", "2212231212112", "2122121212120",
    "1212122121210", "2132122122121", "2112121222120", "1211212322122", "1211211221220",
    "2121121121220", "2122132112122", "1221212121120", "2121221212110", "2122321221212",
    "1121212212210", "2112121221220", "1231211221222", "1211211212220", "1221123121221",
    "2221121121210", "2221212112120", "1221241212112", "1212212212120", "1121212212210",
    "2114121212221", "2112112122210", "2211211412212", "2211211212120", "2212121121210",
    "2212214112121", "2122122121120", "1212122122120", "1121412122122", "1121121222120",
    "2112112122120", "2231211212122", "2121211212120", "2212121321212", "2122121121210",
    "2122121212120", "1212142121212", "1211221221220", "1121121221220", "2114112121222",
    "1212112121220", "2121211232122", "1221211212120", "1221212121210", "2121223212121",
    "2121212212120", "1211212212210", "2121321212221", "2121121212220", "1212112112210",
    "2223211211221", "2212211212120", "1221212321212", "1212122121210", "2112212122120",
    "1211232122212", "1211212122210", "2121121122210", "2212312112212", "2212112112120",
    "2212121232112", "2122121212110", "2212122121210", "2112124122121", "2112121221220",
    "1211211221220", "2121321122122", "2121121121220", "2122112112322", "1221212112120",
    "1221221212110", "2122123221212", "1121212212210", "2112121221220", "1211231212222",
    "1211211212220", "1221121121220", "1223212112121", "2221212112120", "1221221232112",
    "1212212122120", "1121212212210", "2112132212221", "2112112122210", "2211211212210",
    "2221321121212", "2212121121210", "2212212112120", "1232212122112", "1212122122120",
    "1121212322122", "1121121222120", "2112112122120", "2211231212122", "2121211212120",
    "2122121121210", "2124212112121", "2122121212120", "1212121223212", "1211212221220",
    "1121121221220", "2112132121222", "1212112121220", "2121211212120", "2122321121212",
    "1221212121210", "2121221212120", "1232121221212", "1211212212210", "2121123212221",
    "2121121212220", "1212112112220", "1221231211221", "2212211211220", "1212212121210",
    "2123212212121", "2112122122120", "1211212322212", "1211212122210", "2121121122120",
    "2212114112122", "2212112112120", "2212121211210", "2212232121211", "2122122121210",
    "2112122122120", "1231212122212", "1211211221220", "2121121321222", "2121121121220",
    "2122112112120", "2122141211212", "1221221212110", "2121221221210", "2114121221221");

// 양력 각달의 일수를 저장한 배열
let MonthTable = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

// 현재 페이지에 Display될 날짜에 관한 변수
// let currentDate = new Date();
// currentDate는 yinyangcal.js로 옮겼음

//음력 날짜 형식 객체 선언. JavaScript기본 날짜형식에서 윤달이라는 속성을 추가.
function MakeLunarDate() {
  this.year = 1;
  this.month = 0;
  this.day = 1;
  this.isYunMonth = false;
}

//해당 음력년도의 전체 날짜를 반환하는 함수
function nDaysYear(year) {
  let i,
  sum;
  
  sum = 0;
  for (i = 0; i < 13; i++) {
    // 0이면 그 해에 없는 달/
    if (0 != mkint(LunarTable[year - 1881].charAt(i))) {
      sum += 29 + (mkint(LunarTable[year - 1881].charAt(i)) + 1) % 2;
    }
  }
  
  return sum;
}

//해당 음력 월의 날짜수를 반환하는 함수
function nDaysMonth(lunar_date, solar_year) {
  let nDays;
  if (lunar_date.year - 1881 < 0 || lunar_date.year - 1881 > LunarTable.length - 1) {
    return 0;
  }
  let yun;
  if (lunar_date.month <= YunMonth(lunar_date.year) && !lunar_date.isYunMonth)
    yun = 0;
  else
    yun = 1;
  
  nDays = 29 + (mkint(LunarTable[lunar_date.year - 1881].charAt(lunar_date.month + yun)) + 1) % 2;
  
  return nDays;
}

// 해당 음력년도의 윤달넘버를 반환. 윤달이 없으면 12를 반환
function YunMonth(year) {
  let yun;
  if ((year < 1881) || (year >= 2051)) {
    return 12;
  }
  yun = 0;
  do {
    if (LunarTable[year - 1881].charAt(yun) > 2) {
      break;
    }
    yun++;
  } while (yun <= 12);
  
  return yun - 1;
}

// 서기 1년 1월 1일 이후 지난 날짜수를 반환
function totalDays(solar_date) {
  let i,
  sum,
  tdays,
  nYears366;
  let soly = solar_date.getFullYear();
  if (((soly % 4 == 0) && (soly % 100 != 0)) || (soly % 400 == 0))
    MonthTable[1] = 29;
  else
    MonthTable[1] = 28;
  
  sum = 0;
  let solm = solar_date.getMonth();
  for (i = 0; i < solm; i++) {
    sum = sum + MonthTable[i];
  }
  
  nYears366 = mkint((soly - 1) / 4) - mkint((soly - 1) / 100) + mkint((soly - 1) / 400);
  
  let sold = solar_date.getDate();
  tdays = (soly - 1) * 365 + sum + nYears366 + sold - 1;
  
  return tdays;
}

// 양력날짜를 음력데이터형식의 날짜로 반환
function SolarToLunar(solar_date) {
  let i,
  nDays,
  tmp;
  let FIRST_DAY; // 서기 1년 1월 1일부터 음력 1881년 1월 1일까지 총 지난 날짜에 관한 변수
  
  FIRST_DAY = 686685;
  nDays = totalDays(solar_date) - FIRST_DAY; //음력 1881년 1월 1일 이후 지난 날짜
  
  let lunar_date = new MakeLunarDate(); // 반환할 음력 날짜를 선언. 음력 첫날로 초기화
  lunar_date.year = 1881;
  lunar_date.month = 0;
  lunar_date.day = 1;
  lunar_date.isYunMonth = false;
  
  // nDays가 0보다 작아질때 까지, 각년도의 총 날짜수를 빼는 걸 반복해 그 루프횟수로서 현재 년도를 계산.
  // 이 루프가 종료됨과 동시에 음력데이터의 year속성은 현재 년도가 저장되게 된다.
  do {
    tmp = nDays;
    nDays -= nDaysYear(lunar_date.year, solar_date.getFullYear());
    if (nDays < 0) {
      nDays = tmp;
      break;
    }
    lunar_date.year++;
  } while (true);
  
  // 1년총날짜 이하로 작아지 nDays를 마찬가지로 월 단위로 빼는걸 반복해 현재 월을 계산.
  // 만약에 다음루프에서 윤달이면 월을 증가시키는게 아니라 윤달 속성만 true로 설정.
  do {
    tmp = nDays;
    nDays -= nDaysMonth(lunar_date);
    if (nDays < 0) {
      nDays = tmp;
      break;
    }
    
    if (lunar_date.month == YunMonth(lunar_date.year) && !lunar_date.isYunMonth) {
      lunar_date.isYunMonth = true;
    } else {
      lunar_date.month++;
      lunar_date.isYunMonth = false;
    }
  } while (true);
  
  // 마지막으로 월단위 날짜수 이하로 작아진 nDays를 이용해 날짜를 계산
  lunar_date.day = nDays + 1;
  
  return lunar_date;
}
/** END of lunar.js */


function make_lunar_date_string(solar_date) {
  let lunar_date = SolarToLunar(solar_date);
  let solar_year = solar_date.getFullYear();
  let solar_day = solar_date.getDate();
  let solar_month = solar_date.getMonth();
  let result = "";
  // 음력 표기 범위를 벗어난 년도에 관한 예외처리. 양력 데이터만 출력한다.
  if ((solar_year >= 1881) && (solar_year < 2051)) {
    result += "음력 " + lunar_date.year + "." ;    
    result += (lunar_date.month + 1) + "/";
    result += lunar_date.day;
    if (lunar_date.isYunMonth){
        result += '(윤달)';
    }
  }
  return result;
}
function show_lunar_time() {
  let lunar_div = document.getElementById("LunarDiv");
  let solar_date = new Date();
  let lunar_string = make_lunar_date_string(solar_date);
  
  let solar_div = document.getElementById("solarDiv");
  let solar_span = document.createElement('span');
  let solar_string = solar_date.getFullYear() + ".";
  solar_string += (solar_date.getMonth() + 1) + "/"
  solar_string += solar_date.getDate();
  solar_string += " " + "일월화수목금토".charAt(solar_date.getDay());
  
  solar_span.setAttribute('id', "solar_span");
  solar_span.innerHTML = solar_string;
  solar_div.replaceChildren(solar_span);
  
  let lunar_span = document.createElement('span');
  lunar_span.setAttribute('id', "lunar_span");
  lunar_span.innerHTML = lunar_string;
  lunar_div.replaceChildren(lunar_span);
  
  if (lunar_string == "") {
    lunar_span.classList.remove("LunarNormal");
    lunar_span.classList.add("LunarBlank");
  } else {
    lunar_span.classList.remove("LunarBlank");
    lunar_span.classList.add("LunarBlank");
  }
  
  let time_div = document.getElementById("timeDiv");
  let time_span = document.createElement('span');
  
  let time_string = '';
  let h = solar_date.getHours();
  if (h < 12){    
    time_string += '오전';    
  } else {
    time_string += '오후';    
  }
  time_string += (h%12==0)? 12: zpad(h % 12, 2) + ":";  
  time_string += zpad(solar_date.getMinutes(),2) + ":"
  time_string += zpad(solar_date.getSeconds(), 2);
  
  time_span.setAttribute('id', "time_span");
  time_span.innerHTML = time_string;
  time_div.replaceChildren(time_span);
  
  setTimeout(show_lunar_time, 1000);
}

function body_onload() {
  show_lunar_time();
}
