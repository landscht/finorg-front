<template>
  <el-container style="text-align: center">
    <el-main>
      <el-date-picker
          v-model="dates"
          type="monthrange"
          format="MMMM yyyy"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="à"
          @change="update()"
          start-placeholder="Date de début"
          end-placeholder="Date de fin"
          :picker-options="pickerOptions">
      </el-date-picker>
      <p><span class="dix">{{ totalCredit - totalDebit }}</span><span class="decim">.00 €</span></p>
      <el-popover
          placement="bottom"
          width="550"
          trigger="click">
        <el-form label-position="right" label-width="150px" style="max-width: 600px">
          <el-form-item label="Type d'operation">
            <el-select v-model="operation.typeOperation" placeholder="Select">
              <el-option
                  label="Debit"
                  value="DEBIT">
              </el-option>
              <el-option
                  label="Credit"
                  value="CREDIT">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Montant">
            <el-input type="number"
                      :prefix-icon="operation.typeOperation === 'DEBIT' ? 'el-icon-minus' : 'el-icon-plus'"
                      v-model="operation.amount"></el-input>
          </el-form-item>
          <el-form-item label="Date">
            <el-date-picker
                v-model="operation.date"
                format="dd-MM-yyyy"
                value-format="yyyy-MM-dd"
                type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="operation.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button round @click="createOperation()" type="primary">Créer</el-button>
            <el-button round @click="dialogOperation = !dialogOperation">Annuler</el-button>
          </el-form-item>
        </el-form>
        <el-button round type="primary" slot="reference">Ajoutez</el-button>
      </el-popover>
      <div class="history">
        <el-divider content-position="left"><h1><i class="el-icon-tickets"></i> Historique</h1></el-divider>
        <OperationComponent v-for="(o, i) in operations" :key="i" :operation="o" style="margin-bottom: 10px"></OperationComponent>
      </div>
    </el-main>
  </el-container>
</template>

<script>

import {Operation} from "@/models/operation";
import OperationService from "../services/operation.service";
import AuthService from "../services/auth.service";
import moment from "moment";
import OperationComponent from "@/components/OperationComponent";

export default {
  name: "Home",
  components: {OperationComponent},
  data: () => ({
    dates: [moment().format('yyyy-MM-01'), moment().add(1, 'month').format('yyyy-MM-01')],
    pickerOptions: {
      shortcuts: [{
        text: 'Ce mois ci',
        onClick(picker) {
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth(), 0);
          picker.$emit('pick', [start, now]);
        }
      }, {
        text: 'Cette année',
        onClick(picker) {
          const end = new Date();
          const start = new Date(new Date().getFullYear(), 0);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '6 derniers mois',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setMonth(start.getMonth() - 6);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
    startDate: moment(),
    endDate: moment(),
    operations: [],
    totalDebit: 0,
    totalCredit: 0,
    dialogOperation: false,
    operation: Object.assign(new Operation(), {
      profile: {
        profileId: 1
      },
      amount: 0,
      description: '',
      typeOperation: 'DEBIT',
      date: ''
    })
  }),
  created() {
    this.getOperationsByPeriod();
  },
  methods: {
    getOperationsByPeriod() {
      this.totalCredit = 0;
      this.totalDebit = 0;
      let user = JSON.parse(localStorage.getItem('user'));
      OperationService.getOperationsByProfileAndPeriod(this.dates[0], this.dates[1], user.profile.profileId).then((data) => {
        console.log(data);
        this.operations = data;
        data.forEach((o) => {
          if(o.typeOperation === 'DEBIT') {
            this.totalDebit += o.amount;
          }else {
            this.totalCredit += o.amount;
          }
        })
      });
    },
    createOperation() {
      console.log(this.operation);
      console.log(AuthService.currentUser)
      OperationService.createOperation(this.operation);
      this.operations.push(this.operation);
      if (this.operation.typeOperation === 'DEBIT') {
        this.totalDebit = this.totalDebit + Number.parseFloat(this.operation.amount);
      } else {
        this.totalCredit = this.totalCredit + Number.parseFloat(this.operation.amount);
      }
      this.operation = Object.assign(new Operation(), {
        profile: {
          profileId: 1
        },
        amount: 0,
        description: '',
        typeOperation: 'DEBIT',
        date: ''
      });
      this.dialogOperation = !this.dialogOperation;
    },
    update() {
      console.log(this.dates);
      this.getOperationsByPeriod();
    }
  }
}
</script>

<style scoped>
.dix {
  font-size: 70px;
}

.decim {
  font-size: 50px;
}

.history {
  max-width: 600px;
  margin: auto;
}
</style>
