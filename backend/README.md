# Zosh Bazaar Backend API Documentation

This document covers **all currently exposed backend APIs** in `backend/src/index.js`, including request shape, auth requirement, and response examples based on the present controller implementation.

## Base Info

- **Base URL (local):** `http://localhost:5000`
- **Content-Type:** `application/json`
- **Auth header (customer/admin):** `Authorization: Bearer <jwt>`
- **Auth header (seller):** `Authorization: Bearer <jwt>`

## Standard Runtime Responses

### Health / Root

### `GET /`
Returns welcome message.

**200 Response**
```json
{
  "message": "Welcome to the zosh bazzaar backend system!"
}
```

### Unknown Route
Any undefined path returns:

**404 Response**
```json
{
  "error": "Route not found",
  "method": "GET",
  "path": "/unknown",
  "message": "Cannot GET /unknown"
}
```

---

## Auth APIs (`/auth`)

### `POST /auth/signup`
Create customer account.

**Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "mobile": "9876543210"
}
```

**200 Response**
```json
{
  "jwt": "<token>",
  "message": "User created successfully",
  "role": "ROLE_CUSTOMER"
}
```

**400 Response**
```json
{
  "message": "<error message>"
}
```

### `POST /auth/signin`
Login customer.

**Body**
```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**200 Response (example)**
```json
{
  "jwt": "<token>",
  "message": "Login Success",
  "role": "ROLE_CUSTOMER"
}
```

**404/500 Response**
```json
{
  "message": "<error message>"
}
```

---

## User APIs (`/users`)

### `GET /users/profile`
Get logged-in user profile.

- **Auth:** Customer/Admin Bearer token required.

**200 Response**
Returns full user object from middleware/service.

**404/500 Response**
```json
{
  "message": "<error message>"
}
```

---

## Seller APIs (`/sellers`)

### `POST /sellers`
Register seller account.

**Body (required core fields)**
```json
{
  "sellerName": "My Store",
  "mobile": 9999999999,
  "email": "seller@example.com",
  "password": "secret123",
  "GSTIN": "22AAAAA0000A1Z5",
  "bussnessDetails": {
    "bussnessName": "My Store Pvt Ltd",
    "bussnessEmail": "biz@example.com",
    "bussnessMobile": "9999999999",
    "bussnessAddress": "City Center"
  },
  "bankDetails": {
    "accountNumber": "1234567890",
    "accountHolderName": "My Store",
    "bankName": "HDFC",
    "ifscCode": "HDFC0001234"
  }
}
```

**200 Response**
```json
{
  "message": "Seller created successfully",
  "jwt": "<token>",
  "role": "ROLE_SELLER"
}
```

### `POST /sellers/login`
Seller login.

**Body**
```json
{
  "email": "seller@example.com",
  "password": "secret123"
}
```

**200 Response**
```json
{
  "message": "Login Success",
  "jwt": "<token>",
  "role": "ROLE_SELLER"
}
```

### `GET /sellers`
Get all sellers.

**Query (optional)**
- `status` (account status)

**200 Response**
Returns seller array.

### `GET /sellers/profile`
Get logged-in seller profile.

- **Auth:** Seller Bearer token required.

**200 Response**
Returns seller profile object.

### `PATCH /sellers`
Update logged-in seller profile.

- **Auth:** Seller Bearer token required.

**Body**
Partial seller fields.

**200 Response**
```json
{
  "message": "seller updated successfully",
  "seller": {
    "_id": "..."
  }
}
```

---

## Admin APIs (`/admin`)

### `PATCH /admin/seller/:id/status/:status`
Update seller account status.

**Path params**
- `id`: Seller ID
- `status`: e.g. `ACTIVE`, `SUSPENDED`, etc.

**200 Response**
Returns updated seller object.

---

## Product APIs (`/products`)

### `GET /products/search?q=<text>`
Search products by title (case-insensitive).

**200 Response**
Returns product array.

### `GET /products`
Get products with optional filters.

