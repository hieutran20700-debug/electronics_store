class ProductVariant{
  constructor({
    sku,
    price,
    discountPrice = null,
    stock = 0,
    thumbnail = "",
    options = [], // [{ key: "Color", value: "Gold" }, { key: "RAM", value: "8GB" }]
  }) {
    if (!sku || !price) throw new Error("Variant requires SKU and Price");
    (this.sku = sku),
      (this.price = price),
      (this.discountPrice = discountPrice),
      (this.stock = stock),
      (this.thumbnail = thumbnail);
    this.options = options;
  }

  getFinalPrice() {
    return this.discountPrice && this.discountPrice < this.price
      ? this.discountPrice
      : this.price;
  }

  canSell(quantity = 1) {
    return this.stock >= quantity;
  }

  decreaseStock(quantity) {
    if (!this.canSell(quantity)) {
      throw new Error(`Variant ${this.sku} out of stock`);
    }
    this.stock -= quantity;
  }
}

module.exports = ProductVariant;
