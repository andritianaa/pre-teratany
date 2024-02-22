import moment from 'moment';

(function (global: any, factory: any) {
  typeof exports === 'object' && typeof module !== 'undefined'
      && typeof require === 'function' ? factory(require('moment')) :
          factory(global.moment)
}(this, (function (moment: any) {

  var monthsStrictRegex =
      /^(janoary|febroary|martsa|aprily|may|jona|jolay|aogositra|septambra|oktobra novambra|desambra)/i,
      monthsShortStrictRegex =
          /(jano\.?|febro\.?|martsa|apr\.?|may|jona|jol\.?|aog\.?|sept\.?|okt\.?|nov\.?|des\.?)/i,
      monthsRegex =
          /(jano\.?|febro\.?|martsa|apr\.?|may|jona|jol\.?|aog\.?|sept\.?|okt\.?|nov\.?|des\.?|janoary|febroary|martsa|aprily|may|jona|jolay|aogositra|septambra|oktobra novambra|desambra)/i,
      monthsParse = [
          /^jano/i,
          /^febro/i,
          /^martsa/i,
          /^apr/i,
          /^may/i,
          /^jona/i,
          /^jol/i,
          /^aog/i,
          /^sept/i,
          /^okt/i,
          /^nov/i,
          /^des/i,
      ];

  var mg = moment.defineLocale('mg', {
      months: 'janoary_febroary_martsa_aprily_may_jona_jolay_aogositra_septambra_oktobra_novambra_desambra'.split(
          '_'
      ),
      monthsShort:
          'jano._febro._martsa_apr._mey_jona_jol._aog._sept._okt._nov._des.'.split(
              '_'
          ),
      monthsRegex: monthsRegex,
      monthsShortRegex: monthsRegex,
      monthsStrictRegex: monthsStrictRegex,
      monthsShortStrictRegex: monthsShortStrictRegex,
      monthsParse: monthsParse,
      longMonthsParse: monthsParse,
      shortMonthsParse: monthsParse,
      weekdays: 'alahady_alatsinainy_talata_alarobia_alakamisy_zoma_sabotsy'.split('_'),
      weekdaysShort: 'alaha._alatsi._tala._alaro._alaka._zom._sabo.'.split('_'),
      weekdaysMin: 'alah_alat_tal_ala_alak_zo_sa'.split('_'),
      weekdaysParseExact: true,
      longDateFormat: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'YYYY-MM-DD',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd D MMMM YYYY HH:mm',
      },
      calendar: {
          sameDay: '[Anio tamin\'ny] LT',
          nextDay: '[Rapitso amin\'ny] LT',
          nextWeek: 'dddd [amin\'ny] LT',
          lastDay: '[Omaly tamin\'ny] LT',
          lastWeek: 'dddd [tamin\'ny] LT',
          sameElse: 'L',
      },
      relativeTime: {
          future: 'afaka %s',
          past: '%s lasa',
          s: 'sekondra vitsy',
          ss: '%d sekondra',
          m: 'iray minitra',
          mm: '%d minitra',
          h: 'iray ora',
          hh: '%d ora',
          d: 'iray andro',
          dd: '%d andro',
          w: 'iray herinandro',
          ww: '%d herinandro',
          M: 'iray volana',
          MM: '%d volana',
          y: 'iray taona',
          yy: '%d taona',
      },
      dayOfMonthOrdinalParse: /\d{1,2}(n|)/,
      ordinal: function (number: number, period: string) {
          return number + (number === 1 ? 'n' : '');
      },
      week: {
          dow: 1, // Monday is the first day of the week.
          doy: 4, // The week that contains Jan 4th is the first week of the year.
      },
  });

  return mg;

})));
