function getMonday(d) {
  d = new Date(d);

  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1);

  return new Date(d.setDate(diff));
}

const DAY_NAMES = [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ];
const SHORT_DAY_NAMES = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс' ];
const MONTH_NAMES = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];
const GENITIVE_MONTH_NAMES = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ];

const Calendar = function(props) {
  const { date } = props;

  const monthNumber = date.getMonth();
  const fullYear = date.getFullYear();

  const firstDate = new Date(fullYear, monthNumber, 1);
  const lastDate = new Date(fullYear, monthNumber + 1, 0);
  const firstDateDay = firstDate.getDay();
  const lastDateDay = lastDate.getDay();
  let tempDate = getMonday(firstDate);

  let weeks = [];

  /**
    * Явялется ли нормальным использование массивов и ф-ии .push() в подобных случаях?
    * Или есть какие-то другие более оптимальные практики?
    * Я не особо знаком с особенностями React, поэтому в меню использовал такой же пример,
    * т.к. увидел похожую реализацию в чужом примере
    */

  let colGroupItems = [];
  let theadRowItems = [];

  for (let i = 0; i < 7; i++) {
    colGroupItems.push(<col className={(i === 5 || i === 6) ? 'ui-datepicker-week-end' : ''} />);
    theadRowItems.push(<th scope='col' title={DAY_NAMES[i]}>{SHORT_DAY_NAMES[i]}</th>)
  }

  const colGroup = (
    <colgroup>
      {colGroupItems}
    </colgroup>
  );

  const thead = (
    <thead>
      <tr>
        {theadRowItems}
      </tr>
    </thead>
  );

  while (tempDate < lastDate && tempDate.getDay() != 6) {
    let tds = [];

    for (let i = 0; i < 7; i++) {
      let currentClassName = '';

      if (tempDate.getMonth() !== monthNumber) {
        currentClassName = 'ui-datepicker-other-month';
      }

      if (tempDate.getDate() === date.getDate() && tempDate.getMonth() === monthNumber) {
        currentClassName = 'ui-datepicker-today';
      }

      tds.push(<td className={ currentClassName }>{tempDate.getDate()}</td>);
      
      tempDate = new Date(tempDate.getTime() + 864e5);
    }

    weeks.push(<tr>{tds}</tr>);
  }

  return (
    <div className='ui-datepicker'>
      <div className='ui-datepicker-material-header'>
        <div className='ui-datepicker-material-day'>{ DAY_NAMES[date.getDay() - 1] }</div>
        <div className='ui-datepicker-material-date'>
          <div className='ui-datepicker-material-day-num'>{ date.getDate() }</div>
          <div className='ui-datepicker-material-month'>{ GENITIVE_MONTH_NAMES[monthNumber] }</div>
          <div className='ui-datepicker-material-year'>{ fullYear }</div>
        </div>
      </div>
      <div className='ui-datepicker-header'>
        <div className='ui-datepicker-title'>
          <span className='ui-datepicker-month'>{ MONTH_NAMES[monthNumber] }</span>&nbsp;<span className='ui-datepicker-year'>{ fullYear }</span>
        </div>
      </div>
      <table className='ui-datepicker-calendar'>
        {colGroup}
        {thead}
        <tbody>
          {weeks}
        </tbody>
      </table>
    </div>
  );
}