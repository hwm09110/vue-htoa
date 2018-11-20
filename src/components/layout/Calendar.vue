<template>
  <div class="calendar-box">
    <input type="text" class="calendar-input">
  </div>
</template>

<script>
import flatpickr from "flatpickr";
import lang from "flatpickr/dist/l10n/zh"
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'Calendar',
  data (){
    return {
      }
  },
  methods: {
  },
  created (){
  },
  mounted (){
    flatpickr.localize(lang.zh);
    flatpickr('.calendar-input',{
      'inline':true
    });
  }
}
</script>

<style lang="scss" scoped>
  .calendar-box{
    .calendar-input{
      display: none;
    }
  }
</style>
<style lang="scss">
  /* 设置calendar */
  .flatpickr-calendar{
    width: 100%;
    box-shadow:none;
    -webkit-box-shadow:none;
    border-bottom:1px solid #eee;
    .flatpickr-months{
      height: 45px;
      .flatpickr-month{
        height: 45px;
        line-height:45px;
        font-weight:300;
        .cur-month{
          font-weight:normal;
        }
      }
      .flatpickr-prev-month,
      .flatpickr-next-month{
        top:8px;
      }
    }
    .flatpickr-current-month{
      padding-top: 14.16px;
      .cur-month{
        margin-right: -54%;
        &:hover{
          background-color: transparent;
        }
      }
      .numInputWrapper{
        &:hover{
          background-color: transparent;
        }
        .arrowUp,
        .arrowDown{
          display: none;
        }
        .numInput{
          &:hover{
            background: transparent;
          }
        }
      }
    }
    .flatpickr-weekdays{
      border-top:1px solid #eee;
      border-bottom:1px solid #eee;
      height: 34px;
    }
    .flatpickr-days{
      width:100%;
      .dayContainer{
        width:100%;
        max-width:100%;
        min-width:100%;
        .flatpickr-day{
          max-width: 30px;
          height: 30px;
          line-height:30px;
          margin:2px 2.4px;
          &.today{
            border-color:#1EBFAE;
          }
          &.selected{
            background:#1EBFAE;
          }
        }
        .dateSelect{
          background:#1EBFAE;
        }
      }
    }
  }
</style>


