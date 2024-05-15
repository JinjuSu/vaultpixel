<template>
  <div class="container">
    <div>
      <label for="search-bar" class="me-3">Search bar</label>
      <input type="text" />
      <div class="form-outline mb-4" data-mdb-input-init>
        <input type="search" class="form-control" id="datatable-search-input" />
        <label class="form-label" for="datatable-search-input">Search</label>
      </div>
      <div id="datatable"></div>
    </div>

    <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping"
        ><img
          src="../assets/search-icon.webp"
          alt="search-icon"
          class="image-search-icon"
      /></span>
      <input
        type="text"
        class="form-control"
        placeholder="search"
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
    </div>

    <div class="row">
      <div class="col-3">
        <!-- Filter column -->
        <h3>Find your safest vault</h3>
      </div>
      <div class="col-9">
        <div class="row">
          <!-- Product column 3 cards per row -->
          <div class="col"><h3>card 1</h3></div>
          <div class="col"><h3>card 2</h3></div>
          <div class="col"><h3>card 3</h3></div>
        </div>
        <div class="row">
          <!-- Product column 3 cards per row -->
          <div class="col"><h3>card 4</h3></div>
          <div class="col"><h3>card 5</h3></div>
          <div class="col"><h3>card 6</h3></div>
        </div>
        <div class="row">
          <!-- Product column 3 cards per row -->
          <div class="col"><h3>card 7</h3></div>
          <div class="col"><h3>card 8</h3></div>
          <div class="col"><h3>card 9</h3></div>
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
<style scoped>
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
</style>
