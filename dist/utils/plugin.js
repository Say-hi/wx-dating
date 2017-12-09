'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*eslint-disable*/
// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if ((typeof JSON === 'undefined' ? 'undefined' : _typeof(JSON)) !== 'object') {
    JSON = {};
}(function () {
    'use strict';
    function f(n) {
        return n < 10 ? '0' + n : n;
    }if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
        };String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf();
        };
    }var cx, escapable, gap, indent, meta, rep;function quote(string) {
        escapable.lastIndex = 0;return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }function str(key, holder) {
        var i,
            k,
            v,
            length,
            mind = gap,
            partial,
            value = holder[key];if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {case 'string':
                return quote(value);case 'number':
                return isFinite(value) ? String(value) : 'null';case 'boolean':case 'null':
                return String(value);case 'object':
                if (!value) {
                    return 'null';
                }gap += indent;partial = [];if (Object.prototype.toString.apply(value) === '[object Array]') {
                    length = value.length;for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';gap = mind;return v;
                }if (rep && (typeof rep === 'undefined' ? 'undefined' : _typeof(rep)) === 'object') {
                    length = rep.length;for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === 'string') {
                            k = rep[i];v = str(k, value);if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';gap = mind;return v;}
    }if (typeof JSON.stringify !== 'function') {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta = { '\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\' };JSON.stringify = function (value, replacer, space) {
            var i;gap = '';indent = '';if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }rep = replacer;if (replacer && typeof replacer !== 'function' && ((typeof replacer === 'undefined' ? 'undefined' : _typeof(replacer)) !== 'object' || typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }return str('', { '': value });
        };
    }if (typeof JSON.parse !== 'function') {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse = function (text, reviver) {
            var j;function walk(holder, key) {
                var k,
                    v,
                    value = holder[key];if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }return reviver.call(holder, key, value);
            }text = String(text);cx.lastIndex = 0;if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');return typeof reviver === 'function' ? walk({ '': j }, '') : j;
            }throw new SyntaxError('JSON.parse');
        };
    }
})();

/*****************************************************************************
 日期资料
 *****************************************************************************/
// 农历信息
var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63);

// 公历日期
var solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");

var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
var nStr2 = new Array('初', '十', '廿', '卅', '□');
var monthName = new Array("正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月");

/*****************************************************************************
 日期计算
 *****************************************************************************/

//====================================== 返回农历 y年的总天数
function lYearDays(y) {
    var i,
        sum = 348;
    for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += lunarInfo[y - 1900] & i ? 1 : 0;
    }return sum + leapDays(y);
}

//====================================== 返回农历 y年闰月的天数
function leapDays(y) {
    if (leapMonth(y)) return lunarInfo[y - 1900] & 0x10000 ? 30 : 29;else return 0;
}

//====================================== 返回农历 y年闰哪个月 1-12 , 没闰返回 0
function leapMonth(y) {

    ///<summary>
    ///返回农历 y年闰哪个月 1-12 , 没闰返回 0
    ///</summary>


    return lunarInfo[y - 1900] & 0xf;
}

//====================================== 返回农历 y年m月的总天数
function monthDays(y, m) {
    return lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
}

//====================================== 算出农历, 传入日期控件, 返回农历日期控件
//                                       该控件属性有 .year .month .day .isLeap
function Lunar(objDate) {

    var i,
        leap = 0,
        temp = 0;
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2050 && offset > 0; i++) {
        temp = lYearDays(i);offset -= temp;
    }

    if (offset < 0) {
        offset += temp;i--;
    }

    this.year = i;

    leap = leapMonth(i); //闰哪个月
    this.isLeap = false;

    for (i = 1; i < 13 && offset > 0; i++) {
        //闰月
        if (leap > 0 && i == leap + 1 && this.isLeap == false) {
            --i;this.isLeap = true;temp = leapDays(this.year);
        } else {
            temp = monthDays(this.year, i);
        }

        //解除闰月
        if (this.isLeap == true && i == leap + 1) this.isLeap = false;

        offset -= temp;
    }

    if (offset == 0 && leap > 0 && i == leap + 1) if (this.isLeap) {
        this.isLeap = false;
    } else {
        this.isLeap = true;--i;
    }

    if (offset < 0) {
        offset += temp;--i;
    }

    this.month = i;
    this.day = offset + 1;
}

//==============================返回公历 y年某m+1月的天数
function solarDays(y, m) {
    if (m == 1) return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;else return solarMonth[m];
}
//============================== 传入 offset 返回干支, 0=甲子
function cyclical(num) {
    return Gan[num % 10] + Zhi[num % 12];
}
//============================== 阴历属性
function calElement(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay, term) {

    this.isToday = false;
    //瓣句
    this.sYear = sYear; //公元年4位数字
    this.sMonth = sMonth; //公元月数字
    this.sDay = sDay; //公元日数字
    this.week = week; //星期, 1个中文
    //农历
    this.lYear = lYear; //公元年4位数字
    this.lMonth = lMonth; //农历月数字
    this.lDay = lDay; //农历日数字
    this.isLeap = isLeap; //是否为农历闰月?
    //八字
    this.cYear = cYear; //年柱, 2个中文
    this.cMonth = cMonth; //月柱, 2个中文
    this.cDay = cDay; //日柱, 2个中文

    this.color = '';

    this.lunarFestival = ''; //农历节日
    this.solarFestival = ''; //公历节日
    this.solarTerms = term; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y, n) {
    var offDate = new Date(31556925974.7 * (y - 1900) + sTermInfo[n] * 60000 + Date.UTC(1900, 0, 6, 2, 5));
    return offDate.getUTCDate();
}

