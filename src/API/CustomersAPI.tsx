import instance from "../utils/interceptor";

/* ================= CUSTOMERS ================= */

/** Add Customer */
export async function AddCustomerApi(data) {
  const responseData = await instance.post(
    "api/customers/add-customer",
    data
  );
  return responseData;
}

/** Get All Customers */

export async function GetAllCustomersApi(params) {
    const responseData = await instance.get(
      "api/customers/list",
      { params }
    );
    return responseData;
  }

/** Get Single Customer */
export async function GetSingleCustomerApi(customerId) {
  const responseData = await instance.get(
    `api/customers/view/${customerId}`
  );
  return responseData;
}

/** Customer Stats */
export async function GetCustomerStatsApi() {
  const responseData = await instance.get(
    "api/customers/stats"
  );
  return responseData;
}

// --- Rebase Testing Need to remove this Duplicate After Sometime---

/** Customer Stats */
export async function GetCustomerStatsApi() {
  const responseData = await instance.get(
    "api/customers/stats"
  );
  return responseData;
}