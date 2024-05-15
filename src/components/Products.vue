<template>
  <div class="container my-5">
    <!-- Search bar -->
    <div class="form-outline mb-4" data-mdb-input-init>
      <input
        type="search"
        class="form-control border"
        id="datatable-search-input"
      />
      <label class="form-label" for="datatable-search-input">Search</label>
    </div>

    <!-- Products list -->
    <div>
      <div class="row">
        <div class="col-3">
          <!-- Filter column -->
          <h3>Find your safest vault</h3>
          <div>
            <!-- Filter by Type -->
            <div class="row my-3">
              <div class="col-auto me-auto">Type</div>
              <div class="col-auto">
                <div type="button">
                  <img
                    src="../assets/icons/arrow-icon-up.webp"
                    alt="arrow-up"
                    class="image-icon"
                  />
                </div>
              </div>
            </div>
            <hr />
            <!-- Filter by Brand -->
            <div class="row my-3">
              <div class="col-auto me-auto">Brand</div>
              <div class="col-auto">
                <div type="button">
                  <img
                    src="../assets/icons/arrow-icon-up.webp"
                    alt="arrow-up"
                    class="image-icon"
                  />
                </div>
              </div>
            </div>
            <hr />
            <!-- Filter by Price -->
            <div class="row my-2">
              <div class="col-auto me-auto">Price</div>
              <div class="col-auto">
                <div type="button">
                  <img
                    src="../assets/icons/arrow-icon-up.webp"
                    alt="arrow-up"
                    class="image-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Product column 3 cards per row -->
        <div class="col-9">
          <div class="row">
            <div class="col">
              <div class="card">
                <div
                  class="bg-image hover-overlay"
                  data-mdb-ripple-init
                  data-mdb-ripple-color="light"
                >
                  <img
                    src="../assets/wallets/Ledger_Nano_X_WVRPS.webp"
                    class="img-fluid"
                  />
                  <a href="#!">
                    <div
                      class="mask"
                      style="background-color: rgba(251, 251, 251, 0.15)"
                    ></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Ledger Nano S</h5>
                  <p class="card-text">AU$ 299.99</p>
                  <p class="text-warning">rating stars</p>
                  <a
                    href="#!"
                    class="btn btn-sm btn-dark button-shop"
                    data-mdb-ripple-init
                    >Shop now</a
                  >
                </div>
              </div>
            </div>
            <div class="col"><h3>card 2 let vue fetch it by loop</h3></div>
            <div class="col"><h3>card 2 let vue fetch it by loop</h3></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductComp",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> -->