//============================== 返回阴历控件 (y年,m+1月)
/*
功能说明: 返回整个月的日期资料控件

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      返回当月最大日
OBJ.firstWeek   返回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  返回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/

function calendar(y, m) {
    var Today = new Date();
    var tY = Today.getFullYear();
    var tM = Today.getMonth();
    var tD = Today.getDate();
    var sDObj,
        lDObj,
        lY,
        lM,
        lD = 1,
        lL,
        lX = 0,
        tmp1,
        tmp2,
        tmp3,
        lM2,
        lY2,
        lD2,
        xs,
        fs,
        cs;
    var cY, cM, cD; //年柱,月柱,日柱
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;
    sDObj = new Date(y, m, 1, 0, 0, 0, 0); //当月一日日期
    this.length = solarDays(y, m); //公历当月天数
    this.firstWeek = sDObj.getDay(); //公历当月1日星期几
    ////////年柱 1900年立春后为庚子年(60进制36)
    if (m < 2) cY = cyclical(y - 1900 + 36 - 1);else cY = cyclical(y - 1900 + 36);
    var term2 = getTerm(y, 3); //立春日期
    ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
    var firstNode = getTerm(y, (m + 1) * 2 - 1); //返回当月「节」为几日开始
    cM = cyclical((y - 1900) * 12 + m + 12);
    lM2 = (y - 1900) * 12 + m + 12;
    //当月一日与 1900/1/1 相差天数
    //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
    var dayCyclical = Date.UTC(y, m, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    for (var i = 0; i < this.length; i++) {
        if (lD > lX) {
            sDObj = new Date(y, m, i + 1); //当月一日日期
            lDObj = new Lunar(sDObj); //农历
            lY = lDObj.year; //农历年
            lM = lDObj.month; //农历月
            lD = lDObj.day; //农历日
            lL = lDObj.isLeap; //农历是否闰月
            lX = lL ? leapDays(lY) : monthDays(lY, lM); //农历当月最后一天
            if (n == 0) firstLM = lM;
            lDPOS[n++] = i - lD + 1;
        }
        //依节气调整二月分的年柱, 以立春为界
        if (m == 1 && i + 1 == term2) {
            cY = cyclical(y - 1900 + 36);
            lY2 = y - 1900 + 36;
        }
        //依节气月柱, 以「节」为界
        if (i + 1 == firstNode) {
            cM = cyclical((y - 1900) * 12 + m + 13);
            lM2 = (y - 1900) * 12 + m + 13;
        }
        //日柱
        cD = cyclical(dayCyclical + i);
        lD2 = dayCyclical + i;
        //月柱 1900年1月小寒以前为 丙子月(60进制12)
        firstNode = getTerm(y, (m + 1) * 2 - 1); //返回当月「节」为几日开始
        var secondNode = getTerm(y, (m + 1) * 2); //返回当月「节」为几日开始
        //传入的日期的节气与否
        var term = '';
        if (firstNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 2];
        }
        if (secondNode === i + 1) {
            term = solarTerm[(m + 1) * 2 - 1];
        }
        this[i] = new calElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL, cY, cM, cD, term);
        if (lD2 % 10 == 0 || lD2 % 10 == 5) {
            xs = '东北';
        } else if (lD2 % 10 == 1 || lD2 % 10 == 6) {
            xs = '西北';
        } else if (lD2 % 10 == 2 || lD2 % 10 == 7) {
            xs = '西南';
        } else if (lD2 % 10 == 3 || lD2 % 10 == 8) {
            xs = '正南';
        } else if (lD2 % 10 == 4 || lD2 % 10 == 9) {
            xs = '东南';
        }
        if (lD2 % 10 == 0 || lD2 % 10 == 1) {
            fs = '东南';
        } else if (lD2 % 10 == 2 || lD2 % 10 == 3) {
            fs = '正东';
        } else if (lD2 % 10 == 4) {
            fs = '正北';
        } else if (lD2 % 10 == 5) {
            fs = '正南';
        } else if (lD2 % 10 == 6 || lD2 % 10 == 7) {
            fs = '西南';
        } else if (lD2 % 10 == 8) {
            fs = '西北';
        } else if (lD2 % 10 == 9) {
            fs = '正西';
        }
        if (lD2 % 10 == 0 || lD2 % 10 == 1) {
            cs = '东北';
        } else if (lD2 % 10 == 2 || lD2 % 10 == 3) {
            cs = '西南';
        } else if (lD2 % 10 == 4 || lD2 % 10 == 5) {
            cs = '正北';
        } else if (lD2 % 10 == 6 || lD2 % 10 == 7) {
            cs = '正东';
        } else if (lD2 % 10 == 8 || lD2 % 10 == 9) {
            cs = '正南';
        }
    }
    //节气
    // tmp1 = sTerm(y, m * 2) - 1;
    // tmp2 = sTerm(y, m * 2 + 1) - 1;
    // tmp1 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp1 + 1), tmp1);
    // tmp2 = solarTermChange(y + "-" + (m + 1) + "-" + (tmp2 + 1), tmp2);
    // this[tmp1].solarTerms = solarTerm[m * 2];
    // this[tmp2].solarTerms = solarTerm[m * 2 + 1];
    // if (m == 3) this[tmp1].color = 'red'; //清明颜色
}
/**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];
/**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
function getTerm(y, n) {
    //TermTable[(y - 1900) * 24 + n];
    if (y < 1900 || y > 2100) {
        return -1;
    }
    if (n < 1 || n > 24) {
        return -1;
    }
    var _table = sTermInfo[y - 1900];
    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
    return parseInt(_calday[n - 1]);
}
//====================== 中文日期
function cDay(d) {
    var s;

    switch (d) {
        case 10:
            s = '初十';break;
        case 20:
            s = '二十';break;
            break;
        case 30:
            s = '三十';break;
            break;
        default:
            s = nStr2[Math.floor(d / 10)];
            s += nStr1[d % 10];
    }
    return s;
}
//===================返回属相
function getPet(birthyear, lichunOffset) {
    var start = 1900,
        value = "";
    x = (birthyear - start) % 12;
    // if (x !== 0 && lichunOffset < 0) {
    //     x -= 1;
    // }
    value = Animals[x];
    return value;
}
//节气日期的调整
function solarTermChange(detailday, tem) {
    var TermChangeDayArray = {
        "2012-5-21": "20", "2012-12-6": "7", "2013-2-3": "4", "2013-7-23": "22",
        "2013-12-21": "22", "2014-3-5": "6", "2015-1-5": "6", "2017-7-23": "22",
        "2017-12-21": "22", "2018-2-18": "19", "2018-3-20": "21", "2019-2-5": "4",
        "2019-6-22": "21", "2020-7-7": "6", "2020-8-23": "22", "2020-12-6": "7"
    };

    var result;
    try {
        if (typeof TermChangeDayArray[detailday] != 'undefined') {
            result = parseInt(TermChangeDayArray[detailday], 10) - 1;
        } else {
            result = tem;
        }
    } catch (e) {
        result = tem;
    }
    return result;
}

/**
 * Yovae.com
 */
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//base64编码
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt((c1 & 0x3) << 4 | (c2 & 0xF0) >> 4);
        out += base64EncodeChars.charAt((c2 & 0xF) << 2 | (c3 & 0xC0) >> 6);
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
//base64解码
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;

        out += String.fromCharCode(c1 << 2 | (c2 & 0x30) >> 4);

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;

        out += String.fromCharCode((c2 & 0XF) << 4 | (c3 & 0x3C) >> 2);

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode((c3 & 0x03) << 6 | c4);
    }
    return out;
}
//utf-8转utf16
function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x0001 && c <= 0x007F) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | c >> 12 & 0x0F);
            out += String.fromCharCode(0x80 | c >> 6 & 0x3F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        } else {
            out += String.fromCharCode(0xC0 | c >> 6 & 0x1F);
            out += String.fromCharCode(0x80 | c >> 0 & 0x3F);
        }
    }
    return out;
}
//utf-16转utf-8
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode((c & 0x1F) << 6 | char2 & 0x3F);
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode((c & 0x0F) << 12 | (char2 & 0x3F) << 6 | (char3 & 0x3F) << 0);
                break;
        }
    }

    return out;
}

