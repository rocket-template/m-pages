import GMP from 'GMP';
import fromNow from './fromNow';
import formatNumber from './formatNumber';

GMP.template.helper('dateFormat', (date)=> {
  return fromNow(date);
});

GMP.template.helper('numberFormat', (number)=> {

    return formatNumber(number);
});