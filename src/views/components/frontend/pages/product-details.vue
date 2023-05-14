<template>
    <div class="sg-page-content" v-if="product">
        <section class="product-details">
            <div class="container">
                <details-view :productDetails="product"></details-view>
            </div><!-- /.container -->
        </section><!-- /.product-details -->
        <section class="products-section"
                 v-if="product.related_products && product.related_products.length > 0">
            <div class="container">
                <div class="title justify-content-between">
                    <h1>{{lang.related_products}}</h1>
                </div>
                <product :products="product.related_products" :grid_class="'grid-6'"></product>
            </div><!-- /.container -->
        </section>
    </div>
</template>

<script>

import product from "./product";
import detailsView from "../partials/details-view";

export default {
    name: "product-details",
    components: {product, detailsView},
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            slug:{
              product_slug: this.$route.params.slug
            },
            product: ''

        }

    },
    watch: {
        $route() {
          let set_params = {
            slug: this.$route.params.slug,
            referral_code : this.$route.query.referral_code
          }
            if (!this.productDetails) {
                this.$store.dispatch('productDetails', set_params);
            }
        }
    },
    created(){
        this.productDetails
    },
    mounted() {
      let set_params = {
        slug: this.$route.params.slug,
        referral_code : this.$route.query.referral_code
      }
      this.$store.dispatch('productView',this.slug);
        if (!this.productDetails) {
            this.$store.dispatch('productDetails', set_params);
        }

    },
    computed: {
        productDetails() {
			axios.get(`${this.url2}clothes/${this.$route.params.slug}`).then((response) => {
				this.is_shimmer = true
				if (response.data.error) {
					this.$Progress.fail();
					toastr.error(response.data.error, this.lang.Error + ' !!');
				} else {
                    console.log(this.product)
				    this.product = response.data.data
				}
			}).catch((error) => {
				this.loading = false;
				this.is_shimmer = true
				this.$Progress.fail();
				if (error.response && error.response.status == 422) {
					toastr.error(response.data.error, this.lang.Error + ' !!');
				}
			})
        },
    },
    methods: {
        countDownTimer() {
            const now = new Date().getTime();
            // let startOfDay = new Date(now - (now % 86400000)).toUTCString();
            let end_time = new Date(now - (now % 86400000) + 86400000); //2022-12-25 09:33:00
            let final_end_time = '';
            final_end_time += end_time.getFullYear() + '-';
            final_end_time += end_time.getMonth() + 1 + '-';
            final_end_time += end_time.getDate() - 1 + ' ';
            final_end_time += '23:';
            final_end_time += '59:';
            final_end_time += '59';
            return final_end_time;
        },

    }
}
</script>
