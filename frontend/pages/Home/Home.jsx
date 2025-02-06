import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return <div>Welcome {location.state.role}</div>;
};

export default Home;
