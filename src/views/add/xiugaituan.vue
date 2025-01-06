<template>
    <div class="container-part">
        <form>
      <label for="groupNumber">团号：</label>
      <input type="text" id="groupNumber" v-model="form.groupNumber" />

      <label for="stuan">单团：</label>
      <select id="stuan" v-model="form.stuan">
        <option value="NO">否</option>
        <option value="YES">是</option>
      </select>

      <label for="departureDate">出发日期：</label>
      <input type="date" id="departureDate" v-model="form.departureDate" />

      <label for="returnDate">返程日期：</label>
      <input type="date" id="returnDate" v-model="form.returnDate" />

      <label for="seat">席位：</label>
      <input type="text" id="seat" v-model="form.seat" />

      <label for="airline">航空公司： </label>
      <select id="airline" v-model="form.airline">
        <option value="Airline A">Airline A</option>
        <option value="Airline B">Airline B</option>
        <option value="Airline C">Airline C</option>
      </select>

      <label for="goairline">去程航班：</label>
      <input type="text" id="goairline" v-model="form.goairline" />

      <label for="backairline">回程航班：</label>
      <input type="text" id="backairline" v-model="form.backairline" />

      <label for="price">价格：</label>
      <input type="text" id="price" v-model="form.price" />

      <label for="submission_people">送签员： </label>
      <select id="submission_people" v-model="submission_people">
        <option value="submission_people1">送签员1</option>
        <option value="submission_people2">送签员2</option>
        <option value="submission_people3">送签员3</option>
      </select>

      <label for="submission_nation">送签国：</label>
      <input type="text" id="submission_nation" v-model="form.submission_nation" />

      <label for="caozuo">操作： </label>
      <select id="caozuo" v-model="caozuoe">
        <option value="caozuo1">操作1</option>
        <option value="caozuo2">操作2</option>
        <option value="caozuo3">操作3</option>
      </select>

      <label for="ticket">票务： </label>
      <select id="ticket" v-model="ticket">
        <option value="ticket1">票务1</option>
        <option value="ticket2">票务2</option>
        <option value="ticket3">票务3</option>
      </select>

      <label for="diqu">目的地区域： </label>
      <select id="diqu" v-model="diqu">
        <option value="diqu1">欧洲团</option>
        <option value="diqu2">澳洲团</option>
      </select>

      <label for="chufadi">出发地：</label>
      <input type="text" id="chufadi" v-model="form.chufadi" />

      <label for="zutuanshe">组团社： </label>
      <select id="zutuanshe" v-model="zutuanshe">
        <option value="zutuanshe1">组团社1</option>
        <option value="zutuanshe2">组团社2</option>
      </select>

      <label for="guide">领队： </label>
      <select id="guide" v-model="guide">
        <option value="guide1">领队1</option>
        <option value="guide2">领队2</option>
        <option value="guide3">领队2</option>
      </select>

      <label for="daoyou">导游： </label>
      <select id="daoyou" v-model="daoyou">
        <option value="daoyou1">导游1</option>
        <option value="daoyou2">导游2</option>
        <option value="daoyou3">导游2</option>
      </select>
      
      <label for="shichangprice">市场价格：</label>
      <input type="text" id="shichangprice" v-model="form.shichangprice" />

      
      <label for="maxprice">最多优惠价格：</label>
      <input type="text" id="maxprice" v-model="form.maxprice" />

      <label for="addprice">附加费： </label>
      <select id="addprice" v-model="addprice">
        <option value="addprice1">附加费1</option>
        <option value="addprice2">附加费2</option>
        <option value="addprice3">附加费3</option>
      </select>

      <label for="huodong">参加的促销活动： </label>
      <select id="huodong" v-model="huodong">
        <option value="huodong1">活动1</option>
        <option value="huodong2">活动2</option>
        <option value="huodong3">活动3</option>
      </select>

      <label for="plan">行程简介：</label>
      <input type="text" id="plan" v-model="form.plan" />

      <label for="beizhu">备注：</label>
      <input type="text" id="beizhu" v-model="form.beizhu" />

      <label for="address">行程文件地址：</label>
      <input type="text" id="address" v-model="form.address" />

      <label for="zhanweiren">允许占位人： </label>
      <select id="zhanweiren" v-model="huodong">
        <option value="zhanweiren1">销售1</option>
        <option value="zhanweiren2">销售2</option>
        <option value="zhanweiren3">销售3</option>
      </select>

      <button type="submit">修改团信息</button>
      <router-link to="/BOOK_INFO/BOOK_INFO"><button>返回团列表</button></router-link>
    </form>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const form = ref({
      groupNumber: '',
      stuan: '',
      departureDate: '',
      returnDate: '',
      seat: '',
      airline: '',
      goairline: '',
      backairline: '',
      price: '',
      submission_people: '',
      submission_nation: '',
      submission_Date: '',
      caozuo: '',
      ticket: '',
      diqu: '',
      chufadi: '',
      zutuanshe: '',
      guide: '',
      daoyou: '',
      dijieshe1: '',
      dijieshe2: '',
      shichangprice: '',
      maxprice: '',
      addprice: '',
      huodong: '',
      plan: '',
      beizhu: '',
      address: '',


      


    });

    return {
      form
    };
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>