**Query params (all optional)**
- `category`
- `color`
- `minPrice`
- `maxPrice`
- `minDiscount`
- `size`
- `sort` (`price_low` / `price_high`)
- `pageNumber`
- `sellersOnly` (`true`/`false`)

**200 Response**
```json
{
  "content": [
    {
      "_id": "...",
      "title": "T-Shirt"
    }
  ],
  "totalPages": 2,
  "totalElement": 15
}
```

### `GET /products/:productId`
Get one product by ID.

**200 Response**
Returns product object.

**400 Response**
```json
{
  "error": "Product Not found"
}
```

---

## Seller Product APIs (`/sellers/products`)

All endpoints below require **seller auth**.

### `GET /sellers/products`
Get products created by logged-in seller.

**200 Response**
Returns product array.

### `POST /sellers/products`
Create product.

**Body**
```json
{
  "title": "Running Shoes",
  "description": "Lightweight shoes",
  "mrpPrice": 2999,
  "sellingPrice": 1999,
  "quantity": 50,
  "color": "Black",
  "images": ["https://..."],
  "sizes": "8",
  "category": "men",
  "category2": "footwear",
  "category3": "running-shoes"
}
```

**201 Response**
Returns created product object.

### `PATCH /sellers/products/:productId`
Update product.

**Body**
Any editable product fields.

**200 Response**
Returns updated product object.

### `DELETE /sellers/products/:productId`
Delete product.

**200 Response**
```json
{
  "message": "Product deleted successfully."
}
```

---

## Cart APIs (`/cart`)

All endpoints require **customer auth**.

### `GET /cart`
Get current user cart.

**200 Response**
Returns cart object with items and totals.

### `PUT /cart/add`
Add item to cart.

**Body**
```json
{
  "productId": "<productId>",
  "size": "M",
  "quantity": 2
}
```

**202 Response**
Returns created cart item.

### `PUT /cart/item/:cartItemId`
Update cart item quantity.

**Body**
```json
{
  "quantity": 3
}
```

**202 Response**
Returns updated cart item.

### `DELETE /cart/item/:cartItemId`
Remove cart item.

**202 Response**
```json
{
  "message": "Item removed from cart"
}
```

---

## Order APIs (`/orders`)

All endpoints require **customer auth** unless specified.

### `POST /orders?paymentMethod=RAZORPAY`
Create order(s) from current cart and generate payment link.

**Body**
```json
{
  "shippingAddress": {
    "name": "John",
    "mobile": "9999999999",
    "address": "Street 1",
    "city": "Pune",
    "state": "MH",
    "pinCode": "411001",
    "locality": "Kothrud"
  }
}
```

**200 Response**
```json
{
  "payment_link_url": "https://rzp.io/i/..."
}
```

### `GET /orders/user`
Get logged-in user order history.

**200 Response**
Returns order array.

### `GET /orders/:orderId`
Get order details.

**200 Response**
Returns order object.

### `GET /orders/item/:orderItemId`
Get order item details.

**200 Response**
Returns order item object.

### `PUT /orders/:orderId/cancel`
Cancel order.

**Current implementation response (as-is):**
```json
{
  "error": "<runtime error message>"
}
```

**Note:** this endpoint currently returns an `error` field even on 200 due to controller implementation.

---

## Seller Order APIs (`/sellers/orders`)

All endpoints require **seller auth**.

### `GET /sellers/orders`
Get seller’s orders.

**200 Response**
Returns order array for current seller.

### `PATCH /sellers/orders/:orderId/status/:orderStatus`
Update order status.

**200 Response**
Returns updated order object.

---

## Payment APIs (`/payment`)

### `GET /payment/:paymentId?paymentLinkId=<id>`
Handle payment success callback.

- **Auth:** Customer Bearer token required.

**201 Response**
```json
{
  "message": "Payment successfull"
}
```

**400 Response**
```json
{
  "message": "Payment failed"
}
```

---

## Transaction APIs (`/transactions`)

### `GET /transactions/seller`
Get seller transaction list.

- **Auth:** Seller Bearer token required.

**200 Response**
Returns transaction array.

---

## Seller Report APIs (`/sellers/report`)