var BASE_STEMS_DATE = new Date(1899, 1, 4, 0, 0);
var BASE_STEMS_YEAR = 1899;
var mPzStemArray = ["甲不开仓财物耗散", "乙不栽植千株不长", "丙不修灶必见灾殃", "丁不剃头头必生疮", "戊不受田田主不祥", "己不破券二比并亡", "庚不经络织机虚张", "辛不合酱主人不尝", "壬不汲水更难提防", "癸不词讼理弱敌强"];

var mPzBranchArray = ["子不问卜自惹祸殃", "丑不冠带主不还乡", "寅不祭祀神鬼不尝", "卯不穿井水泉不香", "辰不哭泣必主重丧", "巳不远行财物伏藏", "午不苫盖屋主更张", "未不服药毒气入肠", "申不安床鬼祟入房", "酉不宴客醉坐颠狂", "戌不吃犬作怪上床", "亥不嫁娶不利新郎"];
var CompassUnknown = -1;
var CompassNorth = 0;
var CompassNortheast = 1;
var CompassEast = 2;
var CompassSoutheast = 3;
var CompassSouth = 4;
var CompassSouthwest = 5;
var CompassWest = 6;
var CompassNorthwest = 7;
var CompassNames = ["正北", "东北", "正东", "东南", "正南", "西南", "正西", "西北"];
var ANIMAL = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
function querySAByDay(date) {
    var hlObj = {};
    var gzDay = getStemsBranchDay(date);
    var gzMonth = getStemsBranchMonth(date.getFullYear(), dayOfYear(date) - 1);
    var gzStr = getStemsBranchDayAsString(date);
    var fields = getYJSqlFields(date);
    var yi = "-",
        ji = "-";
    if (yjData[fields[1] + "-" + fields[0]]) {
        yi = yjData[fields[1] + "-" + fields[0]].y; //宜
        ji = yjData[fields[1] + "-" + fields[0]].j; //忌
        hlObj.yi = yi;
        hlObj.ji = ji;
    }
    var dayTg = gzDay % 10;
    var dayDz = gzDay % 12;
    var pzbj = mPzStemArray[dayTg] + " " + mPzBranchArray[dayDz]; //彭祖百忌
    hlObj.pzbj = pzbj;
    var jsyq = ""; //
    var xsyj = ""; //
    var value = (gzMonth + 10) % 12 + 1;
    if (jxData[value + "-" + gzStr]) {
        jsyq = jxData[value + "-" + gzStr].JSYQ; //吉神宜趋
        xsyj = jxData[value + "-" + gzStr].XSYJ; //凶神宜忌
        hlObj.jsyq = jsyq;
        hlObj.xsyj = xsyj;
    }
    var wx = ""; //五行
    if (mWxMap[gzStr]) {
        wx = mWxMap[gzStr];
        hlObj.wx = wx;
    }
    var cs = cxInfoOfDateTime(date, -2); //冲煞
    hlObj.cs = cs;

    return hlObj;
}
function dayCountOfMonth(month, isLeap) {
    switch (month + 1) {
        case 1:
            return 31;
            break;
        case 2:
            if (!isLeap) {
                return 28;
            }
            return 29;
            break;
        case 3:
            return 31;
            break;
        case 4:
            return 30;
            break;
        case 5:
            return 31;
            break;
        case 6:
            return 30;
            break;
        case 7:
            return 31;
            break;
        case 8:
            return 31;
            break;
        case 9:
            return 30;
            break;
        case 10:
            return 31;
            break;
        case 11:
            return 30;
            break;
        case 12:
            return 31;
            break;
        default:
            break;
    }
    return 0;
}
function codeForMonthDizhi(monthDizhi) {
    var zhiCode = { "子": 11, "丑": 12, "寅": 1, "卯": 2, "辰": 3, "巳": 4, "午": 5, "未": 6, "申": 7, "酉": 8, "戌": 9, "亥": 10 };
    return zhiCode[monthDizhi];
}
function taiShenWithCode(code, tgdzDay) {
    var codeString = code + "-" + tgdzDay;
    var taishen = fetusData[codeString];
    return taishen ? taishen : "暂无";
}

function dayOfYear(date) {
    var dateArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var day = date.getDate();
    var month = date.getMonth(); //getMonth()是从0开始
    var year = date.getFullYear();
    var result = 0;
    for (var i = 0; i < month; i++) {
        result += dateArr[i];
    }
    result += day;
    //判断是否闰年
    if (month > 1 && year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
        result += 1;
    }
    return result;
}
function getStemsBranchMonth(year, dayInYear) {
    var term = findPreTerm(year, dayInYear);
    var monthOffset = Math.floor((year - BASE_STEMS_YEAR) * 12 + (term + 2) / 2 - 2);
    var t = (monthOffset + 2) % 10;
    var b = (monthOffset + 2) % 12;
    return (6 * t - 5 * b + 60) % 60;
}
function getStemsBranchDay(date) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    if (dayOffset > 0) {
        var t = parseInt((dayOffset + 9) % 10);
        var b = parseInt((dayOffset + 3) % 12);
        return (6 * t - 5 * b + 60) % 60;
    }
    return -1;
}
function getStemBranchHour(date, lunarHour) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, date);
    var dt = int((dayOffset + 9) % 10);
    var hb = lunarHour;
    var ht = (hb + (dt > 4 ? dt - 5 : dt) * 2) % 10;
    var termHour = (6 * ht - 5 * hb + 60) % 60;
    return termHour;
}
function getIntervalDays(base_date, _date) {
    _date.setHours(0);
    _date.setMinutes(0);
    _date.setSeconds(0);
    _date.setMilliseconds(0);
    return Math.floor(Math.abs(base_date - _date) / (1000 * 60 * 60 * 24));
}

