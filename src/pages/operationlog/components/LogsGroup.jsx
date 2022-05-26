import { For, Match, Show } from "solid-js";

const bankMap = {
  1002: "工商银行",
  1005: "农业银行",
  1003: "建设银行",
  1026: "中国银行",
  1020: "交通银行",
  1001: "招商银行",
  1066: "邮储银行",
  1006: "民生银行",
  1010: "平安银行",
  1021: "中信银行",
  1004: "浦发银行",
  1009: "兴业银行",
  1022: "光大银行",
  1027: "广发银行",
  1025: "华夏银行",
  1056: "宁波银行",
  4836: "北京银行",
  1024: "上海银行",
  1054: "南京银行",
  4755: "长子县融汇村镇银行",
  4216: "长沙银行",
  4051: "浙江泰隆商业银行",
  4753: "中原银行",
  4761: "企业银行（中国）",
  4036: "顺德农商银行",
  4752: "衡水银行",
  4756: "长治银行",
  4767: "大同银行",
  4115: "河南省农村信用社",
  4150: "宁夏黄河农村商业银行",
  4156: "山西省农村信用社",
  4166: "安徽省农村信用社",
  4157: "甘肃省农村信用社",
  4153: "天津农村商业银行",
  4113: "广西壮族自治区农村信用社",
  4108: "陕西省农村信用社",
  4076: "深圳农村商业银行",
  4052: "宁波鄞州农村商业银行",
  4764: "浙江省农村信用社联合社",
  4217: "江苏省农村信用社联合社",
  4072: "江苏紫金农村商业银行股份有限公司",
  4769: "北京中关村银行股份有限公司",
  4778: "星展银行（中国）有限公司",
  4766: "枣庄银行股份有限公司",
  4758: "海口联合农村商业银行股份有限公司",
  4763: "南洋商业银行（中国）有限公司",
};

const LogsGroup = (props) => {
  return (
    <div class="collapse border border-base-300 collapse-arrow rounded-box mb-2">
      <input type="checkbox" checked />
      <div class="collapse-title text-xl font-medium">{props.data.date}</div>
      <div class="collapse-content">
        <For each={props.data.items}>
          {(item) => (
            <div class="text-left transition-all mb-3 flex flex-row justify-between p-2.5 rounded shadow">
              <div class="text-sm flex flex-col justify-self-start">
                <span class="text-gray-400">
                  金额：
                  <span class="text-red-500 font-bold">
                    ￥{item.money / 100}
                  </span>
                </span>
                <span class="text-gray-400">
                  {"用户昵称：" + item.subsellerName}
                </span>
                <span class="text-gray-400">
                  {"银行户名：" + item.bankAccount}
                </span>
                <span class="text-gray-400"></span>
                <span class="text-gray-400">
                  <span class="font-bold text-gray-500">
                    {bankMap[item.bankCode] + "-" + item.bankCard}
                  </span>
                </span>
                <span class="text-gray-400">
                  操作时间：{item.operationTime}
                </span>
                <span class="text-gray-400 font-bold">
                  操作类型：{item.status == 1 ? "已打钱" : "驳回"}
                </span>
                <span class="text-gray-400 font-bold">
                  操作者：{item.adminName}
                </span>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default LogsGroup;
