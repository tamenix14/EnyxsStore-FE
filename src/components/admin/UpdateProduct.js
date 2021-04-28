import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  //// Technical specifications
  const [screensize, setScreenSize] = useState("");
  const [screentechnology, setScreenTechnology] = useState("");
  const [ramcapacity, setRamCapacity] = useState("");
  const [internalmemory, setInternalMemory] = useState("");
  const [battery, setBattery] = useState("");
  const [operatingsystem, setOperatingSystem] = useState("");
  const [material, setMaterial] = useState("");

  const categories = ["Phone", "Smart watch", "Headphone"];

  const colors = ["Black", "Brown", "Silver", "White", "Blue", "Ocean"];
  const brands = [
    "Apple",
    "Asus",
    "Samsung",
    "Nokia",
    "Xiaomi",
    "Oppo",
    "Vsmart",
    "Huawei",
  ];
  const materials = ["Plastic", "Metal", "Glass"];

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product
  );

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(product.seller);
      setColor(product.color);
      setBrand(product.brand);
      ////// Technical specifications
      setScreenSize(product.screensize)
      setScreenTechnology(product.screentechnology)
      setRamCapacity(product.ramcapacity)
      setInternalMemory(product.internalmemory)
      setBattery(product.battery)
      setOperatingSystem(product.operatingsystem)
      setMaterial(product.material)

      setOldImages(product.images);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      window.location.reload()
    }
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    history,
    updateError,
    product,
    productId,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("color", color);
    formData.set("brand", brand);
    formData.set("stock", stock);
    formData.set("seller", seller);
    formData.set("screensize", screensize);
    formData.set("screentechnology", screentechnology);
    formData.set("ramcapacity", ramcapacity);
    formData.set("internalmemory", internalmemory);
    formData.set("battery", battery);
    formData.set("operatingsystem", operatingsystem);
    formData.set("material", material);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Product"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="row shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <div className="col-6">
                  <h1 className="mb-4">New Product</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price_field">Price</label>
                    <input
                      type="number"
                      id="price_field"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea
                      className="form-control"
                      id="description_field"
                      rows="8"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select
                      className="form-control"
                      id="category_field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Select category...</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="color_field">Color</label>
                    <select
                      className="form-control"
                      id="color_field"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      <option>Select color...</option>
                      {colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="brand_field">Brand</label>
                    <select
                      className="form-control"
                      id="brand_field"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    >
                      <option>Select brand...</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="stock_field">Stock</label>
                    <input
                      type="number"
                      id="stock_field"
                      className="form-control"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="seller_field">Seller Name</label>
                    <input
                      type="text"
                      id="seller_field"
                      className="form-control"
                      value={seller}
                      onChange={(e) => setSeller(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Images</label>

                    <div className="custom-file">
                      <input
                        type="file"
                        name="product_images"
                        className="custom-file-input"
                        id="customFile"
                        onChange={onChange}
                        multiple
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Images
                      </label>
                    </div>

                    {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}

                    {imagesPreview.map((img) => (
                      <img
                        src={img}
                        key={img}
                        alt="Images Preview"
                        className="mt-3 mr-2"
                        width="55"
                        height="52"
                      />
                    ))}
                  </div>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                    // disabled={loading ? true : false}
                  >
                    CREATE
                    {/* {loading ? <div className="loader"></div> : "CREATE"} */}
                  </button>
                </div>
                <div className="col-6 px-5">
                  <h1 className="mb-4">Technical specifications</h1>
                  <div className="form-group">
                    <label htmlFor="name_field">Screen size</label>
                    <input
                      type="text"
                      id="screenSize_field"
                      className="form-control"
                      value={screensize}
                      onChange={(e) => setScreenSize(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="name_field">Screen Technology</label>
                    <input
                      type="text"
                      id="screenTechnology_field"
                      className="form-control"
                      value={screentechnology}
                      onChange={(e) => setScreenTechnology(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="name_field">Ram Capacity</label>
                    <input
                      type="text"
                      id="ramCapacity_field"
                      className="form-control"
                      value={ramcapacity}
                      onChange={(e) => setRamCapacity(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="name_field">Internal Memory</label>
                    <input
                      type="text"
                      id="internalMemory_field"
                      className="form-control"
                      value={internalmemory}
                      onChange={(e) => setInternalMemory(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="name_field">Battery</label>
                    <input
                      type="text"
                      id="battery_field"
                      className="form-control"
                      value={battery}
                      onChange={(e) => setBattery(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="name_field">Operating System</label>
                    <input
                      type="text"
                      id="operatingSystem_field"
                      className="form-control"
                      value={operatingsystem}
                      onChange={(e) => setOperatingSystem(e.target.value)}
                    />
                  </div>
                  {/*  */}
                  <div className="form-group">
                    <label htmlFor="brand_field">Material</label>
                    <select
                      className="form-control"
                      id="material_field"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                    >
                      <option>Select brand...</option>
                      {materials.map((material) => (
                        <option key={material} value={material}>
                          {material}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