var MIN = 1900; //最小年
var MAX = 2135; //最大年
function findPreTerm(year, dayInYear) {
    var index = year - MIN;
    if (index > 0 && index < TermTable.length / 24) {
        var begin = index * 24;
        return findPreTerm1(TermTable, dayInYear, begin, 24);
    }
    return -1;
}
function findPreTerm1(termTable, dayInYear, begin, len) {
    var value = new Array(24);
    for (var j = begin; j <= begin + 23; j++) {
        value[j - begin] = termTable[j];
    }
    var index = -1,
        i = 0;
    for (i = 0; i < value.length; i++) {
        if (dayInYear === value[i]) {
            index = i;
            break;
        } else if (dayInYear < value[i]) {
            index = i - 1;
            break;
        }
    }
    if (i === value.length && index === -1) {
        index = i - 1;
    }
    return index;
}
function getStemsBranchHourAsString(date, index) {
    return formatStemsBranchString(getStemBranchHour(date, index));
}
function getStemsBranchDayAsString(date) {
    return formatStemsBranchString(getStemsBranchDay(date));
}
function formatStemsBranchString(index) {
    if (index < 0) {
        return "";
    }
    return Gan[index % 10] + Zhi[index % 12];
}
function getStemsBranchMonthAsString(year, dayInYear) {
    return formatBranchMonthString(getStemsBranchMonth(year, dayInYear));
}
function formatBranchMonthString(index) {
    if (index < 0) {
        return "";
    }
    return Zhi[index % 12];
}
var JXTable = [0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB34, //甲子，乙丑，丙寅，丁卯，戊辰，己巳，庚午，辛未，壬申，癸酉
0x2DD, 0x4A3, 0xD2C, 0x34B, 0xCD2, 0xB34, 0x2C5, 0x4B2, 0xD2C, 0x34B, //甲戌，乙亥，丙子，丁丑，戊寅，己卯，庚辰，辛巳，壬午，癸未
0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34A, 0xCD2, 0xB34, 0x2CD, 0x4B3, //甲申，乙酉，丙戌，丁亥，戊子，己丑，庚寅，辛卯，壬辰，癸巳
0xD2C, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCD2, 0xB24, //甲午，乙未，丙申，丁酉，戊戌，己亥，庚子，辛丑，壬寅，癸卯
0x2CD, 0x4A3, 0xD28, 0x34B, 0xCD2, 0xB34, 0x2CD, 0x4A3, 0xD2C, 0x34B, //甲辰，乙巳，丙午，丁未，戊申，己酉，庚戌，辛亥，壬子，癸丑
0xCD2, 0xB34, 0x2CD, 0x4B3, 0xD2C, 0x34B, 0xCF2, 0xB34, 0x2CD, 0x4B3 //甲寅，乙卯，丙辰，丁巳，戊午，己未，庚申，辛酉，壬戌，癸亥
];
var JXStatusUnknown = -1;
var JXStatusJi = 0;
var JXStatusXiong = 1;
var JXNames = ["吉", "凶"];
/**
 * 计算当前时辰吉凶
 *
 * @param solar
 * @return
 */
function jixiongStatusOfDateTime(solar, hourNow) {
    var status = JXStatusUnknown;
    var stemIndex = getStemsBranchDay(solar); //[self.lunarMgr stemBranchDayOfSolarDate:solar];
    if (stemIndex > -1 && stemIndex < 60) {
        var hexValue = JXTable[stemIndex];
        var chineseHour = getLumarHourIndex(hourNow); //[datetime ylChineseNumHour];
        var moveCount = 11 - chineseHour;
        var value = hexValue >> moveCount & 0x1;
        status = value > 0 ? JXStatusJi : JXStatusXiong;
    }
    return getJXName(status);
}
function getLumarHourIndex(hour) {
    return (Math.floor(hour / 2) + hour % 2) % 12;
}
/**
 * 吉凶名称
 *
 * @param value
 * @return
 */
function getJXName(value) {
    if (value < 0 || value > JXNames.length) {
        return "";
    }
    return JXNames[value];
}
/**
 * 得到宜忌查询需要的参数
 * <p/>
 * param calendar
 * return
 */
function getYJSqlFields(calendar) {
    var field = ["-1", "-1"];
    var arr = twentyFourTermdaysOf(calendar);
    if (arr.length == 2) {
        var a = arr[0];
        var b = arr[1];
        var offsetDayCount = Math.floor(a % 2 == 0 ? a / 2 : a / 2 + 1);
        if (b > 0 && a % 2 == 0) {
            offsetDayCount += 1;
        }
        // 计算当前日期距离1901-1-1多少天
        var baseDate = new Date(1901, 0, 1); //JCalendar.createFromString("1901-01-01");
        var day = getIntervalDays(baseDate, calendar);
        field[0] = (15 + day) % 60 + "";
        field[1] = Math.floor(Math.abs((5 + day - offsetDayCount) % 12)) + "";
    }
    return field;
}
function twentyFourTermdaysOf(calendar) {
    try {
        var year = calendar.getFullYear();
        var yearOffset = year - 1900;
        var offset = dayOfYear(calendar) - 1;
        var index = 0;
        var st = 0; // 改日是否为24节气
        for (var i = 0; i < 24; i++) {
            var num = TermTable[yearOffset * 24 + i];
            if (num > offset) {
                index = i;
                st = 0;
                break;
            } else if (num == offset) {
                index = i;
                st = 1;
                break;
            }
        }
        var a = index + yearOffset * 24 - 24; // 莫日之前的节气数目
        var b = st;

        return [a, b];
    } catch (e) {
        return null;
    }
}
/**
 * 冲煞
 *
 * @param solar
 * @param lunar
 * @return
 */
function cxInfoOfDateTime(solar, lunar) {
    var branchIndex = branchIndexOfSolar(solar, lunar);
    var cindex = chongIndexOfDateTime(branchIndex);
    var sindex = shaDirectionOfDateTime(branchIndex);
    try {
        return "冲" + ANIMAL[cindex] + "煞" + CompassNames[sindex].replace("正", "");
    } catch (e) {
        return "";
    }
}
/**
 * branchIndex
 *
 * @param solar
 * @param hour  -2:ignoreTime -1:currenttime
 * @return
 */
function branchIndexOfSolar(solar, hour) {
    var branchIndex = -1;
    if (hour == -2) {
        return getBranchDay(solar);
    }
    //else if (hour == -1) {
    //    branchIndex = solar.getStemsBranchHour() % 12;
    //}
    else {
            branchIndex = getStemBranchHour(solar, hour) % 12;
        }
    return branchIndex;
}
function getBranchDay(solar) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, solar);
    if (dayOffset > 0) {
        return Math.floor((dayOffset + 3) % 12);
    }
    return 0;
}
/**
 * 获取干支计时
 *
 * @param _date
 * @param lunarHour
 * @return
 */
