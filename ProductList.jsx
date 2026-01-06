import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { Link } from "react-router-dom";

/*
  Plant data grouped into categories.
  Each category contains at least six unique plants
  with id, name, price, and image.
*/
const plants = [
  // Indoor Plants
  { id: 1, name: "Snake Plant", price: 15, image: "/images/snake.jpg", category: "Indoor" },
  { id: 2, name: "Peace Lily", price: 18, image: "/images/peace.jpg", category: "Indoor" },
  { id: 3, name: "Spider Plant", price: 12, image: "/images/spider.jpg", category: "Indoor" },
  { id: 4, name: "ZZ Plant", price: 20, image: "/images/zz.jpg", category: "Indoor" },
  { id: 5, name: "Pothos", price: 14, image: "/images/pothos.jpg", category: "Indoor" },
  { id: 6, name: "Rubber Plant", price: 22, image: "/images/rubber.jpg", category: "Indoor" },

  // Succulents
  { id: 7, name: "Aloe Vera", price: 10, image: "/images/aloe.jpg", category: "Succulent" },
  { id: 8, name: "Jade Plant", price: 13, image: "/images/jade.jpg", category: "Succulent" },
  { id: 9, name: "Echeveria", price: 9, image: "/images/echeveria.jpg", category: "Succulent" },
  { id: 10, name: "Haworthia", price: 11, image: "/images/haworthia.jpg", category: "Succulent" },
  { id: 11, name: "Barrel Cactus", price: 15, image: "/images/barrel.jpg", category: "Succulent" },
  { id: 12, name: "Zebra Cactus", price: 12, image: "/images/zebra.jpg", category: "Succulent" },

  // Outdoor Plants
  { id: 13, name: "Fern", price: 16, image: "/images/fern.jpg", category: "Outdoor" },
  { id: 14, name: "Palm", price: 25, image: "/images/palm.jpg", category: "Outdoor" },
  { id: 15, name: "Bamboo", price: 30, image: "/images/bamboo.jpg", category: "Outdoor" },
  { id: 16, name: "Rose Plant", price: 18, image: "/images/rose.jpg", category: "Outdoor" },
  { id: 17, name: "Lavender", price: 20, image: "/images/lavender.jpg", category: "Outdoor" },
  { id: 18, name: "Hibiscus", price: 22, image: "/images/hibiscus.jpg", category: "Outdoor" },
];

const ProductList = () => {
  const dispatch = useDispatch();

  // Access cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  /*
    Helper function to check if a plant
    is already added to the cart
  */
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <>
      {/* Navigation Bar */}
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart ({cartItems.length})</Link>
      </div>

      <h2>Our Plant Collection</h2>

      {/* Render plants by category */}
      {["Indoor", "Succulent", "Outdoor"].map((category) => (
        <div key={category}>
          <h3>{category} Plants</h3>

          <div className="plant-grid">
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => (
                <div key={plant.id} className="plant-card">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    width="120"
                    height="120"
                  />
                  <h4>{plant.name}</h4>
                  <p>Price: ${plant.price}</p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => dispatch(addToCart(plant))}
                    disabled={isInCart(plant.id)}
                  >
                    {isInCart(plant.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
