<template>
  <section class="product-section" v-if="products && lengthCounter(products) > 0">
    <div class="container">
      <div class="title justify-content-between" :class="{ 'title-bg' : addons.includes('ishopet') }">
        <h1>Recently Viewed</h1>
      </div>
      <div :class="{ 'slider-arrows' : addons.includes('ishopet') }">
        <VueSlickCarousel class="recent-product-slider" v-bind="slick_settings" :rtl="settings.text_direction == 'rtl'">
          <div class="recent-product slider_div" v-for="(product,index) in products" :key="index">
            <div class="product-thumb">
              <a :href="getUrl('product/'+product.slug)"
                 @click.prevent="routerNavigator('product.details',product.slug)"><img :src="product.image_72x72"
                                                                                       :alt="product.product_name"
                                                                                       class="img-fluid"></a>
            </div>
            <div class="overlay">
              <h2><a class="text-ellipse" :href="getUrl('product/'+product.slug)"
                     @click.prevent="routerNavigator('product.details',product.slug)">{{ product.product_name }}</a>
              </h2>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div><!-- /.container -->
  </section><!-- /.product-section -->
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'


export default {
  name: "viewed_product",
  props: ['settings', 'addons'],
  components: {VueSlickCarousel},
  data: () => ({
    slick_settings: {
      "dots": false,
      "edgeFriction": 0.35,
      "infinite": true,
      "arrows": true,
      "autoplay": false,
      "slidesToShow": 8,
      "slidesToScroll": 4,
      "responsive": [
        {
          "breakpoint": 1024,
          "settings": {
            "slidesToShow": 4,
            "slidesToScroll": 4,
            "initialSlide": 1
          }
        },
        {
          "breakpoint": 768,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2,
            "initialSlide": 1
          }
        },
        {

          "breakpoint": 480,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2
          }
        },
        {

          "breakpoint": 320,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2
          }
        }
      ]
    },
    products: null
  }),
  computed: {
    getProducts() {
      axios.get(`${this.url}products`).then((response) => {
        this.is_shimmer = true
        if (response.data.error) {
          this.$Progress.fail();
          toastr.error(response.data.error, this.lang.Error + ' !!');
        } else {
          this.products = response.data.data
        }
      }).catch((error) => {
        this.loading = false;
        this.is_shimmer = true
        this.$Progress.fail();
        if (error.response && error.response.status == 422) {
          toastr.error(response.data.error, this.lang.Error + ' !!');
        }
      })

    }
  },
  created() {
    this.getProducts
  }
}
</script>
