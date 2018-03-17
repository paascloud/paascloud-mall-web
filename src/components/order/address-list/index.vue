<template>
  <div>
    <div :class="{'address-item': true, 'active': index === currentAddressIndex}" @click="currentAddressIndex = index"
         data-id="address.id" v-for="(address, index) in  addressList" :key="address.id">
      <div class="address-title">
        {{address.provinceName}} {{address.cityName}} ({{address.receiverName}} 收)

      </div>
      <div class="address-detail">
        {{address.receiverAddress}} {{address.receiverPhoneNo}}
      </div>
      <div class="address-opera">
        <span class="link address-default" v-if="address.defaultAddress === 0" @click="setDetailAddress(address.id)">设置默认</span>
        <span class="link address-default" v-if="address.defaultAddress === 1" @click="setDetailAddress(address.id)">默认地址</span>
        <span class="link address-update" onclick="alert('本功能暂未开放')">编辑</span>
        <span class="link address-delete" onclick="alert('本功能暂未开放')">删除</span>
      </div>
    </div>
    <div class="address-add" onclick="alert('本功能暂未开放')">
      <div class="address-new">
        <i class="fa fa-plus"></i>
        <div class="text">使用新地址</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      addressList: {
        type: Array,
        required: false
      },
      selectAddress: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        currentAddressIndex: -1
      };
    },
    created() {
      this.setCurrentAddressIndex();
    },
    activated() {
      this.setCurrentAddressIndex();
    },
    methods: {
      setDetailAddress(addressId) {
        for (let address of this.addressList) {
          if (address.id === addressId) {
            address.defaultAddress = 1;
          } else {
            address.defaultAddress = 0;
          }
        }
      },
      setCurrentAddressIndex() {
        for (let i = 0; i < this.addressList.length; i++) {
          if (this.addressList[i].defaultAddress) {
            this.currentAddressIndex = i;
          }
        }
        if (this.currentAddressIndex === -1) {
          this.currentAddressIndex = 0;
        }
      }
    },
    components: {},
    watch: {
      currentAddressIndex: {
        handler: function (val, oldVal) {
          if (this.addressList[val]) {
            this.selectAddress(this.addressList[val].id);
          }
        }
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
