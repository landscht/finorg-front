<template>
  <div class="operation-container">
    <div>
      <span class="title">{{operation.description}}</span><br>
      <span>{{dateFormat(operation.date)}}</span>
    </div>
    <div  class="amount">
      <span :class="operation.typeOperation === 'CREDIT' ? 'credit' : ''">{{operation.typeOperation === 'DEBIT' ? '-' : '+'}} {{operation.amount}} €</span>
    </div>
  </div>
</template>

<script>

import DateService from '../services/date.service';

export default {
  name: "OperationComponent",
  props: {
    operation: Object
  },
  methods: {
    dateFormat(date) {
      return DateService.dateFormat(date);
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 17px;
  font-weight: bold;
}

.operation-container {
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
}


.credit {
  color: #13ce66;
}


</style>