function getStemBranchHour(_date, lunarHour) {
    var dayOffset = getIntervalDays(BASE_STEMS_DATE, _date);
    var dt = parseInt((dayOffset + 9) % 10);
    var hb = lunarHour;
    var ht = (hb + (dt > 4 ? dt - 5 : dt) * 2) % 10;
    var termHour = (6 * ht - 5 * hb + 60) % 60;
    return termHour;
}
/*
 子午相冲，丑未相冲，寅申相冲，辰戌相冲，巳亥相冲，卯酉相冲
 */
function chongIndexOfDateTime(branchIndex) {
    var value = -1;
    switch (branchIndex) {
        case 0:
            value = 6;
            break;
        case 1:
            value = 7;
            break;
        case 2:
            value = 8;
            break;
        case 3:
            value = 9;
            break;
        case 4:
            value = 10;
            break;
        case 5:
            value = 11;
            break;
        case 6:
            value = 0;
            break;
        case 7:
            value = 1;
            break;
        case 8:
            value = 2;
            break;
        case 9:
            value = 3;
            break;
        case 10:
            value = 4;
            break;
        case 11:
            value = 5;
            break;
        default:
            break;
    }
    return value;
}
/*
 逢巳日、酉日、丑日必是“煞东”；亥日、卯日、未日必“煞西”；申日、子日、辰日必“煞南”；寅日、午日、戌日必“煞北”
 */
function shaDirectionOfDateTime(branchIndex) {
    var value = CompassUnknown;
    switch (branchIndex) {
        case 0: //子
        case 4: //辰
        case 8:
            //申
            value = CompassSouth;
            break;
        case 1: //丑
        case 5: //巳
        case 9:
            //酉
            value = CompassEast;
            break;
        case 2: //寅
        case 6: //午
        case 10:
            //戌
            value = CompassNorth;
            break;
        case 3: //卯
        case 7: //未
        case 11:
            //亥
            value = CompassWest;
            break;
        default:
            break;
    }
    return value;
}
var mWxMap = {
    "甲子": "海中金",
    "乙丑": "海中金",
    "丙寅": "炉中火",
    "丁卯": "炉中火",
    "戊辰": "大林木",
    "己巳": "大林木",
    "庚午": "路旁土",
    "辛未": "路旁土",
    "壬申": "剑锋金",
    "癸酉": "剑锋金",
    "甲戌": "山头火",
    "乙亥": "山头火",
    "丙子": "涧下水",
    "丁丑": "涧下水",
    "戊寅": "城头土",
    "己卯": "城头土",
    "庚辰": "白腊金",
    "辛巳": "白腊金",
    "壬午": "杨柳木",
    "癸未": "杨柳木",
    "甲申": "泉中水",
    "乙酉": "泉中水",
    "丙戌": "屋上土",
    "丁亥": "屋上土",
    "戊子": "霹雳火",
    "己丑": "霹雳火",
    "庚寅": "松柏木",
    "辛卯": "松柏木",
    "壬辰": "长流水",
    "癸巳": "长流水",
    "甲午": "沙中金",
    "乙未": "沙中金",
    "丙申": "山下火",
    "丁酉": "山下火",
    "戊戌": "平地木",
    "己亥": "平地木",
    "庚子": "壁上土",
    "辛丑": "壁上土",
    "壬寅": "金箔金",
    "癸卯": "金箔金",
    "甲辰": "覆灯火",
    "乙巳": "覆灯火",
    "丙午": "天河水",
    "丁未": "天河水",
    "戊申": "大驿土",
    "己酉": "大驿土",
    "庚戌": "钗钏金",
    "辛亥": "钗钏金",
    "壬子": "桑拓木",
    "癸丑": "桑拓木",
    "甲寅": "大溪水",
    "乙卯": "大溪水",
    "丙辰": "沙中土",
    "丁巳": "沙中土",
    "戊午": "天上火",
    "己未": "天上火",
    "庚申": "石榴木",
    "辛酉": "石榴木",
    "壬戌": "大海水",
    "癸亥": "大海水"
};
var TermTable = [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1900
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1901
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1902
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1903
6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356, //1904
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1905
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1906
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1907
6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 327, 341, 356, //1908
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1909
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1910
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1911
6, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 282, 297, 312, 326, 341, 356, //1912
5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1913
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1914
5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1915
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1916
5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1917
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1918
5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1919
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1920
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1921
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1922
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1923
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 297, 312, 326, 341, 356, //1924
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1925
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1926
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1927
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 173, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1928
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1929
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1930
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1931
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1932
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1933
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1934
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1935
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1936
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1937
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1938
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1939
5, 20, 35, 50, 65, 80, 95, 110, 126, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1940
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1941
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1942
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1943
5, 20, 35, 50, 65, 80, 95, 110, 125, 141, 157, 172, 188, 204, 220, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1944
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1945
5, 19, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1946
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1947
5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1948
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1949
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1950
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1951
5, 20, 35, 50, 64, 80, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1952
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1953
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1954
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1955
5, 20, 35, 50, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 251, 266, 281, 296, 311, 326, 341, 356, //1956
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1957
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1958
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1959
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1960
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1961
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1962
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1963
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 157, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1964
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1965
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1966
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1967
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1968
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1969
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1970
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1971
5, 20, 35, 49, 64, 79, 95, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1972
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1973
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1974
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1975
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1976
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1977
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //1978
5, 19, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1979
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 204, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1980
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1981
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1982
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //1983
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //1984
4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1985
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1986
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 340, 355, //1987
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1988
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1989
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //1990
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1991
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1992
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1993
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1994
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1995
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //1996
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //1997
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //1998
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //1999
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2000
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2001
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2002
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2003
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2004
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2005
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2006
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2007
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2008
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2009
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2010
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2011
5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2012
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2013
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2014
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2015
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2016
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2017
4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2018
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2019
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2020
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2021
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2022
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2023
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2024
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2025
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2026
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2027
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2028
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2029
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2030
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2031
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2032
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2033
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2034
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2035
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2036
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2037
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2038
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2039
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2040
4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2041
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2042
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2043
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2044
4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2045
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2046
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2047
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2048
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2049
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2050
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2051
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2052
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2053
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2054
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2055
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2056
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2057
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2058
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2059
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2060
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2061
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2062
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2063
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2064
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2065
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2066
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2067
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2068
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2069
4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2070
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2071
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2072
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354, //2073
4, 19, 33, 48, 63, 78, 93, 109, 124, 139, 155, 171, 187, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2074
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2075
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2076
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 279, 295, 310, 325, 339, 354, //2077
4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 234, 249, 264, 280, 295, 310, 325, 340, 354, //2078
4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2079
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2080
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2081
4, 19, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2082
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2083
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2084
3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2085
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 340, 354, //2086
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2087
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2088
3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 295, 310, 324, 339, 354, //2089
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2090
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2091
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2092
3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 218, 233, 249, 264, 279, 294, 309, 324, 339, 354, //2093
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2094
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2095
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2096
3, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 170, 186, 202, 217, 233, 249, 264, 279, 294, 309, 324, 339, 354, //2097
4, 18, 33, 48, 63, 78, 93, 108, 124, 139, 155, 171, 186, 202, 218, 233, 249, 264, 280, 295, 310, 325, 339, 354, //2098
4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354, //2099
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2100
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2101
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2102
5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2103
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2104
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2105
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2106
5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 187, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2107
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2108
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2109
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355, //2110
5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2111
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2112
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2113
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2114
5, 20, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2115
5, 20, 35, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2116
4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2117
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355, //2118
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355, //2119
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 356, //2120
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2121
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 311, 325, 340, 355, //2122
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2123
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2124
4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2125
4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2126
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2127
5, 20, 34, 49, 64, 79, 94, 110, 125, 141, 156, 172, 188, 203, 219, 235, 250, 266, 281, 296, 311, 326, 341, 355, //2128
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2129
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2130
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355, //2131
5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355, //2132
4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355, //2133
4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355, //2134
5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355 //2135
];