### `GET /sellers/report/`
Get seller analytics/report.

- **Auth:** Seller Bearer token required.

**200 Response**
Returns report object:
```json
{
  "seller": "<sellerId>",
  "totalEarnings": 0,
  "totalSales": 0,
  "totalRefunds": 0,
  "totalTax": 0,
  "netEarnings": 0,
  "totalOrders": 0,
  "canceledOrders": 0,
  "totalTransactions": 0
}
```

---

## Home Category APIs (`/home`)

### `POST /home/categories`
Bulk create home categories and homepage composition.

**Body**
Array of category objects.

**202 Response**
Returns homepage data object.

### `POST /home/home-category`
Create one home category.

**Body**
```json
{
  "name": "Electronics",
  "image": "https://...",
  "categoryId": "electronics",
  "section": "GRID"
}
```

**201 Response**
Returns created home category object.

### `GET /home/home-category`
Get all home categories.

**200 Response**
Returns home category array.

### `PATCH /home/home-category/:id`
Update one home category.

**Body**
Partial/complete category payload.

**200 Response**
Returns updated home category object.

---

## Deal APIs (`/admin/deals`)

### `GET /admin/deals`
Get all deals.

**200 Response**
Returns deal array.

### `POST /admin/deals`
Create deal.

**Body**
```json
{
  "discount": 30,
  "category": "<homeCategoryId>"
}
```

**201 Response**
Returns created deal object.

### `PATCH /admin/deals/:id`
Update deal.

**Body**
Partial/complete deal fields.

**200 Response**
Returns updated deal object.

### `DELETE /admin/deals/:id`
Delete deal.

**202 Response**
```json
{
  "message": "Deal deleted successfully"
}
```

---

## Chat API (`/chat`)

### `POST /chat/chatbot`
AI product Q&A (Gemini).

**Body**
```json
{
  "product": {
    "title": "Running Shoes",
    "sellingPrice": 1999,
    "description": "Lightweight"
  },
  "userMessage": "Is this good for jogging?",
  "chatHistory": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello" }
  ]
}
```

**200 Response**
```json
{
  "reply": "Yes, based on the product description..."
}
```

**400 Response**
```json
{
  "error": "Product data and message are required"
}
```

**503 Response**
```json
{
  "error": "Chatbot unavailable"
}
```

---

## Address APIs (`/addresses`)

All endpoints require **customer auth**.

### `POST /addresses`
Create address.

**Body**
```json
{
  "name": "John",
  "mobile": "9999999999",
  "address": "Street 1",
  "city": "Pune",
  "state": "MH",
  "pinCode": "411001",
  "locality": "Kothrud"
}
```

**201 Response**
```json
{
  "success": true,
  "data": {
    "_id": "..."
  },
  "message": "Address created successfully"
}
```

### `GET /addresses/:addressId`
Get address by ID.

**200 Response**
```json
{
  "success": true,
  "data": {
    "_id": "..."
  }
}
```

**404 Response**
```json
{
  "success": false,
  "message": "Address not found"
}
```

### `GET /addresses`
Get all addresses for current user.

**200 Response**
```json
{
  "success": true,
  "data": []
}
```

---

## Review APIs (`/reviews`)

### `POST /reviews/product/create`
Create product review.

- **Auth:** Customer Bearer token required.

**Body**
```json
{
  "productId": "<productId>",
  "reviewText": "Great product",
  "rating": 5
}
```

**201 Response**
Returns created review object.

### `GET /reviews/product/:productId`
Get all reviews for product.

**200 Response**
Returns reviews array (with user populated: `fullName`, `email`).

---

## Wishlist APIs (`/wishlist`)

All endpoints require **customer auth**.

### `GET /wishlist`
Get user wishlist.

**200 Response (no wishlist yet)**
```json
{
  "wishlistItems": []
}
```

**200 Response (existing wishlist)**
Returns wishlist object with populated `wishlistItems.product`.

### `POST /wishlist/add`
Add product to wishlist.

**Body**
```json
{
  "productId": "<productId>",
  "size": "M"
}
```

