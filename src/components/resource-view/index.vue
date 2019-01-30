<template>
  <div class="napp-resource-view-wrapper">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          Showing
        </div>
        <div class="level-item">
          <div class="select">
            <select>
              <option> 20 </option>
            </select>
          </div>
        </div>
        <div class="level-item">
          Entries
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <router-link class="button app-form-create" :to="createRoute"> Create </router-link>
        </div>
      </div>
    </nav>
    <table class="table is-fullwidth napp-resource-table">
      <thead>
        <slot name="table-column-header" />
      </thead>
      <tfoot>
        <slot name="table-column-header" />
      </tfoot>
     <tbody>
       <slot name="table-row" />
     </tbody>
    </table>
    <div class="napp-resource-card"> 
      <slot name="card-row" />
    </div>
    <nav class="level">
      <div class="level-left">
        <router-link
          v-if="beforeIdPrev !== false"
          :to="{ name: 'payment-list', query: { beforeId: beforeIdPrev }}"
        >
          <div class="button">Prev</div>
        </router-link>
      </div>
      <div class="level-right">
        <router-link
          v-if="beforeIdNext !== false"
          :to="{ name: 'payment-list', query: { beforeId: beforeIdNext }}"
        >
          <div class="button">Next</div>
        </router-link>
      </div>
    </nav>
  </div>
</template>
<style lang="less">
@import (reference, less) url("../../theme/core.less");
@import (less, reference) url("../../theme/form.less");
/* Only Show Table in IPAD and Above */
.napp-resource-table {
  display: none;
  @media @desktop {
    display: block;
  }
  @media @tablet {
    display: block;
  }
}
.napp-resource-card {
  display: block;
  @media @desktop {
    display: none;
  }
  @media @tablet {
    display: none;
  }
}

</style>
<script>
import storeFactory from './store';

export default {
  data() { 
    return {
      resourceStore: false,
    };
  },
  components: {
  },
  mounted() {
    this.$nextTick(this.loaded);
  },
  computed: {
    beforeIdNext() {
      return this.resourceStore ? this.resourceStore.getters.beforeIdNext : false;
    },
    beforeIdPrev() {
      return this.resourceStore ? this.resourceStore.getters.beforeIdPrev : false;
    },
    pageView() {
      return this.resourceStore ? this.resourceStore.getters.pageView : [];
    },
  },
  props: [
    'beforeId',
    'createRoute',
    'endpoint',
  ], 
  watch: {
    $route(to, from) {
      this.loaded();
    },
    pageView(to, from) {
      this.$emit('pageViewChange', to);
    },
  },
  methods: {
    loaded() {
      if (this.resourceStore === false) {
        if(typeof this.endpoint !== 'undefined' && this.endpoint !== null) {
          this.resourceStore = storeFactory(this.endpoint);
          if (this.beforeId !== null && typeof this.beforeId !== 'undefined') {
            this.resourceStore.dispatch('getResource', { beforeId: this.beforeId });
          } else {
            this.resourceStore.dispatch('getResource', { beforeId: 0 });
          }
        }
      } else {
        if (this.beforeId !== null && typeof this.beforeId !== 'undefined') {
          this.resourceStore.dispatch('getResource', { beforeId: this.beforeId });
        } else {
          this.resourceStore.dispatch('getResource', { beforeId: 0 });
        }
      }
    },
  }
};
</script>
