const Menu = function(props) {
  const { items, opened } = props;
  const nav = [];
  const spans = []

  if (opened) {
    nav.push(
      <nav>
        <ul>
          { items.map((item) => <li><a href={item.href}>{item.title}</a></li>) }
        </ul>
      </nav>
    );

    spans.push(<span></span>);
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