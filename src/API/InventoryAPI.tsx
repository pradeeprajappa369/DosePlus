import instance from "../utils/interceptor";

/* ================= INVENTORY ================= */

/** Add Product */
export async function AddProductApi(data) {
  const responseData = await instance.post(
    "api/inventory/add-product",
    data
  );
  return responseData;
}

/** Update Product */
export async function UpdateProductApi(data) {
  const responseData = await instance.put(
    "api/inventory/update-product",
    data
  );
  return responseData;
}

/** Delete Product */
export async function DeleteProductApi(data) {
  const responseData = await instance.delete(
    "api/inventory/delete-product",
    { data }
  );
  return responseData;
}

/** Get All Products */
export async function GetAllProductsApi() {
  const responseData = await instance.get(
    "api/inventory/get-products"
  );
  return responseData;
}

/** Filter Products
 * example params:
 * { category: "over-the-counter", stock: "in-stock" }
 */
export async function FilterProductsApi(params) {
  const responseData = await instance.get(
    "api/inventory/filter",
    { params }
  );
  return responseData;
}
