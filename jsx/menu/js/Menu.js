const Menu = function(props) {
  const { items, opened } = props;

  let nav = null;
  let spans = null;

  if (opened) {
    nav = (
      <nav>
        <ul>
          { items.map((item) => <li><a href={item.href}>{item.title}</a></li>) }
        </ul>
      </nav>
    );

    spans = (
      <span></span>
    );
  }

  return (
    <div className={ opened ? 'menu menu-open' : 'menu' }>
      <div className='menu-toggle'>
        { spans }
      </div>
      { nav }
    </div>
  );
}