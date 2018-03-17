<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">PCMall</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="order-list-wrap w">
      <pc-nav-side/>
      <div class="content with-nav">
        <div class="panel">
          <div class="panel-title">{{$route.meta.name}}</div>
          <div class="panel-body">
            <div class="order-list-con">
              <pc-order-list :orderVoList="orderVoList"/>
            </div>
            <div class="pagination">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from 'components/layout/nav-side';
  import pcOrderList from 'components/order/order-list';

  export default {
    data() {
      return {
        orderVoList: []
      };
    },
    created() {
    },
    activated() {
      this.queryOrderItemVoList();
    },
    methods: {
      queryOrderItemVoList() {
        this.ajax({
          url: `/omc/order/queryUserOrderListWithPage`,
          data: {
            pageNum: 1,
            pageSize: 10
          },
          success: (res) => {
            if (res.code === 200) {
              this.orderVoList = res.result.list;
            }
          }
        });
      }
    },
    components: {
      pcNavSide,
      pcOrderList
    }
  };
</script>