**200 Response**
Returns updated wishlist object.

### `PUT /wishlist/remove/:productId`
Remove product from wishlist.

**200 Response**
Returns updated wishlist object.

---

## Coupon APIs (`/coupons`)

### Admin Coupon Endpoints
All below currently use customer auth middleware; no explicit role check in route/controller.

#### `POST /coupons/admin/create`
Create coupon.

**Body**
```json
{
  "code": "SAVE10",
  "discountPercentage": 10,
  "validityStartDate": "2026-01-01T00:00:00.000Z",
  "validityEndDate": "2026-12-31T23:59:59.000Z",
  "minimumOrderValue": 1000
}
```

**201 Response**
Returns created coupon object.

#### `GET /coupons/admin/all`
Get all coupons.

**200 Response**
Returns coupon array.

#### `DELETE /coupons/admin/delete/:id`
Delete coupon.

**200 Response**
```json
{
  "message": "Coupon deleted successfully"
}
```

**404 Response**
```json
{
  "error": "Coupon not found"
}
```

### Customer Coupon Endpoint

#### `POST /coupons/apply`
Apply coupon to cart/order value.

**Body**
```json
{
  "code": "SAVE10",
  "orderValue": 2500
}
```

**200 Response (example)**
```json
{
  "_id": "<cartId>",
  "cartItems": [],
  "couponCode": "SAVE10",
  "couponDiscount": 250,
  "totalDiscountedPrice": 2250,
  "message": "Coupon applied! You saved ₹250.00"
}
```

**Common Error Responses**
```json
{
  "error": "Coupon code and order value are required"
}
```
```json
{
  "error": "Invalid coupon code"
}
```
```json
{
  "error": "Coupon has expired or not yet valid"
}
```
```json
{
  "error": "Minimum order value of ₹1000 required"
}
```

---

## Authentication & Error Notes

- Missing/invalid token from middleware:
```json
{
  "message": "Invalid token, Authorization failed."
}
```
(status `401`)

- Most controllers return `500` with one of:
```json
{ "message": "<error>" }
```
or
```json
{ "error": "<error>" }
```

- Response envelopes are not fully standardized across modules (some raw arrays/objects, some wrapped).

---

## Quick Endpoint Index

- `GET /`
- `POST /auth/signup`
- `POST /auth/signin`
- `GET /users/profile`
- `POST /sellers`
- `POST /sellers/login`
- `GET /sellers`
- `GET /sellers/profile`
- `PATCH /sellers`
- `PATCH /admin/seller/:id/status/:status`
- `GET /products/search`
- `GET /products`
- `GET /products/:productId`
- `GET /sellers/products`
- `POST /sellers/products`
- `PATCH /sellers/products/:productId`
- `DELETE /sellers/products/:productId`
- `GET /cart`
- `PUT /cart/add`
- `PUT /cart/item/:cartItemId`
- `DELETE /cart/item/:cartItemId`
- `POST /orders`
- `GET /orders/user`
- `GET /orders/:orderId`
- `GET /orders/item/:orderItemId`
- `PUT /orders/:orderId/cancel`
- `GET /sellers/orders`
- `PATCH /sellers/orders/:orderId/status/:orderStatus`
- `GET /payment/:paymentId`
- `GET /transactions/seller`
- `GET /sellers/report/`
- `POST /home/categories`
- `POST /home/home-category`
- `GET /home/home-category`
- `PATCH /home/home-category/:id`
- `GET /admin/deals`
- `POST /admin/deals`
- `PATCH /admin/deals/:id`
- `DELETE /admin/deals/:id`
- `POST /chat/chatbot`
- `POST /addresses`
- `GET /addresses/:addressId`
- `GET /addresses`
- `POST /reviews/product/create`
- `GET /reviews/product/:productId`
- `GET /wishlist`
- `POST /wishlist/add`
- `PUT /wishlist/remove/:productId`
- `POST /coupons/admin/create`
- `GET /coupons/admin/all`
- `DELETE /coupons/admin/delete/:id`
- `POST /coupons/apply`
