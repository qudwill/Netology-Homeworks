/**
  * Позаимствовано со StackOverflow :)
  */ 

function getMonday(d) {
  d = new Date(d);

  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1);

  return new Date(d.setDate(diff));
}

const DAY_NAMES = [ 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье' ];
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
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className='ui-datepicker-week-end' />
          <col className='ui-datepicker-week-end' />
        </colgroup>
        <thead>
          <tr>
            <th scope='col' title='Понедельник'>Пн</th>
            <th scope='col' title='Вторник'>Вт</th>
            <th scope='col' title='Среда'>Ср</th>
            <th scope='col' title='Четверг'>Чт</th>
            <th scope='col' title='Пятница'>Пт</th>
            <th scope='col' title='Суббота'>Сб</th>
            <th scope='col' title='Воскресенье'>Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeks}
        </tbody>
      </table>
    </div>
  );
}