const ShopItem = function(props) {
  const { item } = props;

  return (
    <div className='main-content'>
      <h2>{ item.brand }</h2>
      <h1>{ item.title }</h1>
      <h3>{ item.description }</h3>
      <div className='description'>
        { item.descriptionFull }
      </div>
      <div className='highlight-window mobile'>
        <div className='highlight-overlay'></div>
      </div>
      <div className='divider'></div>
      <div className='purchase-info'>
        <div className='price'>{ item.currency }{ item.price.toFixed(2) }</div>
        <button>Добавить в корзину</button>
      </div>
    </div>
  );
}

const item = {
  brand: 'Tiger of Sweden',
  title: 'Leonard coat',
  description: 'Minimalistic coat in cotton-blend',
  descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
  price: 399,
  currency: '£'
}

ReactDOM.render(
  <ShopItem item={item} />,
  document.getElementById('root')
);