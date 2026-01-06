import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";

const plants = [
  { id: 1, name: "Snake Plant", price: 15, category: "Indoor" },
  { id: 2, name: "Peace Lily", price: 18, category: "Indoor" },
  { id: 3, name: "Aloe Vera", price: 12, category: "Succulent" },
  { id: 4, name: "Cactus", price: 10, category: "Succulent" },
  { id: 5, name: "Fern", price: 14, category: "Outdoor" },
  { id: 6, name: "Palm", price: 20, category: "Outdoor" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = id => cartItems.some(item => item.id === id);

  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">Cart ({cartItems.length})</Link>
        </div>
      </div>

      <h2>Our Plants</h2>
      {["Indoor", "Succulent", "Outdoor"].map(category => (
        <div key={category}>
          <h3>{category}</h3>
          {plants
            .filter(p => p.category === category)
            .map(plant => (
              <div key={plant.id}>
                <h4>{plant.name}</h4>
                <p>${plant.price}</p>
                <button
                  disabled={isInCart(plant.id)}
                  onClick={() => dispatch(addToCart(plant))}
                >
                  {isInCart(plant.id) ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
        </div>
      ))}
    </>
  );
};

export default ProductList;
