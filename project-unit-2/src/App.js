
import Header from './components/Header';
import Productpage from './components/Productpage';
import ProductDetails from './components/ProductDetails';
// import Adminpage from './components/Adminpage';
import Wishlistpage from './components/Wishlistpage';
import Cart from './components/Cart';
import React, { useEffect } from 'react';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Footer from "./components/Footer";
import Pagination from "./components/Pagination";
import { useSelector } from "react-redux";
import { useState } from 'react';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);


  const state = useSelector((state) => {
    return {
        products: state.productsReducer.products,
        searchresult: state.productsReducer.searchresult,
        filteredProducts : state.productsReducer.filteredProducts,
    };
  });


  useEffect(()=>{
    setPosts(state.products)
  })
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={<Productpage posts={currentPosts} loading={loading}/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/Wishlist" element={<Wishlistpage/>}/>
        </Routes>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
       
    </BrowserRouter>
    </>
  );
}
export default App;
