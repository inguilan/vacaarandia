import { useState } from 'react';
import './App.css';

function App() {
  const [cows, setCows] = useState([]);
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const addCow = () => {
    if (name && price && description && image) {
      const newCow = { name, price, description, image };
      if (editingIndex !== null) {
        // Edit existing cow
        const updatedCows = cows.map((cow, index) =>
          index === editingIndex ? newCow : cow
        );
        setCows(updatedCows);
        setEditingIndex(null);
      } else {
        // Add new cow
        setCows([...cows, newCow]);
      }
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
    }
  };

  const deleteCow = (index) => {
    setCows(cows.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setName(cows[index].name);
    setPrice(cows[index].price);
    setDescription(cows[index].description);
    setImage(cows[index].image);
    setEditingIndex(index);
  };

  const addToCart = (cow) => {
    setCart([...cart, cow]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const filteredCows = cows.filter(cow =>
    cow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header>
        <h1>Venta de Vacas</h1>
        <nav>
          <input
            type="text"
            placeholder="Buscar por raza"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="cart-button">
            Carrito ({cart.length})
          </button>
        </nav>
      </header>
      <div className="form">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de Imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button onClick={addCow}>
          {editingIndex !== null ? 'Actualizar Vaca' : 'Añadir Vaca'}
        </button>
      </div>
      <div className="cow-list">
        <h2>Lista de Vacas</h2>
        {filteredCows.length === 0 ? (
          <p>No hay vacas disponibles</p>
        ) : (
          filteredCows.map((cow, index) => (
            <div key={index} className="cow-item">
              {cow.image && <img src={cow.image} alt={cow.name} className="cow-image" />}
              <h3>{cow.name}</h3>
              <p>Precio: ${cow.price}</p>
              <p>Descripción: {cow.description}</p>
              <button onClick={() => addToCart(cow)}>Añadir al Carrito</button>
              <button onClick={() => startEditing(index)}>Editar</button>
              <button onClick={() => deleteCow(index)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
