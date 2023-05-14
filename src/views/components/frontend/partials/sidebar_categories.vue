<template>
	<div :class="{ 'sidebar-active': smCategory }">
		<div v-if="addons__" class="categorie-menu" :class="{ 'ishopet-dp-menu' : addons__.includes('ishopet') }">
			<div class="categorie-menu-content">
				<ul class="global-list" v-if="addons__ && lengthCounter(visibleCategory) > 0 && !(home && addons__.includes('ishopet'))">
					<li>
						<router-link :to="{ name: 'campaigns' }">
							<span class="mdi mdi-view-dashboard-outline mdi-18px"></span>
              All Offers
						</router-link>
					</li>
					<li class="active" v-for="(category, index) in visibleCategory" :key="index" :class="{ 'sg-dropdown': category.child_categories.length > 0 }">
						<router-link :to="{ name: 'product.by.category', params: { slug: category.slug } }">
							<span :class="[category.icon]" class="mdi-18px" v-if="category.icon"></span>
							<span v-else class="mdi mdi-view-dashboard-outline mdi-18px"></span>
							{{ category.title }}
						</router-link>
						<span class="icon mdi mdi-name mdi-chevron-down" v-if="category.child_categories.length > 0"></span>
						<div v-if="category.child_categories.length > 0" class="sg-dropdown-menu">
							<div class="row">
								<div :class="[category.latest_product ? 'col-lg-9' : 'col-lg-12']">
									<div class="row">
										<div class="col-lg-4" v-for="(child_category, child_index) in category.child_categories" :key="child_index">
											<h3>
												<router-link :to="{ name: 'product.by.category', params: { slug: child_category.slug } }">
													{{ child_category.title }}
												</router-link>
											</h3>
											<ul class="global-list" v-if="child_category.categories.length > 0">
												<li v-for="(children_category, cat_index) in child_category.categories" :key="cat_index">
													<router-link :to="{ name: 'product.by.category', params: { slug: children_category.slug } }">
														{{ children_category.title }}
													</router-link>
												</li>

											</ul>
										</div>
									</div>
								</div>
              </div><!-- /.row -->
						</div>
					</li>
					<li class="last-menu-item" v-if="addons__ && !addons__.includes('ishopet')">
						<router-link :to="{ name: 'categories' }">
							All Offers
							<span class="mdi mdi-name mdi-chevron-right"></span
						></router-link>
					</li>
				</ul>
        <ul class="global-list" v-else-if="addons__ && home && addons__.includes('ishopet')">
          <li class="active" v-for="(menu, index) in headerMenu" :key="index" :class="{ 'sg-dropdown': Object.keys(menu).length > 2 }" @click="$parent.toggleCategory">
            <a v-if="urlCheck(menu.url)" :href="menu.url">{{ menu.label }}</a>
            <router-link v-else :to="menu.url" :class="{ active: menu.url == $route.fullPath }"> {{ menu.label }}</router-link>
            <span v-if="Object.keys(menu).length > 2" class="icon mdi mdi-name mdi-chevron-down"></span>
            <div v-if="Object.keys(menu).length > 2" class="sg-dropdown-menu">
							<ul>
								<li v-for="(sub_menu, j) in menu" :key="'sub_menu' + j" v-if="sub_menu.url">
									<a v-if="urlCheck(sub_menu.url)" :href="sub_menu.url">{{ sub_menu.label }}</a>
									<router-link v-else :to="sub_menu.url">{{ sub_menu.label }}</router-link>
								</li>
							</ul>
            </div>
          </li>
        </ul>
				<ul class="global-list" v-else-if="addons__ && sidebarCategory">
					<li v-for="(seller, index) in addons__.includes('ishopet') ? 7 : 11" :key="index">
						<a href="javascript:void(0)" class="shimmer">
							<span><shimmer :height="23"></shimmer></span>
							<shimmer :height="23"></shimmer>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import shimmer from "../partials/shimmer";

export default {
	name: "sidebar_categories",
	props: ["slider",'home'],
	components: { shimmer },
	data() {
		return {
			mobile_child_id: 0,
			mobile_children_id: 0,
      siteSettings: null,

    };
	},
	mounted() {
    let navBar = '';
    if (this.addon__ && this.addons__.includes('ishopet')) {
      navBar = document.getElementById("middle_nav");
    }
    else{
      navBar = document.getElementById("nav");
    }
    if (navBar) {
      window.onscroll = () => {
        this.active = window.scrollY > navBar.offsetTop;
        this.$store.dispatch("navbarClass", this.active);
      };
    }

		if (this.visibleCategory.length == 0 && this.home == 1){
			this.loadCategory();
		}
	},
	computed: {
    addons__() {
      if(this.siteSettings){
        let addons = this.siteSettings.addons;
        return addons.length > 0 ? `addons` : [];
      }

    },
		visibleCategory() {
			let categories = this.$store.getters.getCategories;
			return categories.length > 0 ? categories : [];
		},
		defaultCategoryShow() {
			return this.$store.getters.getDefaultCategory;
		},
		sidebarCategory() {
			return this.$store.getters.getSidebarCategory;
		},
		smCategory() {
			return this.$store.getters.getSmCategory;
		},
    headerMenu() {
      let header_menu = this.siteSettings.settings.header_menu;
      return header_menu.length > 0 ? header_menu : [];
    },
  },
	methods: {
		loadCategory() {
			let url = this.getUrl("sidebar/categories");
			axios.get(url).then((response) => {
				if (response.data.error) {
					toastr.error(response.data.error, this.lang.Error + " !!");
				} else {
					this.$store.commit("setSidebar", false);
					this.$store.dispatch("categories", response.data.categories);
				}
			});
		},

	},
  created() {
    let url = 'http://127.0.0.1:8000/api/' + 'settings';
    if (this.page != 1) {
      this.loading = true;
    }
    this.$Progress.start();
    axios.get(url).then((response) => {
      this.is_shimmer = true
      if (response.data.error) {
        this.$Progress.fail();
        toastr.error(response.data.error, this.lang.Error + ' !!');
      } else {
        if (this.page != 1) {
          this.loading = false
        }
        this.siteSettings = response.data.data
        this.next_page_url = response.data.categories.next_page_url;
        this.page++;
        this.$Progress.finish();
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
};
</script>

<style scoped></style>
