import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/store/hooks";
import { deleteProducts, fetchProducts } from "./redux/features/productSlice";

function App() {
  const [searchProduct, setSearchProduct] = useState("");
  const dispatch = useAppDispatch();

  const productlist: any = useAppSelector(
    (state) => state.productSlice.productlist
  );
  const isLoading: any = useAppSelector(
    (state) => state.productSlice.isLoading
  );
  useEffect(() => {
    dispatch(fetchProducts()).then((res: any) => {
      console.log(res, "res");
    });
  }, []);
  console.log(productlist, "productlist");
  const filteredProducts = productlist.filter((product: any) =>
    product.category.toLowerCase().includes(searchProduct.toLowerCase())
  );
  const handleDeleteProduct = (deleteId: any) => {
    dispatch(deleteProducts(deleteId));
    console.log("deleted");

    console.log(deleteId, "deleteId");
  };
  return (
    <>
      {isLoading && <h1 className="text-center">Loading....</h1>}
      <div className="container mt-5 d-flex flex-wrap">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category..."
            // value={searchProduct}
            onChange={(e) => setSearchProduct(e.target.value)}
          />
        </div>
        <div className="row">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => {
              return (
                <div className="col-4" key={product.id}>
                  <div className="card shadow mx-2 my-2 p-1 position-relative">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                    <img
                      className="card-img-top  align-self-center bg-black rounded-circle mt-3 h-25 w-25"
                      src={product.thumbnail}
                      alt=""
                    />
                    <div className="card-body">
                      <p className="card-text fw-bolder mb-0">
                        Category : {product.category}
                      </p>
                      <p className="card-text fw-bolder mb-0">
                        {product.title}
                      </p>
                      <p className="card-text fw-bolder mb-0">
                        Brand : {product.brand}
                      </p>
                      <p className="card-text fw-bolder mb-0">
                        Price : {product.price}
                      </p>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center mt-5">
              <h5>No products found.</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