var JQYearDate = {
    "2010": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2011": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 326, 340, 355],
    "2012": [5, 20, 34, 49, 64, 79, 94, 110, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2013": [4, 19, 34, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2014": [4, 19, 34, 49, 64, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2015": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2016": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 188, 203, 219, 235, 250, 265, 281, 296, 311, 326, 341, 355],
    "2017": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2018": [4, 19, 34, 49, 63, 79, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2019": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2020": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 341, 355],
    "2021": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2022": [4, 19, 34, 49, 63, 78, 94, 109, 124, 140, 156, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2023": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 296, 311, 325, 340, 355],
    "2024": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2025": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2026": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355],
    "2027": [4, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 171, 187, 203, 219, 234, 250, 265, 280, 295, 310, 325, 340, 355],
    "2028": [5, 19, 34, 49, 64, 79, 94, 109, 125, 140, 156, 172, 187, 203, 219, 234, 250, 265, 281, 296, 311, 326, 340, 355],
    "2029": [4, 19, 33, 48, 63, 78, 93, 109, 124, 140, 155, 171, 187, 202, 218, 234, 249, 265, 280, 295, 310, 325, 340, 354],
    "2030": [4, 19, 34, 48, 63, 78, 94, 109, 124, 140, 155, 171, 187, 203, 218, 234, 249, 265, 280, 295, 310, 325, 340, 355]
};

function GetSolarDateFromLunar(yearparam, monthparam, dayparam) {
    var isleappara = false;
    if (monthparam == "13") {
        isleappara = true;
        monthparam = leapMonth(parseInt(yearparam, 10));
    }
    return GetSolarFromLunar(yearparam, monthparam, dayparam, isleappara);
}
function GetSolarFromLunar(year, month, day, isLeap) {

    ///<summary>通过农历年月日，是否闰月得到阳历日期</summary>
    ///<return type="string" />

    ///思路 先计算农历距离1.1日的天数差

    year = parseInt(year, 10);
    month = parseInt(month, 10);
    day = parseInt(day, 10);

    var haveLeapmonth = leapMonth(year);
    var DayCounts = 0;
    var Diffrence = 0;
    for (var i = 1; i < month; i++) {
        DayCounts += monthDays(year, i);
    }
    if (haveLeapmonth > 0) {
        if (month > haveLeapmonth) {
            DayCounts += leapDays(year);
        } else {
            if (month == haveLeapmonth && isLeap) {
                DayCounts += monthDays(year, month);
            }
        }
    }
    DayCounts += day;

    var solarTolunar = new calendar(year, 0);
    var solarFirstDay = solarTolunar[0];

    var PreYearDayCount = 0;
    try {
        for (var j = 1; j < solarFirstDay.lMonth; j++) {
            PreYearDayCount += monthDays(solarFirstDay.lYear, j);
        }
    } catch (e) {
        alert(e.message);
    }
    if (solarFirstDay.isLeap) {
        PreYearDayCount += monthDays(solarFirstDay.lYear, solarFirstDay.lMonth);
    }
    PreYearDayCount += solarFirstDay.lDay;

    if (solarFirstDay.lYear < year) {
        var PreYearTotal = lYearDays(solarFirstDay.lYear);

        PreYearDayCount += leapDays(solarFirstDay.lYear);
        Diffrence = PreYearTotal - PreYearDayCount + DayCounts;
    } else {
        Diffrence = DayCounts - PreYearDayCount;
    }
    return DateCalculate(new Date(year, 0, 1), Diffrence, "d");
}
/*时间计算
 calculateDate:计算的时间基数 时间类型
 number:计算的参数  整形
 type  :类型 枚举类型
 返回时间类型
 */
function DateCalculate(calculateDate, number, type) {
    var calculateResult;
    switch (type) {
        case "s":
            calculateResult = new Date(Date.parse(calculateDate) + 1000 * parseInt(number));
            break;
        case "m":
            calculateResult = new Date(Date.parse(calculateDate) + 60000 * parseInt(number));
            break;
        case "h":
            calculateResult = new Date(Date.parse(calculateDate) + 3600000 * parseInt(number));
            break;
        case "d":
            calculateResult = new Date(Date.parse(calculateDate) + 86400000 * parseInt(number));
            break;
        case "w":
            calculateResult = new Date(Date.parse(calculateDate) + 86400000 * 7 * parseInt(number));
            break;
        case "M":
            calculateResult = new Date(calculateDate.getFullYear(), calculateDate.getMonth() + parseInt(number), calculateDate.getDate(), calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
        case "y":
            calculateResult = new Date(calculateDate.getFullYear() + parseInt(number), calculateDate.getMonth(), calculateDate.getDate(), calculateDate.getHours(), calculateDate.getMinutes(), calculateDate.getSeconds());
            break;
    }
    return calculateResult;
}
// 加密
/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js_new
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js_new/wiki/License
 */
var CryptoJS = CryptoJS || function (s, p) {
    var m = {},
        l = m.lib = {},
        n = function n() {},
        r = l.Base = { extend: function extend(b) {
            n.prototype = this;var h = new n();b && h.mixIn(b);h.hasOwnProperty("init") || (h.init = function () {
                h.$super.init.apply(this, arguments);
            });h.init.prototype = h;h.$super = this;return h;
        }, create: function create() {
            var b = this.extend();b.init.apply(b, arguments);return b;
        }, init: function init() {}, mixIn: function mixIn(b) {
            for (var h in b) {
                b.hasOwnProperty(h) && (this[h] = b[h]);
            }b.hasOwnProperty("toString") && (this.toString = b.toString);
        }, clone: function clone() {
            return this.init.prototype.extend(this);
        } },
        q = l.WordArray = r.extend({
        init: function init(b, h) {
            b = this.words = b || [];this.sigBytes = h != p ? h : 4 * b.length;
        }, toString: function toString(b) {
            return (b || t).stringify(this);
        }, concat: function concat(b) {
            var h = this.words,
                a = b.words,
                j = this.sigBytes;b = b.sigBytes;this.clamp();if (j % 4) for (var g = 0; g < b; g++) {
                h[j + g >>> 2] |= (a[g >>> 2] >>> 24 - 8 * (g % 4) & 255) << 24 - 8 * ((j + g) % 4);
            } else if (65535 < a.length) for (g = 0; g < b; g += 4) {
                h[j + g >>> 2] = a[g >>> 2];
            } else h.push.apply(h, a);this.sigBytes += b;return this;
        }, clamp: function clamp() {
            var b = this.words,
                h = this.sigBytes;b[h >>> 2] &= 4294967295 << 32 - 8 * (h % 4);b.length = s.ceil(h / 4);
        }, clone: function clone() {
            var b = r.clone.call(this);b.words = this.words.slice(0);return b;
        }, random: function random(b) {
            for (var h = [], a = 0; a < b; a += 4) {
                h.push(4294967296 * s.random() | 0);
            }return new q.init(h, b);
        }
    }),
        v = m.enc = {},
        t = v.Hex = {
        stringify: function stringify(b) {
            var a = b.words;b = b.sigBytes;for (var g = [], j = 0; j < b; j++) {
                var k = a[j >>> 2] >>> 24 - 8 * (j % 4) & 255;g.push((k >>> 4).toString(16));g.push((k & 15).toString(16));
            }return g.join("");
        }, parse: function parse(b) {
            for (var a = b.length, g = [], j = 0; j < a; j += 2) {
                g[j >>> 3] |= parseInt(b.substr(j, 2), 16) << 24 - 4 * (j % 8);
            }return new q.init(g, a / 2);
        }
    },
        a = v.Latin1 = { stringify: function stringify(b) {
            var a = b.words;b = b.sigBytes;for (var g = [], j = 0; j < b; j++) {
                g.push(String.fromCharCode(a[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
            }return g.join("");
        }, parse: function parse(b) {
            for (var a = b.length, g = [], j = 0; j < a; j++) {
                g[j >>> 2] |= (b.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
            }return new q.init(g, a);
        } },
        u = v.Utf8 = { stringify: function stringify(b) {
            try {
                return decodeURIComponent(escape(a.stringify(b)));
            } catch (g) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function parse(b) {
            return a.parse(unescape(encodeURIComponent(b)));
        } },
        g = l.BufferedBlockAlgorithm = r.extend({
        reset: function reset() {
            this._data = new q.init();this._nDataBytes = 0;
        }, _append: function _append(b) {
            "string" == typeof b && (b = u.parse(b));this._data.concat(b);this._nDataBytes += b.sigBytes;
        }, _process: function _process(b) {
            var a = this._data,
                g = a.words,
                j = a.sigBytes,
                k = this.blockSize,
                m = j / (4 * k),
                m = b ? s.ceil(m) : s.max((m | 0) - this._minBufferSize, 0);b = m * k;j = s.min(4 * b, j);if (b) {
                for (var l = 0; l < b; l += k) {
                    this._doProcessBlock(g, l);
                }l = g.splice(0, b);a.sigBytes -= j;
            }return new q.init(l, j);
        }, clone: function clone() {
            var b = r.clone.call(this);
            b._data = this._data.clone();return b;
        }, _minBufferSize: 0
    });l.Hasher = g.extend({
        cfg: r.extend(), init: function init(b) {
            this.cfg = this.cfg.extend(b);this.reset();
        }, reset: function reset() {
            g.reset.call(this);this._doReset();
        }, update: function update(b) {
            this._append(b);this._process();return this;
        }, finalize: function finalize(b) {
            b && this._append(b);return this._doFinalize();
        }, blockSize: 16, _createHelper: function _createHelper(b) {
            return function (a, g) {
                return new b.init(g).finalize(a);
            };
        }, _createHmacHelper: function _createHmacHelper(b) {
            return function (a, g) {
                return new k.HMAC.init(b, g).finalize(a);
            };
        }
    });var k = m.algo = {};return m;
}(Math);
(function (s) {
    function p(a, k, b, h, l, j, m) {
        a = a + (k & b | ~k & h) + l + m;return (a << j | a >>> 32 - j) + k;
    }function m(a, k, b, h, l, j, m) {
        a = a + (k & h | b & ~h) + l + m;return (a << j | a >>> 32 - j) + k;
    }function l(a, k, b, h, l, j, m) {
        a = a + (k ^ b ^ h) + l + m;return (a << j | a >>> 32 - j) + k;
    }function n(a, k, b, h, l, j, m) {
        a = a + (b ^ (k | ~h)) + l + m;return (a << j | a >>> 32 - j) + k;
    }for (var r = CryptoJS, q = r.lib, v = q.WordArray, t = q.Hasher, q = r.algo, a = [], u = 0; 64 > u; u++) {
        a[u] = 4294967296 * s.abs(s.sin(u + 1)) | 0;
    }q = q.MD5 = t.extend({
        _doReset: function _doReset() {
            this._hash = new v.init([1732584193, 4023233417, 2562383102, 271733878]);
        },
        _doProcessBlock: function _doProcessBlock(g, k) {
            for (var b = 0; 16 > b; b++) {
                var h = k + b,
                    w = g[h];g[h] = (w << 8 | w >>> 24) & 16711935 | (w << 24 | w >>> 8) & 4278255360;
            }var b = this._hash.words,
                h = g[k + 0],
                w = g[k + 1],
                j = g[k + 2],
                q = g[k + 3],
                r = g[k + 4],
                s = g[k + 5],
                t = g[k + 6],
                u = g[k + 7],
                v = g[k + 8],
                x = g[k + 9],
                y = g[k + 10],
                z = g[k + 11],
                A = g[k + 12],
                B = g[k + 13],
                C = g[k + 14],
                D = g[k + 15],
                c = b[0],
                d = b[1],
                e = b[2],
                f = b[3],
                c = p(c, d, e, f, h, 7, a[0]),
                f = p(f, c, d, e, w, 12, a[1]),
                e = p(e, f, c, d, j, 17, a[2]),
                d = p(d, e, f, c, q, 22, a[3]),
                c = p(c, d, e, f, r, 7, a[4]),
                f = p(f, c, d, e, s, 12, a[5]),
                e = p(e, f, c, d, t, 17, a[6]),
                d = p(d, e, f, c, u, 22, a[7]),
                c = p(c, d, e, f, v, 7, a[8]),
                f = p(f, c, d, e, x, 12, a[9]),
                e = p(e, f, c, d, y, 17, a[10]),
                d = p(d, e, f, c, z, 22, a[11]),
                c = p(c, d, e, f, A, 7, a[12]),
                f = p(f, c, d, e, B, 12, a[13]),
                e = p(e, f, c, d, C, 17, a[14]),
                d = p(d, e, f, c, D, 22, a[15]),
                c = m(c, d, e, f, w, 5, a[16]),
                f = m(f, c, d, e, t, 9, a[17]),
                e = m(e, f, c, d, z, 14, a[18]),
                d = m(d, e, f, c, h, 20, a[19]),
                c = m(c, d, e, f, s, 5, a[20]),
                f = m(f, c, d, e, y, 9, a[21]),
                e = m(e, f, c, d, D, 14, a[22]),
                d = m(d, e, f, c, r, 20, a[23]),
                c = m(c, d, e, f, x, 5, a[24]),
                f = m(f, c, d, e, C, 9, a[25]),
                e = m(e, f, c, d, q, 14, a[26]),
                d = m(d, e, f, c, v, 20, a[27]),
                c = m(c, d, e, f, B, 5, a[28]),
                f = m(f, c, d, e, j, 9, a[29]),
                e = m(e, f, c, d, u, 14, a[30]),
                d = m(d, e, f, c, A, 20, a[31]),
                c = l(c, d, e, f, s, 4, a[32]),
                f = l(f, c, d, e, v, 11, a[33]),
                e = l(e, f, c, d, z, 16, a[34]),
                d = l(d, e, f, c, C, 23, a[35]),
                c = l(c, d, e, f, w, 4, a[36]),
                f = l(f, c, d, e, r, 11, a[37]),
                e = l(e, f, c, d, u, 16, a[38]),
                d = l(d, e, f, c, y, 23, a[39]),
                c = l(c, d, e, f, B, 4, a[40]),
                f = l(f, c, d, e, h, 11, a[41]),
                e = l(e, f, c, d, q, 16, a[42]),
                d = l(d, e, f, c, t, 23, a[43]),
                c = l(c, d, e, f, x, 4, a[44]),
                f = l(f, c, d, e, A, 11, a[45]),
                e = l(e, f, c, d, D, 16, a[46]),
                d = l(d, e, f, c, j, 23, a[47]),
                c = n(c, d, e, f, h, 6, a[48]),
                f = n(f, c, d, e, u, 10, a[49]),
                e = n(e, f, c, d, C, 15, a[50]),
                d = n(d, e, f, c, s, 21, a[51]),
                c = n(c, d, e, f, A, 6, a[52]),
                f = n(f, c, d, e, q, 10, a[53]),
                e = n(e, f, c, d, y, 15, a[54]),
                d = n(d, e, f, c, w, 21, a[55]),
                c = n(c, d, e, f, v, 6, a[56]),
                f = n(f, c, d, e, D, 10, a[57]),
                e = n(e, f, c, d, t, 15, a[58]),
                d = n(d, e, f, c, B, 21, a[59]),
                c = n(c, d, e, f, r, 6, a[60]),
                f = n(f, c, d, e, z, 10, a[61]),
                e = n(e, f, c, d, j, 15, a[62]),
                d = n(d, e, f, c, x, 21, a[63]);b[0] = b[0] + c | 0;b[1] = b[1] + d | 0;b[2] = b[2] + e | 0;b[3] = b[3] + f | 0;
        }, _doFinalize: function _doFinalize() {
            var a = this._data,
                k = a.words,
                b = 8 * this._nDataBytes,
                h = 8 * a.sigBytes;k[h >>> 5] |= 128 << 24 - h % 32;var l = s.floor(b / 4294967296);k[(h + 64 >>> 9 << 4) + 15] = (l << 8 | l >>> 24) & 16711935 | (l << 24 | l >>> 8) & 4278255360;k[(h + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;a.sigBytes = 4 * (k.length + 1);this._process();a = this._hash;k = a.words;for (b = 0; 4 > b; b++) {
                h = k[b], k[b] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            }return a;
        }, clone: function clone() {
            var a = t.clone.call(this);a._hash = this._hash.clone();return a;
        }
    });r.MD5 = t._createHelper(q);r.HmacMD5 = t._createHmacHelper(q);
})(Math);

module.exports = { base64decode: base64decode };

// 样式相关
// jQuery.fn.placeholder = function () {
//     var i = document.createElement('input'),
//         placeholdersupport = 'placeholder' in i;
//     if (!placeholdersupport) {
//         var inputs = jQuery(this);
//         inputs.each(function () {
//             var input = jQuery(this),
//                 text = input.attr('placeholder'),
//                 pdl = 0,
//                 height = input.outerHeight(),
//                 width = input.outerWidth(),
//                 placeholder = jQuery('<span class="phTips">' + text + '</span>');
//             try {
//                 pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
//             }
//             catch (e) {
//                 pdl = 5;
//             }
//             placeholder.css({ 'height': height, 'line-height': height + "px", 'position': 'absolute', 'left': '10px', 'top': '0', 'color': "#cecfc9", 'font-size': "12px" });
//             placeholder.click(function () {
//                 input.focus();
//             });
//             if (input.val() != "") {
//                 placeholder.css({ display: 'none' });
//             } else {
//                 placeholder.css({ display: 'inline' });
//             }
//             placeholder.insertAfter(input);
//             input.keyup(function (e) {
//                 if (jQuery(this).val() != "") {
//                     placeholder.css({ display: 'none' });
//                 } else {
//                     placeholder.css({ display: 'inline' });
//                 }
//             });
//         });
//     }
//     return this;
// };
//# sourceMappingURL=plugin.js.map
